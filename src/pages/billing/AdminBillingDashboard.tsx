import { useState } from "react";
import { Search, Printer, Trash2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { StatsCard } from "@/components/common/StatsCard";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, getPaymentStatusColor } from "@/data/billing";
import { DollarSign, Receipt, Clock, AlertTriangle, Users, TrendingUp } from "lucide-react";
import type { PaymentStatus } from "@/data/billing";

export default function AdminBilling() {
  const { invoices, patients } = useBilling();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all");
  const [doctorFilter, setDoctorFilter] = useState("all");

  const todayRevenue = invoices.filter((i) => i.invoiceDate === "2026-05-28").reduce((sum, i) => sum + i.paidAmount, 0);
  const monthlyRevenue = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalInvoices = invoices.length;
  const pendingPayments = invoices.filter((i) => i.paymentStatus === "pending" || i.paymentStatus === "partially_paid").length;
  const outstandingDues = invoices.reduce((sum, i) => sum + i.balanceDue, 0);

  const doctors = [...new Set(invoices.map((i) => i.doctorName))];

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.paymentStatus === statusFilter;
    const matchesDoctor = doctorFilter === "all" || inv.doctorName === doctorFilter;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Billing Dashboard" description="Manage invoices, payments, and revenue analytics" />

      {/* Stats Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard title="Today's Revenue" value={formatCurrency(todayRevenue)} icon={DollarSign} trend="Today" trendUp={true} />
        <StatsCard title="Monthly Revenue" value={formatCurrency(monthlyRevenue)} icon={TrendingUp} trend="This month" trendUp={true} />
        <StatsCard title="Total Invoices" value={totalInvoices.toString()} icon={Receipt} trend="All time" trendUp={true} />
        <StatsCard title="Pending Payments" value={pendingPayments.toString()} icon={Clock} trend="Action needed" trendUp={false} />
        <StatsCard title="Outstanding Dues" value={formatCurrency(outstandingDues)} icon={AlertTriangle} trend="To collect" trendUp={false} />
        <StatsCard title="Total Patients" value={patients.length.toString()} icon={Users} trend="Registered" trendUp={true} />
      </div>

      {/* Billing Table */}
      <AnimatedSection>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>All Invoices</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="partially_paid">Partially Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
                <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="all">All Doctors</option>
                  {doctors.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
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
                    <TableHead>Doctor</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Due</TableHead>
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
                      <TableCell>{inv.doctorName}</TableCell>
                      <TableCell>{inv.treatmentName}</TableCell>
                      <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
                      <TableCell className="text-green-600">{formatCurrency(inv.paidAmount)}</TableCell>
                      <TableCell className={inv.balanceDue > 0 ? "text-red-600 font-medium" : ""}>{formatCurrency(inv.balanceDue)}</TableCell>
                      <TableCell><Badge className={getPaymentStatusColor(inv.paymentStatus)}>{inv.paymentStatus.replace("_", " ")}</Badge></TableCell>
                      <TableCell>{inv.invoiceDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/invoice-print/${inv.id}`)}><Printer className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
