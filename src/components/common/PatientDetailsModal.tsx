import { useMemo } from "react";
import { Mail, Phone, Calendar, CreditCard, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getStatusVariant } from "@/lib/variants";
import { appointments, type Appointment } from "@/data/appointments";
import { invoices, type Invoice } from "@/data/invoices";

interface PatientDetailsModalProps {
  open: boolean;
  onClose: () => void;
  patientName: string | null;
}

export function PatientDetailsModal({ open, onClose, patientName }: PatientDetailsModalProps) {
  const patientAppointments = useMemo(() => {
    if (!patientName) return [];
    return appointments.filter((a) => a.patientName === patientName);
  }, [patientName]);

  const patientInvoices = useMemo(() => {
    if (!patientName) return [];
    return invoices.filter((inv) => inv.patientName === patientName);
  }, [patientName]);

  const patientInfo = useMemo(() => {
    if (!patientName) return null;
    const apt = patientAppointments[0];
    if (!apt) return { name: patientName, email: "", phone: "" };
    return {
      name: apt.patientName,
      email: apt.patientEmail,
      phone: apt.patientPhone,
    };
  }, [patientName, patientAppointments]);

  const billingStats = useMemo(() => {
    const total = patientInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paid = patientInvoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
    const pending = total - paid;
    return { total, paid, pending, count: patientInvoices.length };
  }, [patientInvoices]);

  const completedAppointments = patientAppointments.filter((a) => a.status === "completed").length;
  const upcomingAppointments = patientAppointments.filter(
    (a) => a.status === "confirmed" || a.status === "pending"
  ).length;

  if (!patientInfo) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>

        {/* Patient header */}
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {patientInfo.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">{patientInfo.name}</h3>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {patientInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {patientInfo.email}
                </span>
              )}
              {patientInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {patientInfo.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{patientAppointments.length}</p>
            <p className="text-xs text-muted-foreground">Total Visits</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{completedAppointments}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">{upcomingAppointments}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-primary">${billingStats.total.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Billed</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="appointments" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments ({patientAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing ({patientInvoices.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
            {patientAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No appointment history</p>
            ) : (
              patientAppointments.map((apt) => (
                <AppointmentRow key={apt.id} appointment={apt} />
              ))
            )}
          </TabsContent>

          <TabsContent value="billing" className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
            {patientInvoices.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No billing history</p>
            ) : (
              <>
                {/* Billing summary */}
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm font-medium text-foreground">${billingStats.paid.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Paid</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-orange-600">${billingStats.pending.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{billingStats.count}</p>
                        <p className="text-xs text-muted-foreground">Invoices</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {patientInvoices.map((inv) => (
                  <InvoiceRow key={inv.id} invoice={inv} />
                ))}
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Calendar className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{appointment.service}</p>
          <p className="text-xs text-muted-foreground">
            {appointment.date} at {appointment.time} • {appointment.doctor}
          </p>
        </div>
      </div>
      <Badge variant={getStatusVariant("appointment", appointment.status)} className="shrink-0 ml-2">
        {appointment.status}
      </Badge>
    </div>
  );
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10">
          <FileText className="h-3.5 w-3.5 text-green-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{invoice.service}</p>
          <p className="text-xs text-muted-foreground">
            {invoice.date} • Due: {invoice.dueDate}
            {invoice.paymentMethod && ` • ${invoice.paymentMethod}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <span className="text-sm font-medium text-foreground">${invoice.amount.toLocaleString()}</span>
        <Badge variant={getStatusVariant("invoice", invoice.status)}>
          {invoice.status}
        </Badge>
      </div>
    </div>
  );
}
