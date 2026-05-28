import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type BillingPatient,
  type TreatmentRecord,
  type BillingInvoice,
  type PaymentRecord,
  type TreatmentAttachment,
  billingPatients as initialPatients,
  treatmentRecords as initialTreatments,
  billingInvoices as initialInvoices,
  paymentRecords as initialPayments,
  treatmentAttachments as initialAttachments,
} from "@/data/billing";

interface BillingContextValue {
  patients: BillingPatient[];
  treatments: TreatmentRecord[];
  invoices: BillingInvoice[];
  payments: PaymentRecord[];
  attachments: TreatmentAttachment[];
  addPatient: (patient: BillingPatient) => void;
  addTreatment: (treatment: TreatmentRecord) => void;
  addInvoice: (invoice: BillingInvoice) => void;
  addPayment: (payment: PaymentRecord) => void;
  addAttachment: (attachment: TreatmentAttachment) => void;
  updateInvoice: (id: string, updates: Partial<BillingInvoice>) => void;
}

const BillingContext = createContext<BillingContextValue | undefined>(undefined);

export function BillingProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<BillingPatient[]>(initialPatients);
  const [treatments, setTreatments] = useState<TreatmentRecord[]>(initialTreatments);
  const [invoices, setInvoices] = useState<BillingInvoice[]>(initialInvoices);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [attachments, setAttachments] = useState<TreatmentAttachment[]>(initialAttachments);

  const addPatient = useCallback((patient: BillingPatient) => {
    setPatients((prev) => [...prev, patient]);
  }, []);

  const addTreatment = useCallback((treatment: TreatmentRecord) => {
    setTreatments((prev) => [...prev, treatment]);
  }, []);

  const addInvoice = useCallback((invoice: BillingInvoice) => {
    setInvoices((prev) => [...prev, invoice]);
  }, []);

  const addPayment = useCallback((payment: PaymentRecord) => {
    setPayments((prev) => [...prev, payment]);
  }, []);

  const addAttachment = useCallback((attachment: TreatmentAttachment) => {
    setAttachments((prev) => [...prev, attachment]);
  }, []);

  const updateInvoice = useCallback((id: string, updates: Partial<BillingInvoice>) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv)));
  }, []);

  return (
    <BillingContext.Provider
      value={{ patients, treatments, invoices, payments, attachments, addPatient, addTreatment, addInvoice, addPayment, addAttachment, updateInvoice }}
    >
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within a BillingProvider");
  }
  return context;
}
