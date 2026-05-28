import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, Clock, Edit, Trash2, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { SortableHeader } from "@/components/common/SortableHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FormField } from "@/components/common/FormField";
import { PatientDetailsModal } from "@/components/common/PatientDetailsModal";
import { useTableState } from "@/hooks/useTableState";
import { useFormValidation } from "@/hooks/useFormValidation";
import { getStatusVariant } from "@/lib/variants";
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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    patient: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });

  const { errors, touched, validateAll, setFieldTouched, reset } = useFormValidation({
    patient: { required: true, minLength: 2 },
    email: { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } },
    phone: { required: true, pattern: { value: /^[+]?[\d\s()-]{7,}$/, message: "Enter a valid phone number" } },
    doctor: { required: true },
    date: { required: true },
    time: { required: true },
    notes: {},
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ patient: "", email: "", phone: "", doctor: "", date: "", time: "", notes: "" });
    reset();
  }, [reset]);

  const handleSave = () => {
    if (!validateAll(formData)) return;
    toast.success("Appointment saved successfully");
    handleCloseModal();
  };

  const handleDelete = (patientName: string) => {
    toast.success(`Appointment for ${patientName} deleted`);
  };

  const isFormEmpty = !formData.patient && !formData.email && !formData.doctor && !formData.date;

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      apt.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
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
    data: filteredAppointments as unknown as Record<string, unknown>[],
    itemsPerPage: 7,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    resetPage();
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" description="Manage patient appointments and schedules">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/appointments/calendar")}>
            <CalendarDays className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <AnimatedSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Search appointments..."
            value={search}
            onChange={handleSearchChange}
            className="sm:w-72"
          />
          <FilterDropdown
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={handleFilterChange}
          />
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Appointments ({totalItems})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalItems === 0 ? (
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
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <SortableHeader label="ID" sortKey="id" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>
                          <SortableHeader label="Patient" sortKey="patientName" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          <SortableHeader label="Doctor" sortKey="doctor" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          <SortableHeader label="Service" sortKey="service" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          <SortableHeader label="Date" sortKey="date" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(paginatedData as unknown as typeof appointments).map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell className="font-mono text-xs">{apt.id}</TableCell>
                          <TableCell>
                            <div>
                              <button
                                className="font-medium text-primary hover:underline text-left"
                                onClick={() => setSelectedPatient(apt.patientName)}
                              >
                                {apt.patientName}
                              </button>
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
                            <Badge variant={getStatusVariant("appointment", apt.status)}>{apt.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(apt.patientName)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3">
                  {(paginatedData as unknown as typeof appointments).map((apt) => (
                    <div key={apt.id} className="rounded-lg border border-border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">{apt.id}</span>
                        <Badge variant={getStatusVariant("appointment", apt.status)}>{apt.status}</Badge>
                      </div>
                      <div>
                        <button
                          className="font-medium text-primary hover:underline text-left"
                          onClick={() => setSelectedPatient(apt.patientName)}
                        >
                          {apt.patientName}
                        </button>
                        <p className="text-sm text-muted-foreground">{apt.doctor} • {apt.service}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {apt.date}
                        <Clock className="h-3.5 w-3.5 ml-2" />
                        {apt.time}
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="mr-1 h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-destructive" onClick={() => handleDelete(apt.patientName)}>
                          <Trash2 className="mr-1 h-3.5 w-3.5" />
                          Cancel
                        </Button>
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

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) handleCloseModal(); else setIsModalOpen(true); }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField label="Patient Name" htmlFor="patient" required error={errors.patient} touched={touched.patient}>
              <Input
                id="patient"
                placeholder="Enter patient name"
                value={formData.patient}
                onChange={(e) => updateField("patient", e.target.value)}
                onBlur={() => setFieldTouched("patient", formData.patient)}
                className={touched.patient && errors.patient ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Email" htmlFor="email" required error={errors.email} touched={touched.email}>
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@email.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => setFieldTouched("email", formData.email)}
                  className={touched.email && errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
              <FormField label="Phone" htmlFor="phone" required error={errors.phone} touched={touched.phone}>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => setFieldTouched("phone", formData.phone)}
                  className={touched.phone && errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
            <FormField label="Doctor" htmlFor="doctor" required error={errors.doctor} touched={touched.doctor}>
              <Select value={formData.doctor} onValueChange={(val) => { updateField("doctor", val); setFieldTouched("doctor", val); }}>
                <SelectTrigger className={touched.doctor && errors.doctor ? "border-destructive focus-visible:ring-destructive" : ""}>
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
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Date" htmlFor="date" required error={errors.date} touched={touched.date}>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  onBlur={() => setFieldTouched("date", formData.date)}
                  className={touched.date && errors.date ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
              <FormField label="Time" htmlFor="time" required error={errors.time} touched={touched.time}>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  onBlur={() => setFieldTouched("time", formData.time)}
                  className={touched.time && errors.time ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
            <FormField label="Notes" htmlFor="notes" error={errors.notes} touched={touched.notes}>
              <Textarea
                id="notes"
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </FormField>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isFormEmpty}>Save Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Details Modal */}
      <PatientDetailsModal
        open={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        patientName={selectedPatient}
      />
    </div>
  );
}
