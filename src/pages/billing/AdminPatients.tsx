import { useState } from "react";
import { Search, Plus, Eye, Edit2, History, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, getPaymentStatusColor } from "@/data/billing";

export default function AdminPatients() {
  const { patients, treatments, invoices } = useBilling();
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.includes(search) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  const patient = selectedPatient ? patients.find((p) => p.id === selectedPatient) : null;
  const patientTreatments = selectedPatient ? treatments.filter((t) => t.patientId === selectedPatient) : [];
  const patientInvoices = selectedPatient ? invoices.filter((i) => i.patientId === selectedPatient) : [];
  const outstanding = patientInvoices.reduce((sum, i) => sum + i.balanceDue, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Patient Management" description="View and manage all registered patients">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </PageHeader>

      {!selectedPatient ? (
        <AnimatedSection>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>All Patients ({filtered.length})</CardTitle>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search by name, ID or mobile..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Blood Group</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono text-sm">{p.id}</TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.mobile}</TableCell>
                        <TableCell>{p.age} / {p.gender.charAt(0).toUpperCase()}</TableCell>
                        <TableCell><Badge variant="outline">{p.bloodGroup}</Badge></TableCell>
                        <TableCell>{p.registrationDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(p.id)}><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(p.id)}><History className="h-4 w-4" /></Button>
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
      ) : (
        <AnimatedSection>
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedPatient(null)}>
              <X className="mr-2 h-4 w-4" /> Back to All Patients
            </Button>

            {patient && (
              <>
                {/* Patient Profile Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Profile - {patient.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div><span className="text-sm text-muted-foreground">Patient ID</span><p className="font-medium">{patient.id}</p></div>
                      <div><span className="text-sm text-muted-foreground">Name</span><p className="font-medium">{patient.name}</p></div>
                      <div><span className="text-sm text-muted-foreground">Mobile</span><p className="font-medium">{patient.mobile}</p></div>
                      <div><span className="text-sm text-muted-foreground">Email</span><p className="font-medium">{patient.email}</p></div>
                      <div><span className="text-sm text-muted-foreground">Age / Gender</span><p className="font-medium">{patient.age} / {patient.gender}</p></div>
                      <div><span className="text-sm text-muted-foreground">Blood Group</span><p className="font-medium">{patient.bloodGroup}</p></div>
                      <div><span className="text-sm text-muted-foreground">Address</span><p className="font-medium">{patient.address}</p></div>
                      <div><span className="text-sm text-muted-foreground">Emergency Contact</span><p className="font-medium">{patient.emergencyContact}</p></div>
                      <div><span className="text-sm text-muted-foreground">Registration Date</span><p className="font-medium">{patient.registrationDate}</p></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Outstanding */}
                {outstanding > 0 && (
                  <Card className="border-red-200 dark:border-red-800">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">Outstanding Due Amount</span>
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(outstanding)}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Treatment History */}
                <Card>
                  <CardHeader><CardTitle>Treatment History</CardTitle></CardHeader>
                  <CardContent>
                    {patientTreatments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No treatment records found</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Treatment</TableHead>
                              <TableHead>Doctor</TableHead>
                              <TableHead>Tooth</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Cost</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {patientTreatments.map((t) => (
                              <TableRow key={t.id}>
                                <TableCell>{t.visitDate}</TableCell>
                                <TableCell className="font-medium">{t.treatmentName}</TableCell>
                                <TableCell>{t.doctorName}</TableCell>
                                <TableCell>{t.toothNumber}</TableCell>
                                <TableCell><Badge className={`${t.status === "completed" ? "bg-green-100 text-green-800" : t.status === "in_progress" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>{t.status.replace("_", " ")}</Badge></TableCell>
                                <TableCell>{formatCurrency(t.cost)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Billing History */}
                <Card>
                  <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
                  <CardContent>
                    {patientInvoices.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No billing records found</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Invoice</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Treatment</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Paid</TableHead>
                              <TableHead>Due</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {patientInvoices.map((inv) => (
                              <TableRow key={inv.id}>
                                <TableCell className="font-mono text-sm">{inv.invoiceNumber}</TableCell>
                                <TableCell>{inv.invoiceDate}</TableCell>
                                <TableCell>{inv.treatmentName}</TableCell>
                                <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
                                <TableCell>{formatCurrency(inv.paidAmount)}</TableCell>
                                <TableCell className={inv.balanceDue > 0 ? "text-red-600 font-medium" : ""}>{formatCurrency(inv.balanceDue)}</TableCell>
                                <TableCell><Badge className={getPaymentStatusColor(inv.paymentStatus)}>{inv.paymentStatus.replace("_", " ")}</Badge></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
