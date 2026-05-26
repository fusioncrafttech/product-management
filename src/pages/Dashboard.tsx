import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Stethoscope,
  Users,
  ArrowUpRight,
  Clock,
  Plus,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/common/StatsCard";
import { PageHeader } from "@/components/common/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments } from "@/data/appointments";
import { reportsData } from "@/data/reports";

const revenueData = reportsData.monthlyRevenue;
const appointmentData = reportsData.appointmentStats;

export default function Dashboard() {
  const recentAppointments = appointments.slice(0, 5);
  const upcomingAppointments = appointments.filter((a) => a.status === "confirmed" || a.status === "pending").slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening at DentaCare today."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Appointments"
          value="156"
          icon={Calendar}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatsCard
          title="Revenue"
          value="$42,500"
          icon={DollarSign}
          trend="+8% from last month"
          trendUp={true}
          iconColor="text-success"
        />
        <StatsCard
          title="Active Doctors"
          value="6"
          icon={Stethoscope}
          trend="2 on duty today"
          trendUp={true}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Total Patients"
          value="1,245"
          icon={Users}
          trend="+23 this week"
          trendUp={true}
          iconColor="text-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appointment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={appointmentData}>
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
                  <Bar dataKey="completed" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={revenueData}>
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
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Appointments & Upcoming */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Appointments</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden sm:table-cell">Doctor</TableHead>
                    <TableHead className="hidden md:table-cell">Service</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((apt) => (
                    <TableRow key={apt.id}>
                      <TableCell className="font-medium">{apt.patientName}</TableCell>
                      <TableCell className="hidden sm:table-cell">{apt.doctor}</TableCell>
                      <TableCell className="hidden md:table-cell">{apt.service}</TableCell>
                      <TableCell>
                        <Badge variant={apt.status}>{apt.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{apt.patientName}</p>
                    <p className="text-xs text-muted-foreground">{apt.time} • {apt.service}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-xs">New Appointment</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-xs">Add Patient</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-xs">Create Invoice</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <Stethoscope className="h-5 w-5 text-primary" />
                <span className="text-xs">Add Doctor</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
