import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { StatsCard } from "@/components/common/StatsCard";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, getPaymentStatusColor, formatPaymentMethod } from "@/data/billing";
import { Receipt, DollarSign, Clock } from "lucide-react";

export default function JrMyBills() {
  const { invoices } = useBilling();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filter bills created by current junior doctor
  const myBills = invoices.filter((i) => i.createdBy === "Dr. Emily Rodriguez");

  const filtered = myBills.filter(
    (i) => i.patientName.toLowerCase().includes(search.toLowerCase()) || i.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalBilled = myBills.reduce((sum, i) => sum + i.totalAmount, 0);
  const totalCollected = myBills.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalPending = myBills.reduce((sum, i) => sum + i.balanceDue, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="My Bills" description="View all invoices you have created" />

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Bills" value={myBills.length.toString()} icon={Receipt} trend="Created by you" trendUp={true} />
        <StatsCard title="Total Billed" value={formatCurrency(totalBilled)} icon={DollarSign} trend="Gross amount" trendUp={true} />
        <StatsCard title="Collected" value={formatCurrency(totalCollected)} icon={DollarSign} trend="Payments received" trendUp={true} />
        <StatsCard title="Pending" value={formatCurrency(totalPending)} icon={Clock} trend="Balance due" trendUp={false} />
      </div>

      <AnimatedSection>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>My Invoices</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search bills..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-sm">{inv.invoiceNumber}</TableCell>
                      <TableCell className="font-medium">{inv.patientName}</TableCell>
                      <TableCell>{inv.treatmentName}</TableCell>
                      <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
                      <TableCell className="text-green-600">{formatCurrency(inv.paidAmount)}</TableCell>
                      <TableCell className={inv.balanceDue > 0 ? "text-red-600 font-medium" : ""}>{formatCurrency(inv.balanceDue)}</TableCell>
                      <TableCell><Badge variant="outline">{formatPaymentMethod(inv.paymentMethod)}</Badge></TableCell>
                      <TableCell><Badge className={getPaymentStatusColor(inv.paymentStatus)}>{inv.paymentStatus.replace("_", " ")}</Badge></TableCell>
                      <TableCell>{inv.invoiceDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/invoice-print/${inv.id}`)}><Printer className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={10} className="text-center py-8 text-muted-foreground">No bills found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
