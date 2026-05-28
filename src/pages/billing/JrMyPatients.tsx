import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, getTreatmentStatusColor, getPaymentStatusColor } from "@/data/billing";

export default function JrMyPatients() {
  const { patients, treatments, invoices } = useBilling();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Show patients who have treatments by Dr. Emily Rodriguez (current jr doctor)
  const myPatientIds = [...new Set(treatments.filter((t) => t.doctorName === "Dr. Emily Rodriguez").map((t) => t.patientId))];
  const myPatients = patients.filter((p) => myPatientIds.includes(p.id));

  const filtered = myPatients.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.mobile.includes(search)
  );

  const patient = selectedId ? patients.find((p) => p.id === selectedId) : null;
  const patientTreatments = selectedId ? treatments.filter((t) => t.patientId === selectedId) : [];
  const patientInvoices = selectedId ? invoices.filter((i) => i.patientId === selectedId) : [];

  return (
    <div className="space-y-6">
      <PageHeader title="My Patients" description="Patients you have treated" />

      {!selectedId ? (
        <AnimatedSection>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>My Patients ({myPatients.length})</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Blood Group</TableHead>
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
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedId(p.id)}>
                            <Eye className="mr-1 h-4 w-4" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No patients found</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      ) : (
        <AnimatedSection>
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedId(null)}>← Back to My Patients</Button>

            {patient && (
              <>
                <Card>
                  <CardHeader><CardTitle>{patient.name}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div><span className="text-sm text-muted-foreground">Patient ID</span><p className="font-medium">{patient.id}</p></div>
                      <div><span className="text-sm text-muted-foreground">Mobile</span><p className="font-medium">{patient.mobile}</p></div>
                      <div><span className="text-sm text-muted-foreground">Email</span><p className="font-medium">{patient.email}</p></div>
                      <div><span className="text-sm text-muted-foreground">Age / Gender</span><p className="font-medium">{patient.age} / {patient.gender}</p></div>
                      <div><span className="text-sm text-muted-foreground">Blood Group</span><p className="font-medium">{patient.bloodGroup}</p></div>
                      <div><span className="text-sm text-muted-foreground">Address</span><p className="font-medium">{patient.address}</p></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Treatment History</CardTitle></CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Treatment</TableHead>
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
                              <TableCell>{t.toothNumber}</TableCell>
                              <TableCell><Badge className={getTreatmentStatusColor(t.status)}>{t.status.replace("_", " ")}</Badge></TableCell>
                              <TableCell>{formatCurrency(t.cost)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
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
                              <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
                              <TableCell className="text-green-600">{formatCurrency(inv.paidAmount)}</TableCell>
                              <TableCell className={inv.balanceDue > 0 ? "text-red-600" : ""}>{formatCurrency(inv.balanceDue)}</TableCell>
                              <TableCell><Badge className={getPaymentStatusColor(inv.paymentStatus)}>{inv.paymentStatus.replace("_", " ")}</Badge></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
