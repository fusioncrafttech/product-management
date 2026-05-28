import { useState } from "react";
import { Search, DollarSign, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { StatsCard } from "@/components/common/StatsCard";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, formatPaymentMethod, getPaymentStatusColor } from "@/data/billing";
import type { PaymentMethod } from "@/data/billing";

export default function AdminPayments() {
  const { payments, invoices } = useBilling();
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "all">("all");
  const [tab, setTab] = useState<"history" | "pending" | "partial">("history");

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingInvoices = invoices.filter((i) => i.paymentStatus === "pending");
  const partialInvoices = invoices.filter((i) => i.paymentStatus === "partially_paid");
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.balanceDue, 0);
  const totalPartial = partialInvoices.reduce((sum, i) => sum + i.balanceDue, 0);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = p.patientName.toLowerCase().includes(search.toLowerCase()) || p.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = methodFilter === "all" || p.paymentMethod === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Track all payment transactions and outstanding dues" />

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Collected" value={formatCurrency(totalCollected)} icon={DollarSign} trend="All payments" trendUp={true} />
        <StatsCard title="Pending Amount" value={formatCurrency(totalPending)} icon={Clock} trend={`${pendingInvoices.length} invoices`} trendUp={false} />
        <StatsCard title="Partial Dues" value={formatCurrency(totalPartial)} icon={AlertCircle} trend={`${partialInvoices.length} invoices`} trendUp={false} />
        <StatsCard title="Total Transactions" value={payments.length.toString()} icon={DollarSign} trend="Recorded" trendUp={true} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button onClick={() => setTab("history")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "history" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>Payment History</button>
        <button onClick={() => setTab("pending")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "pending" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>Pending ({pendingInvoices.length})</button>
        <button onClick={() => setTab("partial")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "partial" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>Partial ({partialInvoices.length})</button>
      </div>

      <AnimatedSection>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>
                {tab === "history" && "All Payments"}
                {tab === "pending" && "Pending Payments"}
                {tab === "partial" && "Partial Payments"}
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
                {tab === "history" && (
                  <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value as PaymentMethod | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="all">All Methods</option>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="insurance">Insurance</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {tab === "history" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice No</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono text-sm">{p.invoiceNumber}</TableCell>
                        <TableCell className="font-medium">{p.patientName}</TableCell>
                        <TableCell className="text-green-600 font-medium">{formatCurrency(p.amount)}</TableCell>
                        <TableCell><Badge variant="outline">{formatPaymentMethod(p.paymentMethod)}</Badge></TableCell>
                        <TableCell>{p.paymentDate}</TableCell>
                        <TableCell className="text-muted-foreground">{p.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {tab === "pending" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice No</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Balance Due</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Pending</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvoices.map((inv) => {
                      const daysOverdue = Math.max(0, Math.floor((new Date().getTime() - new Date(inv.dueDate).getTime()) / 86400000));
                      return (
                        <TableRow key={inv.id}>
                          <TableCell className="font-mono text-sm">{inv.invoiceNumber}</TableCell>
                          <TableCell className="font-medium">{inv.patientName}</TableCell>
                          <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
                          <TableCell className="text-red-600 font-medium">{formatCurrency(inv.balanceDue)}</TableCell>
                          <TableCell>{inv.dueDate}</TableCell>
                          <TableCell>{daysOverdue > 0 ? <span className="text-red-600">{daysOverdue} days</span> : "Not yet due"}</TableCell>
                          <TableCell><Badge className={getPaymentStatusColor(inv.paymentStatus)}>{inv.paymentStatus}</Badge></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}

              {tab === "partial" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice No</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partialInvoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-mono text-sm">{inv.invoiceNumber}</TableCell>
                        <TableCell className="font-medium">{inv.patientName}</TableCell>
                        <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
                        <TableCell className="text-green-600">{formatCurrency(inv.paidAmount)}</TableCell>
                        <TableCell className="text-red-600 font-medium">{formatCurrency(inv.balanceDue)}</TableCell>
                        <TableCell><Badge variant="outline">{formatPaymentMethod(inv.paymentMethod)}</Badge></TableCell>
                        <TableCell>{inv.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
