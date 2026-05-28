import { useState } from "react";
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
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { SortableHeader } from "@/components/common/SortableHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useTableState } from "@/hooks/useTableState";
import { getStatusVariant } from "@/lib/variants";
import { attendance, attendanceSummary } from "@/data/attendance";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Late", value: "late" },
  { label: "Half Day", value: "half-day" },
];

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

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    sortConfig,
    handleSort,
    resetPage,
    itemsPerPage,
    totalItems,
  } = useTableState({
    data: filteredAttendance as unknown as Record<string, unknown>[],
    itemsPerPage: 7,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    resetPage();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
    resetPage();
  };

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
      <AnimatedSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Search nurses..."
            value={search}
            onChange={handleSearchChange}
            className="sm:w-72"
          />
          <FilterDropdown
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusChange}
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={handleDateChange}
            className="w-[180px]"
          />
        </div>
      </AnimatedSection>

      {/* Attendance Table */}
      <AnimatedSection delay={0.1}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              Attendance Records ({totalItems})
            </CardTitle>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
          </CardHeader>
          <CardContent>
            {totalItems === 0 ? (
              <EmptyState
                title="No attendance records found"
                description="Try adjusting your search or filters to find records."
              />
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <SortableHeader label="Nurse" sortKey="nurseName" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>
                          <SortableHeader label="Date" sortKey="date" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden md:table-cell">Check In</TableHead>
                        <TableHead className="hidden md:table-cell">Check Out</TableHead>
                        <TableHead className="hidden lg:table-cell">
                          <SortableHeader label="Hours" sortKey="hoursWorked" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          <SortableHeader label="Department" sortKey="department" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(paginatedData as unknown as typeof attendance).map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.nurseName}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell className="hidden md:table-cell">{record.checkIn}</TableCell>
                          <TableCell className="hidden md:table-cell">{record.checkOut}</TableCell>
                          <TableCell className="hidden lg:table-cell">{record.hoursWorked}h</TableCell>
                          <TableCell className="hidden lg:table-cell">{record.department}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant("attendance", record.status)}>{record.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3">
                  {(paginatedData as unknown as typeof attendance).map((record) => (
                    <div key={record.id} className="rounded-lg border border-border p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{record.nurseName}</p>
                        <Badge variant={getStatusVariant("attendance", record.status)}>{record.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span>Date: {record.date}</span>
                        <span>Dept: {record.department}</span>
                        <span>In: {record.checkIn}</span>
                        <span>Out: {record.checkOut}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{record.hoursWorked}h</span>
                        <span className="text-muted-foreground"> worked</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Monthly Summary */}
      <AnimatedSection delay={0.2}>
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
      </AnimatedSection>
    </div>
  );
}
