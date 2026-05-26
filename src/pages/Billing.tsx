import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Download, DollarSign, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { StatsCard } from "@/components/common/StatsCard";
import { invoices, revenueSummary } from "@/data/invoices";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Overdue", value: "overdue" },
  { label: "Partial", value: "partial" },
];

function getInvoiceStatusVariant(status: string) {
  switch (status) {
    case "paid": return "completed" as const;
    case "unpaid": return "pending" as const;
    case "overdue": return "cancelled" as const;
    case "partial": return "warning" as const;
    default: return "secondary" as const;
  }
}

export default function Billing() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search invoices..."
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
      </div>

      {/* Invoice Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoices ({filteredInvoices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                    <TableCell className="font-medium">{invoice.patientName}</TableCell>
                    <TableCell className="hidden md:table-cell">{invoice.service}</TableCell>
                    <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={getInvoiceStatusVariant(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create Invoice Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="inv-patient">Patient Name</Label>
              <Input id="inv-patient" placeholder="Enter patient name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="inv-service">Service</Label>
              <Input id="inv-service" placeholder="Enter service name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="inv-amount">Amount ($)</Label>
                <Input id="inv-amount" type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inv-due">Due Date</Label>
                <Input id="inv-due" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="inv-method">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Create Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
