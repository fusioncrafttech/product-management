import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Download, DollarSign, CreditCard, AlertCircle, CheckCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { StatsCard } from "@/components/common/StatsCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { SortableHeader } from "@/components/common/SortableHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FormField } from "@/components/common/FormField";
import { useTableState } from "@/hooks/useTableState";
import { useFormValidation } from "@/hooks/useFormValidation";
import { getStatusVariant } from "@/lib/variants";
import { invoices, revenueSummary } from "@/data/invoices";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Overdue", value: "overdue" },
  { label: "Partial", value: "partial" },
];

export default function Billing() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    patient: "",
    service: "",
    amount: "",
    dueDate: "",
    method: "",
  });

  const { errors, touched, validateAll, setFieldTouched, reset } = useFormValidation({
    patient: { required: true, minLength: 2 },
    service: { required: true, minLength: 2 },
    amount: { required: true, pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Enter a valid amount" } },
    dueDate: { required: true },
    method: { required: true },
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ patient: "", service: "", amount: "", dueDate: "", method: "" });
    reset();
  }, [reset]);

  const handleSave = () => {
    if (!validateAll(formData)) return;
    toast.success("Invoice created successfully");
    handleCloseModal();
  };

  const handleDelete = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} deleted`);
  };

  const isFormEmpty = !formData.patient && !formData.service && !formData.amount;

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
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
    data: filteredInvoices as unknown as Record<string, unknown>[],
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
      <PageHeader title="Billing" description="Manage invoices and payment records">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </PageHeader>

      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${revenueSummary.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+8% this month"
          trendUp={true}
        />
        <StatsCard
          title="Paid Amount"
          value={`$${revenueSummary.paidAmount.toLocaleString()}`}
          icon={CheckCircle}
          iconColor="text-success"
        />
        <StatsCard
          title="Pending Amount"
          value={`$${revenueSummary.pendingAmount.toLocaleString()}`}
          icon={CreditCard}
          iconColor="text-warning"
        />
        <StatsCard
          title="Overdue Amount"
          value={`$${revenueSummary.overdueAmount.toLocaleString()}`}
          icon={AlertCircle}
          iconColor="text-destructive"
        />
      </div>

      {/* Filters */}
      <AnimatedSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Search invoices..."
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

      {/* Invoice Table */}
      <AnimatedSection delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoices ({totalItems})</CardTitle>
          </CardHeader>
          <CardContent>
            {totalItems === 0 ? (
              <EmptyState
                title="No invoices found"
                description="Try adjusting your search or filter to find what you're looking for."
                action={
                  <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
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
                          <SortableHeader label="Invoice ID" sortKey="id" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>
                          <SortableHeader label="Patient" sortKey="patientName" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          <SortableHeader label="Service" sortKey="service" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>
                          <SortableHeader label="Amount" sortKey="amount" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          <SortableHeader label="Due Date" sortKey="dueDate" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(paginatedData as unknown as typeof invoices).map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                          <TableCell className="font-medium">{invoice.patientName}</TableCell>
                          <TableCell className="hidden md:table-cell">{invoice.service}</TableCell>
                          <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                          <TableCell className="hidden lg:table-cell">{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant("invoice", invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(invoice.id)}>
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
                  {(paginatedData as unknown as typeof invoices).map((invoice) => (
                    <div key={invoice.id} className="rounded-lg border border-border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">{invoice.id}</span>
                        <Badge variant={getStatusVariant("invoice", invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{invoice.patientName}</p>
                        <p className="text-sm text-muted-foreground">{invoice.service}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">${invoice.amount.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">Due: {invoice.dueDate}</span>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="mr-1 h-3.5 w-3.5" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="mr-1 h-3.5 w-3.5" />
                          Edit
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

      {/* Create Invoice Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) handleCloseModal(); else setIsModalOpen(true); }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField label="Patient Name" htmlFor="inv-patient" required error={errors.patient} touched={touched.patient}>
              <Input
                id="inv-patient"
                placeholder="Enter patient name"
                value={formData.patient}
                onChange={(e) => updateField("patient", e.target.value)}
                onBlur={() => setFieldTouched("patient", formData.patient)}
                className={touched.patient && errors.patient ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </FormField>
            <FormField label="Service" htmlFor="inv-service" required error={errors.service} touched={touched.service}>
              <Input
                id="inv-service"
                placeholder="Enter service name"
                value={formData.service}
                onChange={(e) => updateField("service", e.target.value)}
                onBlur={() => setFieldTouched("service", formData.service)}
                className={touched.service && errors.service ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Amount ($)" htmlFor="inv-amount" required error={errors.amount} touched={touched.amount}>
                <Input
                  id="inv-amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                  onBlur={() => setFieldTouched("amount", formData.amount)}
                  className={touched.amount && errors.amount ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
              <FormField label="Due Date" htmlFor="inv-due" required error={errors.dueDate} touched={touched.dueDate}>
                <Input
                  id="inv-due"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                  onBlur={() => setFieldTouched("dueDate", formData.dueDate)}
                  className={touched.dueDate && errors.dueDate ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
            <FormField label="Payment Method" htmlFor="inv-method" required error={errors.method} touched={touched.method}>
              <Select value={formData.method} onValueChange={(val) => { updateField("method", val); setFieldTouched("method", val); }}>
                <SelectTrigger className={touched.method && errors.method ? "border-destructive focus-visible:ring-destructive" : ""}>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave} disabled={isFormEmpty}>Create Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
