import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, UserCheck, UserX, AlertCircle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { StatsCard } from "@/components/common/StatsCard";
import { attendance, attendanceSummary } from "@/data/attendance";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Late", value: "late" },
  { label: "Half Day", value: "half-day" },
];

function getAttendanceVariant(status: string) {
  switch (status) {
    case "present": return "completed" as const;
    case "absent": return "cancelled" as const;
    case "late": return "warning" as const;
    case "half-day": return "confirmed" as const;
    default: return "secondary" as const;
  }
}

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch = record.nurseName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesDate = !dateFilter || record.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Nurse Attendance" description="Track and manage nurse attendance records" />

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard title="Total Nurses" value={attendanceSummary.totalNurses} icon={Users} />
        <StatsCard title="Present" value={attendanceSummary.present} icon={UserCheck} iconColor="text-success" />
        <StatsCard title="Absent" value={attendanceSummary.absent} icon={UserX} iconColor="text-destructive" />
        <StatsCard title="Late" value={attendanceSummary.late} icon={AlertCircle} iconColor="text-warning" />
        <StatsCard title="Half Day" value={attendanceSummary.halfDay} icon={Clock} iconColor="text-blue-500" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search nurses..."
          value={search}
          onChange={setSearch}
          className="sm:w-72"
        />
        <FilterDropdown
          placeholder="Filter by status"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-[180px]"
        />
      </div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              Attendance Records ({filteredAttendance.length})
            </CardTitle>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nurse</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Check In</TableHead>
                  <TableHead className="hidden sm:table-cell">Check Out</TableHead>
                  <TableHead className="hidden md:table-cell">Hours</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.nurseName}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell className="hidden sm:table-cell">{record.checkIn}</TableCell>
                    <TableCell className="hidden sm:table-cell">{record.checkOut}</TableCell>
                    <TableCell className="hidden md:table-cell">{record.hoursWorked}h</TableCell>
                    <TableCell className="hidden lg:table-cell">{record.department}</TableCell>
                    <TableCell>
                      <Badge variant={getAttendanceVariant(record.status)}>{record.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Total Absences</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Late Arrivals</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">7.8h</p>
                <p className="text-sm text-muted-foreground">Avg. Hours/Day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
