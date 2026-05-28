import { useParams, useNavigate } from "react-router-dom";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, formatPaymentMethod } from "@/data/billing";

export default function AdminInvoicePrint() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { invoices } = useBilling();

  const invoice = invoices.find((i) => i.id === invoiceId);

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">Invoice not found</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handlePrint = () => window.print();

  return (
    <div className="space-y-4">
      {/* Action Bar - hidden on print */}
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Invoice
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice Layout */}
      <div className="mx-auto max-w-4xl rounded-lg border bg-white p-8 shadow-sm print:shadow-none print:border-none dark:bg-card">
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">D</div>
              <div>
                <h1 className="text-2xl font-bold">DentaCare Clinic</h1>
                <p className="text-sm text-muted-foreground">Advanced Dental Solutions</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              <p>245 Healthcare Avenue, New York, NY 10001</p>
              <p>Phone: +1 (555) 100-1000 | Email: billing@dentacare.com</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-primary">INVOICE</h2>
            <p className="mt-1 text-sm"><span className="text-muted-foreground">Invoice #:</span> {invoice.invoiceNumber}</p>
            <p className="text-sm"><span className="text-muted-foreground">Date:</span> {invoice.invoiceDate}</p>
            <p className="text-sm"><span className="text-muted-foreground">Due Date:</span> {invoice.dueDate}</p>
          </div>
        </div>

        {/* Patient & Doctor Info */}
        <div className="grid gap-6 sm:grid-cols-2 py-6 border-b">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Bill To</h3>
            <p className="font-medium">{invoice.patientName}</p>
            <p className="text-sm text-muted-foreground">Patient ID: {invoice.patientId}</p>
            <p className="text-sm text-muted-foreground">Mobile: {invoice.patientMobile}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Treated By</h3>
            <p className="font-medium">{invoice.doctorName}</p>
            <p className="text-sm text-muted-foreground">Doctor ID: {invoice.doctorId}</p>
          </div>
        </div>

        {/* Treatment Table */}
        <div className="py-6 border-b">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Description</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3">{invoice.treatmentName}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(invoice.treatmentCost)}</td>
              </tr>
              {invoice.xrayCharges > 0 && (
                <tr className="border-b">
                  <td className="px-4 py-3 text-muted-foreground">X-Ray Charges</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(invoice.xrayCharges)}</td>
                </tr>
              )}
              {invoice.medicineCharges > 0 && (
                <tr className="border-b">
                  <td className="px-4 py-3 text-muted-foreground">Medicine Charges</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(invoice.medicineCharges)}</td>
                </tr>
              )}
              {invoice.labCharges > 0 && (
                <tr className="border-b">
                  <td className="px-4 py-3 text-muted-foreground">Lab Charges</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(invoice.labCharges)}</td>
                </tr>
              )}
              {invoice.otherCharges > 0 && (
                <tr className="border-b">
                  <td className="px-4 py-3 text-muted-foreground">Other Charges</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(invoice.otherCharges)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Billing Summary */}
        <div className="py-6 flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount ({invoice.discountType === "percentage" ? `${invoice.discountAmount}%` : "Fixed"})</span>
                <span className="text-green-600">-{invoice.discountType === "percentage" ? `${invoice.discountAmount}%` : formatCurrency(invoice.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GST ({invoice.gstPercent}%)</span>
              <span>{formatCurrency(invoice.taxAmount)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>Total Amount</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="text-green-600">{formatCurrency(invoice.paidAmount)}</span>
            </div>
            {invoice.balanceDue > 0 && (
              <div className="flex justify-between text-sm font-medium border-t pt-2">
                <span className="text-red-600">Balance Due</span>
                <span className="text-red-600">{formatCurrency(invoice.balanceDue)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment & Notes */}
        <div className="border-t pt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Payment Information</h3>
            <p className="text-sm">Method: {formatPaymentMethod(invoice.paymentMethod)}</p>
            <p className="text-sm">Status: <span className="capitalize">{invoice.paymentStatus.replace("_", " ")}</span></p>
          </div>
          {invoice.notes && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Signatures */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t pt-8">
          <div className="text-center">
            <div className="border-b border-dashed pb-2 mb-2">&nbsp;</div>
            <p className="text-sm text-muted-foreground">Patient Signature</p>
          </div>
          <div className="text-center">
            <div className="border-b border-dashed pb-2 mb-2">&nbsp;</div>
            <p className="text-sm text-muted-foreground">Authorized Signature</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t pt-4">
          <p>Thank you for choosing DentaCare Clinic. We wish you a healthy smile!</p>
          <p>This is a computer-generated invoice. No signature required for amounts below $500.</p>
        </div>
      </div>
    </div>
  );
}
