import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, FileText, Upload, Receipt, Printer, Send, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, formatTreatmentCategory } from "@/data/billing";
import type { BillingPatient, TreatmentRecord, TreatmentAttachment, BillingInvoice, PaymentRecord, TreatmentCategory, TreatmentStatus, DiscountType, PaymentMethod, PaymentStatus } from "@/data/billing";
import toast from "react-hot-toast";

type Step = "search" | "new-patient" | "treatment" | "attachments" | "billing" | "preview" | "submitted";

export default function JrNewBilling() {
  const navigate = useNavigate();
  const { patients, addPatient, addTreatment, addInvoice, addPayment, addAttachment } = useBilling();
  const [step, setStep] = useState<Step>("search");
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<BillingPatient | null>(null);

  // New Patient form
  const [newPatient, setNewPatient] = useState({ name: "", mobile: "", email: "", age: "", gender: "male" as "male" | "female" | "other", address: "", emergencyContact: "", bloodGroup: "A+" });

  // Treatment form
  const [treatment, setTreatment] = useState({
    toothNumber: "",
    treatmentCategory: "consultation" as TreatmentCategory,
    treatmentName: "",
    description: "",
    status: "completed" as TreatmentStatus,
    cost: "",
  });

  // Attachments
  const [attachmentFiles, setAttachmentFiles] = useState<{ name: string; type: "xray" | "photo" | "report" | "prescription" }[]>([]);

  // Billing form
  const [billing, setBilling] = useState({
    xrayCharges: "0",
    medicineCharges: "0",
    labCharges: "0",
    otherCharges: "0",
    discountType: "fixed" as DiscountType,
    discountAmount: "0",
    discountReason: "",
    gstPercent: "18",
    paymentMethod: "cash" as PaymentMethod,
    amountPaid: "",
    notes: "",
  });

  const filteredPatients = patients.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.mobile.includes(search) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreatePatient = () => {
    const id = `BP${String(patients.length + 1).padStart(3, "0")}`;
    const patient: BillingPatient = {
      id,
      name: newPatient.name,
      mobile: newPatient.mobile,
      email: newPatient.email,
      age: parseInt(newPatient.age) || 0,
      gender: newPatient.gender,
      address: newPatient.address,
      emergencyContact: newPatient.emergencyContact,
      bloodGroup: newPatient.bloodGroup,
      registrationDate: new Date().toISOString().split("T")[0],
    };
    addPatient(patient);
    setSelectedPatient(patient);
    setStep("treatment");
    toast.success("Patient registered successfully!");
  };

  const handleAddAttachment = (type: "xray" | "photo" | "report" | "prescription") => {
    const name = `${selectedPatient?.name.toLowerCase().replace(" ", "_")}_${type}_${Date.now()}.${type === "prescription" || type === "report" ? "pdf" : "jpg"}`;
    setAttachmentFiles((prev) => [...prev, { name, type }]);
    toast.success("Attachment added!");
  };

  const calculateBilling = () => {
    const treatCost = parseFloat(treatment.cost) || 0;
    const xray = parseFloat(billing.xrayCharges) || 0;
    const medicine = parseFloat(billing.medicineCharges) || 0;
    const lab = parseFloat(billing.labCharges) || 0;
    const other = parseFloat(billing.otherCharges) || 0;
    const gross = treatCost + xray + medicine + lab + other;

    let discount = 0;
    if (billing.discountType === "percentage") {
      discount = gross * (parseFloat(billing.discountAmount) || 0) / 100;
    } else {
      discount = parseFloat(billing.discountAmount) || 0;
    }

    const subtotal = gross - discount;
    const gst = parseFloat(billing.gstPercent) || 0;
    const tax = subtotal * gst / 100;
    const total = subtotal + tax;
    const paid = parseFloat(billing.amountPaid) || 0;
    const balance = total - paid;

    return { subtotal, tax, total, paid, balance, discount };
  };

  const handleSubmit = () => {
    if (!selectedPatient) return;
    const calc = calculateBilling();
    const treatmentId = `TR${String(Date.now()).slice(-6)}`;
    const invoiceId = `BI${String(Date.now()).slice(-6)}`;
    const invoiceNumber = `INV-2026-${String(Math.floor(Math.random() * 900) + 100)}`;

    const newTreatment: TreatmentRecord = {
      id: treatmentId,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      doctorId: "DOC002",
      doctorName: "Dr. Emily Rodriguez",
      visitDate: new Date().toISOString().split("T")[0],
      toothNumber: treatment.toothNumber,
      treatmentCategory: treatment.treatmentCategory,
      treatmentName: treatment.treatmentName,
      description: treatment.description,
      status: treatment.status,
      cost: parseFloat(treatment.cost) || 0,
    };
    addTreatment(newTreatment);

    // Add attachments
    attachmentFiles.forEach((file, idx) => {
      const att: TreatmentAttachment = {
        id: `TA${Date.now()}${idx}`,
        treatmentId,
        patientId: selectedPatient.id,
        type: file.type,
        fileName: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
      };
      addAttachment(att);
    });

    let paymentStatus: PaymentStatus = "pending";
    if (calc.paid >= calc.total) paymentStatus = "paid";
    else if (calc.paid > 0) paymentStatus = "partially_paid";

    const newInvoice: BillingInvoice = {
      id: invoiceId,
      invoiceNumber,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientMobile: selectedPatient.mobile,
      doctorId: "DOC002",
      doctorName: "Dr. Emily Rodriguez",
      treatmentId,
      treatmentName: treatment.treatmentName,
      treatmentCost: parseFloat(treatment.cost) || 0,
      xrayCharges: parseFloat(billing.xrayCharges) || 0,
      medicineCharges: parseFloat(billing.medicineCharges) || 0,
      labCharges: parseFloat(billing.labCharges) || 0,
      otherCharges: parseFloat(billing.otherCharges) || 0,
      discountType: billing.discountType,
      discountAmount: parseFloat(billing.discountAmount) || 0,
      discountReason: billing.discountReason,
      gstPercent: parseFloat(billing.gstPercent) || 0,
      subtotal: calc.subtotal,
      taxAmount: calc.tax,
      totalAmount: calc.total,
      paidAmount: calc.paid,
      balanceDue: calc.balance,
      paymentMethod: billing.paymentMethod,
      paymentStatus,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      notes: billing.notes,
      createdBy: "Dr. Emily Rodriguez",
    };
    addInvoice(newInvoice);

    if (calc.paid > 0) {
      const payment: PaymentRecord = {
        id: `PR${Date.now()}`,
        invoiceId,
        invoiceNumber,
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        amount: calc.paid,
        paymentMethod: billing.paymentMethod,
        paymentDate: new Date().toISOString().split("T")[0],
        notes: paymentStatus === "paid" ? "Full payment" : "Partial payment",
      };
      addPayment(payment);
    }

    setStep("submitted");
    toast.success("Bill submitted successfully! Data synced to Admin Dashboard.");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="New Billing" description="Create a new bill after treatment completion" />

      {/* Step Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { key: "search", label: "1. Find Patient", icon: Search },
          { key: "treatment", label: "2. Treatment", icon: FileText },
          { key: "attachments", label: "3. Attachments", icon: Upload },
          { key: "billing", label: "4. Billing", icon: Receipt },
          { key: "preview", label: "5. Preview", icon: Printer },
        ].map((s) => (
          <div key={s.key} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${step === s.key || step === "submitted" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <s.icon className="h-3 w-3" />
            {s.label}
          </div>
        ))}
      </div>

      {/* Step: Search Patient */}
      {step === "search" && (
        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle>Find or Create Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by name, mobile or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>

              {search && (
                <div className="max-h-60 overflow-y-auto rounded-md border">
                  {filteredPatients.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <p>No patient found</p>
                      <Button className="mt-2" size="sm" onClick={() => setStep("new-patient")}>
                        <UserPlus className="mr-2 h-4 w-4" /> Register New Patient
                      </Button>
                    </div>
                  ) : (
                    filteredPatients.map((p) => (
                      <div key={p.id} className="flex items-center justify-between border-b p-3 last:border-b-0 hover:bg-muted/50 cursor-pointer" onClick={() => { setSelectedPatient(p); setStep("treatment"); }}>
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-muted-foreground">{p.id} • {p.mobile}</p>
                        </div>
                        <Badge variant="outline">{p.bloodGroup}</Badge>
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button variant="outline" onClick={() => setStep("new-patient")}>
                  <UserPlus className="mr-2 h-4 w-4" /> Register New Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Step: New Patient */}
      {step === "new-patient" && (
        <AnimatedSection>
          <Card>
            <CardHeader><CardTitle>Register New Patient</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Patient Name *</Label><Input value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} placeholder="Full name" /></div>
                <div><Label>Mobile Number *</Label><Input value={newPatient.mobile} onChange={(e) => setNewPatient({ ...newPatient, mobile: e.target.value })} placeholder="+1 (555) 000-0000" /></div>
                <div><Label>Email</Label><Input value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} placeholder="email@example.com" /></div>
                <div><Label>Age *</Label><Input type="number" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} placeholder="25" /></div>
                <div><Label>Gender</Label>
                  <select value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value as "male" | "female" | "other" })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                  </select>
                </div>
                <div><Label>Blood Group</Label>
                  <select value={newPatient.bloodGroup} onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2"><Label>Address</Label><Input value={newPatient.address} onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} placeholder="Full address" /></div>
                <div><Label>Emergency Contact</Label><Input value={newPatient.emergencyContact} onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })} placeholder="+1 (555) 000-0000" /></div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setStep("search")}>Back</Button>
                <Button onClick={handleCreatePatient} disabled={!newPatient.name || !newPatient.mobile}>Register & Continue</Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Step: Treatment */}
      {step === "treatment" && selectedPatient && (
        <AnimatedSection>
          <Card className="mb-4">
            <CardContent className="py-3">
              <div className="flex items-center gap-4">
                <Badge variant="outline">{selectedPatient.id}</Badge>
                <span className="font-medium">{selectedPatient.name}</span>
                <span className="text-sm text-muted-foreground">{selectedPatient.mobile}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Treatment Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Treatment Category *</Label>
                  <select value={treatment.treatmentCategory} onChange={(e) => setTreatment({ ...treatment, treatmentCategory: e.target.value as TreatmentCategory })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {(["consultation", "scaling", "filling", "root_canal", "crown", "implant", "extraction", "orthodontics", "surgery"] as TreatmentCategory[]).map((c) => (
                      <option key={c} value={c}>{formatTreatmentCategory(c)}</option>
                    ))}
                  </select>
                </div>
                <div><Label>Treatment Name *</Label><Input value={treatment.treatmentName} onChange={(e) => setTreatment({ ...treatment, treatmentName: e.target.value })} placeholder="e.g., Root Canal Treatment" /></div>
                <div><Label>Tooth Number</Label><Input value={treatment.toothNumber} onChange={(e) => setTreatment({ ...treatment, toothNumber: e.target.value })} placeholder="e.g., 14 or All" /></div>
                <div><Label>Status</Label>
                  <select value={treatment.status} onChange={(e) => setTreatment({ ...treatment, status: e.target.value as TreatmentStatus })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="completed">Completed</option><option value="in_progress">In Progress</option><option value="planned">Planned</option>
                  </select>
                </div>
                <div><Label>Cost ($) *</Label><Input type="number" value={treatment.cost} onChange={(e) => setTreatment({ ...treatment, cost: e.target.value })} placeholder="0.00" /></div>
                <div className="sm:col-span-2"><Label>Description</Label><Input value={treatment.description} onChange={(e) => setTreatment({ ...treatment, description: e.target.value })} placeholder="Treatment description..." /></div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setStep("search")}>Back</Button>
                <Button onClick={() => setStep("attachments")} disabled={!treatment.treatmentName || !treatment.cost}>Next: Attachments</Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Step: Attachments */}
      {step === "attachments" && (
        <AnimatedSection>
          <Card>
            <CardHeader><CardTitle>Upload Attachments (Optional)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(["xray", "photo", "report", "prescription"] as const).map((type) => (
                  <div key={type} className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 hover:border-primary cursor-pointer" onClick={() => handleAddAttachment(type)}>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium capitalize">{type === "xray" ? "X-Ray" : type}</span>
                    <span className="text-xs text-muted-foreground">Click to upload</span>
                  </div>
                ))}
              </div>

              {attachmentFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Uploaded Files ({attachmentFiles.length})</p>
                  {attachmentFiles.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-md bg-muted p-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm flex-1 truncate">{f.name}</span>
                      <Badge variant="outline" className="capitalize">{f.type}</Badge>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setStep("treatment")}>Back</Button>
                <Button onClick={() => setStep("billing")}>Next: Billing</Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Step: Billing */}
      {step === "billing" && (
        <AnimatedSection>
          <Card>
            <CardHeader><CardTitle>Billing Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div><Label>X-Ray Charges ($)</Label><Input type="number" value={billing.xrayCharges} onChange={(e) => setBilling({ ...billing, xrayCharges: e.target.value })} /></div>
                <div><Label>Medicine Charges ($)</Label><Input type="number" value={billing.medicineCharges} onChange={(e) => setBilling({ ...billing, medicineCharges: e.target.value })} /></div>
                <div><Label>Lab Charges ($)</Label><Input type="number" value={billing.labCharges} onChange={(e) => setBilling({ ...billing, labCharges: e.target.value })} /></div>
                <div><Label>Other Charges ($)</Label><Input type="number" value={billing.otherCharges} onChange={(e) => setBilling({ ...billing, otherCharges: e.target.value })} /></div>
                <div><Label>Discount Type</Label>
                  <select value={billing.discountType} onChange={(e) => setBilling({ ...billing, discountType: e.target.value as DiscountType })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="fixed">Fixed Amount</option><option value="percentage">Percentage</option>
                  </select>
                </div>
                <div><Label>Discount {billing.discountType === "percentage" ? "(%)" : "($)"}</Label><Input type="number" value={billing.discountAmount} onChange={(e) => setBilling({ ...billing, discountAmount: e.target.value })} /></div>
                <div><Label>Discount Reason</Label><Input value={billing.discountReason} onChange={(e) => setBilling({ ...billing, discountReason: e.target.value })} placeholder="Optional" /></div>
                <div><Label>GST %</Label><Input type="number" value={billing.gstPercent} onChange={(e) => setBilling({ ...billing, gstPercent: e.target.value })} /></div>
                <div><Label>Payment Method</Label>
                  <select value={billing.paymentMethod} onChange={(e) => setBilling({ ...billing, paymentMethod: e.target.value as PaymentMethod })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="cash">Cash</option><option value="credit_card">Credit Card</option><option value="debit_card">Debit Card</option><option value="upi">UPI</option><option value="insurance">Insurance</option><option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
                <div><Label>Amount Paid ($)</Label><Input type="number" value={billing.amountPaid} onChange={(e) => setBilling({ ...billing, amountPaid: e.target.value })} placeholder="0.00" /></div>
                <div className="sm:col-span-2 lg:col-span-3"><Label>Notes</Label><Input value={billing.notes} onChange={(e) => setBilling({ ...billing, notes: e.target.value })} placeholder="Additional notes..." /></div>
              </div>

              {/* Live Summary */}
              <div className="mt-6 rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2">Bill Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Treatment Cost</span><span>{formatCurrency(parseFloat(treatment.cost) || 0)}</span></div>
                  <div className="flex justify-between"><span>Additional Charges</span><span>{formatCurrency((parseFloat(billing.xrayCharges) || 0) + (parseFloat(billing.medicineCharges) || 0) + (parseFloat(billing.labCharges) || 0) + (parseFloat(billing.otherCharges) || 0))}</span></div>
                  <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatCurrency(calculateBilling().discount)}</span></div>
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(calculateBilling().subtotal)}</span></div>
                  <div className="flex justify-between"><span>GST ({billing.gstPercent}%)</span><span>{formatCurrency(calculateBilling().tax)}</span></div>
                  <div className="flex justify-between font-bold border-t pt-1"><span>Total</span><span>{formatCurrency(calculateBilling().total)}</span></div>
                  <div className="flex justify-between text-green-600"><span>Paid</span><span>{formatCurrency(calculateBilling().paid)}</span></div>
                  {calculateBilling().balance > 0 && <div className="flex justify-between text-red-600 font-medium"><span>Balance Due</span><span>{formatCurrency(calculateBilling().balance)}</span></div>}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setStep("attachments")}>Back</Button>
                <Button onClick={() => setStep("preview")}>Preview & Submit</Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Step: Preview */}
      {step === "preview" && selectedPatient && (
        <AnimatedSection>
          <Card>
            <CardHeader><CardTitle>Review & Submit</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Patient</h4>
                  <p className="font-medium">{selectedPatient.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.id} • {selectedPatient.mobile}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Doctor</h4>
                  <p className="font-medium">Dr. Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">General Dentist</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Treatment</h4>
                  <p className="font-medium">{treatment.treatmentName}</p>
                  <p className="text-sm text-muted-foreground">{formatTreatmentCategory(treatment.treatmentCategory)} • Tooth: {treatment.toothNumber || "N/A"}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Billing</h4>
                  <p className="font-medium text-lg">{formatCurrency(calculateBilling().total)}</p>
                  <p className="text-sm text-muted-foreground">Paid: {formatCurrency(calculateBilling().paid)} | Due: {formatCurrency(calculateBilling().balance)}</p>
                </div>
              </div>

              {attachmentFiles.length > 0 && (
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Attachments ({attachmentFiles.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {attachmentFiles.map((f, i) => (
                      <Badge key={i} variant="outline" className="capitalize">{f.type}: {f.name.slice(0, 20)}...</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("billing")}>Back</Button>
                <Button onClick={handleSubmit} className="gap-2">
                  <Send className="h-4 w-4" /> Submit & Generate Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Step: Submitted */}
      {step === "submitted" && (
        <AnimatedSection>
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Bill Submitted Successfully!</h2>
              <p className="mt-2 text-muted-foreground">The invoice has been generated and data is now visible in the Admin Dashboard.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" onClick={() => navigate("/jr-dashboard/my-bills")}>View My Bills</Button>
                <Button onClick={() => { setStep("search"); setSelectedPatient(null); setSearch(""); setAttachmentFiles([]); }}>Create New Bill</Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}
