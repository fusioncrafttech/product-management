import { useState } from "react";
import { Download, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import {
  RevenueChart,
  AppointmentsTrendChart,
  PatientStatisticsChart,
  MonthlyAnalyticsChart,
} from "@/components/charts";
import { reportsData } from "@/data/reports";

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
        <RevenueChart data={reportsData.monthlyRevenue} title="Revenue Analytics" />
        <AppointmentsTrendChart data={reportsData.appointmentStats} title="Appointment Statistics" />
      </div>

      {/* Patient & Analytics Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PatientStatisticsChart data={reportsData.patientStatistics} title="Patient Statistics" />
        <MonthlyAnalyticsChart data={reportsData.monthlyAnalytics} title="Service Breakdown" />
      </div>

      {/* Doctor Performance */}
      <div className="grid gap-6 lg:grid-cols-1">
        <AnimatedSection delay={0.3}>
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
        </AnimatedSection>
      </div>
    </div>
  );
}
