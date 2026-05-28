import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useBilling } from "@/context/BillingContext";
import { doctorRevenueData, dailyCollections, formatCurrency } from "@/data/billing";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AdminRevenue() {
  const { invoices } = useBilling();

  const totalRevenue = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const totalCollections = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalPending = invoices.reduce((sum, i) => sum + i.balanceDue, 0);

  const doctorChartData = doctorRevenueData.map((d) => ({
    name: d.doctorName.replace("Dr. ", ""),
    revenue: d.totalRevenue,
    collections: d.collections,
    pending: d.pending,
  }));

  const treatmentRevenueData = invoices.reduce((acc, inv) => {
    const existing = acc.find((a) => a.name === inv.treatmentName);
    if (existing) {
      existing.value += inv.totalAmount;
    } else {
      acc.push({ name: inv.treatmentName, value: inv.totalAmount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Analytics" description="Doctor-wise revenue breakdown and treatment analytics" />

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Collections</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalCollections)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending Amount</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(totalPending)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Doctor Revenue Chart */}
      <AnimatedSection>
        <Card>
          <CardHeader><CardTitle>Revenue by Doctor</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={doctorChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="#0088FE" name="Total Revenue" />
                  <Bar dataKey="collections" fill="#00C49F" name="Collections" />
                  <Bar dataKey="pending" fill="#FF8042" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Treatment Revenue Pie */}
        <AnimatedSection>
          <Card>
            <CardHeader><CardTitle>Revenue by Treatment</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={treatmentRevenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }: { name?: string; percent?: number }) => `${(name || '').slice(0, 12)}.. ${((percent || 0) * 100).toFixed(0)}%`}>
                      {treatmentRevenueData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Daily Collection Trend */}
        <AnimatedSection>
          <Card>
            <CardHeader><CardTitle>Daily Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyCollections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line type="monotone" dataKey="revenue" stroke="#0088FE" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      {/* Doctor Revenue Table */}
      <AnimatedSection>
        <Card>
          <CardHeader><CardTitle>Doctor Revenue Ranking</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Treatments</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Collections</TableHead>
                    <TableHead>Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...doctorRevenueData].sort((a, b) => b.totalRevenue - a.totalRevenue).map((doc, idx) => (
                    <TableRow key={doc.doctorId}>
                      <TableCell><Badge variant="outline">#{idx + 1}</Badge></TableCell>
                      <TableCell className="font-medium">{doc.doctorName}</TableCell>
                      <TableCell>{doc.specialization}</TableCell>
                      <TableCell>{doc.totalTreatments}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(doc.totalRevenue)}</TableCell>
                      <TableCell className="text-green-600">{formatCurrency(doc.collections)}</TableCell>
                      <TableCell className="text-red-600">{formatCurrency(doc.pending)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
