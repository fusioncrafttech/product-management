import { useState } from "react";
import { motion } from "framer-motion";
import { Download, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { reportsData } from "@/data/reports";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function Reports() {
  const [period, setPeriod] = useState("6months");

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="View clinic performance analytics and reports">
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Revenue" value="$215,500" icon={DollarSign} trend="+12% vs last period" trendUp={true} />
        <StatsCard title="Total Appointments" value="788" icon={Calendar} trend="+8% vs last period" trendUp={true} iconColor="text-blue-500" />
        <StatsCard title="New Patients" value="156" icon={Users} trend="+15% vs last period" trendUp={true} iconColor="text-purple-500" />
        <StatsCard title="Avg. Rating" value="4.8" icon={TrendingUp} trend="+0.2 vs last period" trendUp={true} iconColor="text-success" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportsData.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appointment Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportsData.appointmentStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Service Breakdown & Doctor Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Service Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={reportsData.serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="revenue"
                    nameKey="service"
                  >
                    {reportsData.serviceBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {reportsData.serviceBreakdown.map((item, index) => (
                  <div key={item.service} className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="truncate text-muted-foreground">{item.service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Doctor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Patients</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportsData.doctorPerformance.map((doc) => (
                    <TableRow key={doc.name}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.patients}</TableCell>
                      <TableCell>${doc.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="text-yellow-500">★</span> {doc.rating}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
