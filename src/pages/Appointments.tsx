import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Clock, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { EmptyState } from "@/components/common/EmptyState";
import { appointments } from "@/data/appointments";
import { doctors } from "@/data/doctors";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      apt.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" description="Manage patient appointments and schedules">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>
      </PageHeader>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <SearchBar
          placeholder="Search appointments..."
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
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Appointments ({filteredAppointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paginatedAppointments.length === 0 ? (
              <EmptyState
                title="No appointments found"
                description="Try adjusting your search or filter to find what you're looking for."
                action={
                  <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Appointment
                  </Button>
                }
              />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Doctor</TableHead>
                      <TableHead className="hidden lg:table-cell">Service</TableHead>
                      <TableHead className="hidden sm:table-cell">Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAppointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-mono text-xs">{apt.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{apt.patientName}</p>
                            <p className="text-xs text-muted-foreground">{apt.patientPhone}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{apt.doctor}</TableCell>
                        <TableCell className="hidden lg:table-cell">{apt.service}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {apt.date}
                            <Clock className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                            {apt.time}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={apt.status}>{apt.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{" "}
                      {filteredAppointments.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient Name</Label>
              <Input id="patient" placeholder="Enter patient name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="patient@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name} - {doc.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Save Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
