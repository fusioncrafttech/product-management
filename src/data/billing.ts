export type PaymentStatus = "paid" | "partially_paid" | "pending" | "overdue";
export type PaymentMethod = "cash" | "credit_card" | "debit_card" | "upi" | "insurance" | "bank_transfer";
export type TreatmentCategory = "consultation" | "scaling" | "filling" | "root_canal" | "crown" | "implant" | "extraction" | "orthodontics" | "surgery";
export type TreatmentStatus = "planned" | "in_progress" | "completed";
export type DiscountType = "percentage" | "fixed";

export interface BillingPatient {
  id: string;
  name: string;
  mobile: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  address: string;
  emergencyContact: string;
  bloodGroup: string;
  registrationDate: string;
}

export interface TreatmentRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  visitDate: string;
  toothNumber: string;
  treatmentCategory: TreatmentCategory;
  treatmentName: string;
  description: string;
  status: TreatmentStatus;
  cost: number;
}

export interface TreatmentAttachment {
  id: string;
  treatmentId: string;
  patientId: string;
  type: "xray" | "photo" | "report" | "prescription";
  fileName: string;
  uploadDate: string;
  size: string;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  patientMobile: string;
  doctorId: string;
  doctorName: string;
  treatmentId: string;
  treatmentName: string;
  treatmentCost: number;
  xrayCharges: number;
  medicineCharges: number;
  labCharges: number;
  otherCharges: number;
  discountType: DiscountType;
  discountAmount: number;
  discountReason: string;
  gstPercent: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  invoiceDate: string;
  dueDate: string;
  notes: string;
  createdBy: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  notes: string;
}

export interface DoctorRevenue {
  doctorId: string;
  doctorName: string;
  specialization: string;
  totalRevenue: number;
  totalTreatments: number;
  collections: number;
  pending: number;
}

// Billing Patients Data
export const billingPatients: BillingPatient[] = [
  {
    id: "BP001",
    name: "Sarah Johnson",
    mobile: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    age: 38,
    gender: "female",
    address: "245 Oak Avenue, New York, NY 10001",
    emergencyContact: "+1 (555) 123-9999",
    bloodGroup: "A+",
    registrationDate: "2023-06-10",
  },
  {
    id: "BP002",
    name: "James Wilson",
    mobile: "+1 (555) 234-5678",
    email: "james.w@email.com",
    age: 51,
    gender: "male",
    address: "89 Pine Street, Brooklyn, NY 11201",
    emergencyContact: "+1 (555) 234-9999",
    bloodGroup: "O+",
    registrationDate: "2023-08-15",
  },
  {
    id: "BP003",
    name: "Maria Garcia",
    mobile: "+1 (555) 345-6789",
    email: "maria.g@email.com",
    age: 29,
    gender: "female",
    address: "567 Elm Road, Manhattan, NY 10022",
    emergencyContact: "+1 (555) 345-9999",
    bloodGroup: "B+",
    registrationDate: "2024-01-20",
  },
  {
    id: "BP004",
    name: "Robert Brown",
    mobile: "+1 (555) 456-7890",
    email: "robert.b@email.com",
    age: 45,
    gender: "male",
    address: "321 Maple Lane, Queens, NY 11375",
    emergencyContact: "+1 (555) 456-9999",
    bloodGroup: "AB+",
    registrationDate: "2024-03-05",
  },
  {
    id: "BP005",
    name: "Lisa Chen",
    mobile: "+1 (555) 567-8901",
    email: "lisa.c@email.com",
    age: 33,
    gender: "female",
    address: "890 Cedar Court, Bronx, NY 10451",
    emergencyContact: "+1 (555) 567-9999",
    bloodGroup: "O-",
    registrationDate: "2024-05-12",
  },
  {
    id: "BP006",
    name: "David Martinez",
    mobile: "+1 (555) 678-9012",
    email: "david.m@email.com",
    age: 42,
    gender: "male",
    address: "456 Birch Avenue, Staten Island, NY 10301",
    emergencyContact: "+1 (555) 678-9999",
    bloodGroup: "A-",
    registrationDate: "2024-07-22",
  },
  {
    id: "BP007",
    name: "Jennifer Lee",
    mobile: "+1 (555) 789-0123",
    email: "jennifer.l@email.com",
    age: 27,
    gender: "female",
    address: "123 Walnut Street, Brooklyn, NY 11215",
    emergencyContact: "+1 (555) 789-9999",
    bloodGroup: "B-",
    registrationDate: "2024-09-10",
  },
  {
    id: "BP008",
    name: "Michael Thompson",
    mobile: "+1 (555) 890-1234",
    email: "michael.t@email.com",
    age: 56,
    gender: "male",
    address: "789 Spruce Drive, Manhattan, NY 10016",
    emergencyContact: "+1 (555) 890-9999",
    bloodGroup: "AB-",
    registrationDate: "2025-01-08",
  },
];

// Treatment Records Data
export const treatmentRecords: TreatmentRecord[] = [
  {
    id: "TR001",
    patientId: "BP001",
    patientName: "Sarah Johnson",
    doctorId: "DOC001",
    doctorName: "Dr. Michael Chen",
    visitDate: "2026-05-25",
    toothNumber: "14",
    treatmentCategory: "root_canal",
    treatmentName: "Root Canal Treatment",
    description: "Root canal therapy on upper left first premolar",
    status: "completed",
    cost: 1200,
  },
  {
    id: "TR002",
    patientId: "BP002",
    patientName: "James Wilson",
    doctorId: "DOC002",
    doctorName: "Dr. Emily Rodriguez",
    visitDate: "2026-05-26",
    toothNumber: "All",
    treatmentCategory: "scaling",
    treatmentName: "Deep Scaling & Polishing",
    description: "Full mouth scaling and polishing with ultrasonic scaler",
    status: "completed",
    cost: 250,
  },
  {
    id: "TR003",
    patientId: "BP003",
    patientName: "Maria Garcia",
    doctorId: "DOC003",
    doctorName: "Dr. David Park",
    visitDate: "2026-05-26",
    toothNumber: "36",
    treatmentCategory: "implant",
    treatmentName: "Dental Implant",
    description: "Single tooth implant placement lower left first molar",
    status: "in_progress",
    cost: 3500,
  },
  {
    id: "TR004",
    patientId: "BP004",
    patientName: "Robert Brown",
    doctorId: "DOC002",
    doctorName: "Dr. Emily Rodriguez",
    visitDate: "2026-05-27",
    toothNumber: "21",
    treatmentCategory: "crown",
    treatmentName: "Porcelain Crown",
    description: "Full porcelain crown on upper left central incisor",
    status: "completed",
    cost: 900,
  },
  {
    id: "TR005",
    patientId: "BP005",
    patientName: "Lisa Chen",
    doctorId: "DOC001",
    doctorName: "Dr. Michael Chen",
    visitDate: "2026-05-27",
    toothNumber: "46",
    treatmentCategory: "filling",
    treatmentName: "Composite Filling",
    description: "Composite resin filling on lower right first molar",
    status: "completed",
    cost: 180,
  },
  {
    id: "TR006",
    patientId: "BP006",
    patientName: "David Martinez",
    doctorId: "DOC003",
    doctorName: "Dr. David Park",
    visitDate: "2026-05-27",
    toothNumber: "38",
    treatmentCategory: "extraction",
    treatmentName: "Wisdom Tooth Extraction",
    description: "Surgical extraction of impacted lower right third molar",
    status: "completed",
    cost: 600,
  },
  {
    id: "TR007",
    patientId: "BP007",
    patientName: "Jennifer Lee",
    doctorId: "DOC004",
    doctorName: "Dr. Sarah Kim",
    visitDate: "2026-05-28",
    toothNumber: "All",
    treatmentCategory: "orthodontics",
    treatmentName: "Invisalign Consultation",
    description: "Initial consultation and treatment planning for clear aligners",
    status: "planned",
    cost: 150,
  },
  {
    id: "TR008",
    patientId: "BP008",
    patientName: "Michael Thompson",
    doctorId: "DOC001",
    doctorName: "Dr. Michael Chen",
    visitDate: "2026-05-28",
    toothNumber: "11, 12",
    treatmentCategory: "surgery",
    treatmentName: "Gum Surgery",
    description: "Periodontal flap surgery on upper right incisors",
    status: "planned",
    cost: 2200,
  },
  {
    id: "TR009",
    patientId: "BP001",
    patientName: "Sarah Johnson",
    doctorId: "DOC002",
    doctorName: "Dr. Emily Rodriguez",
    visitDate: "2026-05-20",
    toothNumber: "All",
    treatmentCategory: "consultation",
    treatmentName: "General Checkup",
    description: "Routine dental examination and consultation",
    status: "completed",
    cost: 100,
  },
  {
    id: "TR010",
    patientId: "BP003",
    patientName: "Maria Garcia",
    doctorId: "DOC003",
    doctorName: "Dr. David Park",
    visitDate: "2026-05-15",
    toothNumber: "36",
    treatmentCategory: "consultation",
    treatmentName: "Implant Consultation",
    description: "Pre-operative assessment for dental implant",
    status: "completed",
    cost: 200,
  },
];

// Treatment Attachments
export const treatmentAttachments: TreatmentAttachment[] = [
  { id: "TA001", treatmentId: "TR001", patientId: "BP001", type: "xray", fileName: "sarah_rct_xray_pre.jpg", uploadDate: "2026-05-25", size: "2.4 MB" },
  { id: "TA002", treatmentId: "TR001", patientId: "BP001", type: "xray", fileName: "sarah_rct_xray_post.jpg", uploadDate: "2026-05-25", size: "2.1 MB" },
  { id: "TA003", treatmentId: "TR003", patientId: "BP003", type: "xray", fileName: "maria_implant_cbct.jpg", uploadDate: "2026-05-26", size: "5.8 MB" },
  { id: "TA004", treatmentId: "TR003", patientId: "BP003", type: "report", fileName: "maria_implant_plan.pdf", uploadDate: "2026-05-26", size: "1.2 MB" },
  { id: "TA005", treatmentId: "TR006", patientId: "BP006", type: "xray", fileName: "david_wisdom_opg.jpg", uploadDate: "2026-05-27", size: "3.1 MB" },
  { id: "TA006", treatmentId: "TR006", patientId: "BP006", type: "photo", fileName: "david_extraction_post.jpg", uploadDate: "2026-05-27", size: "1.8 MB" },
  { id: "TA007", treatmentId: "TR004", patientId: "BP004", type: "photo", fileName: "robert_crown_shade.jpg", uploadDate: "2026-05-27", size: "1.5 MB" },
  { id: "TA008", treatmentId: "TR008", patientId: "BP008", type: "prescription", fileName: "michael_pre_surgery_rx.pdf", uploadDate: "2026-05-28", size: "0.5 MB" },
];

// Billing Invoices Data
export const billingInvoices: BillingInvoice[] = [
  {
    id: "BI001",
    invoiceNumber: "INV-2026-001",
    patientId: "BP001",
    patientName: "Sarah Johnson",
    patientMobile: "+1 (555) 123-4567",
    doctorId: "DOC001",
    doctorName: "Dr. Michael Chen",
    treatmentId: "TR001",
    treatmentName: "Root Canal Treatment",
    treatmentCost: 1200,
    xrayCharges: 150,
    medicineCharges: 80,
    labCharges: 0,
    otherCharges: 0,
    discountType: "percentage",
    discountAmount: 10,
    discountReason: "Loyalty discount",
    gstPercent: 18,
    subtotal: 1287,
    taxAmount: 231.66,
    totalAmount: 1518.66,
    paidAmount: 1518.66,
    balanceDue: 0,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    invoiceDate: "2026-05-25",
    dueDate: "2026-06-25",
    notes: "Treatment completed successfully",
    createdBy: "Dr. Michael Chen",
  },
  {
    id: "BI002",
    invoiceNumber: "INV-2026-002",
    patientId: "BP002",
    patientName: "James Wilson",
    patientMobile: "+1 (555) 234-5678",
    doctorId: "DOC002",
    doctorName: "Dr. Emily Rodriguez",
    treatmentId: "TR002",
    treatmentName: "Deep Scaling & Polishing",
    treatmentCost: 250,
    xrayCharges: 0,
    medicineCharges: 30,
    labCharges: 0,
    otherCharges: 0,
    discountType: "fixed",
    discountAmount: 0,
    discountReason: "",
    gstPercent: 18,
    subtotal: 280,
    taxAmount: 50.4,
    totalAmount: 330.4,
    paidAmount: 330.4,
    balanceDue: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    invoiceDate: "2026-05-26",
    dueDate: "2026-06-26",
    notes: "",
    createdBy: "Dr. Emily Rodriguez",
  },
  {
    id: "BI003",
    invoiceNumber: "INV-2026-003",
    patientId: "BP003",
    patientName: "Maria Garcia",
    patientMobile: "+1 (555) 345-6789",
    doctorId: "DOC003",
    doctorName: "Dr. David Park",
    treatmentId: "TR003",
    treatmentName: "Dental Implant",
    treatmentCost: 3500,
    xrayCharges: 300,
    medicineCharges: 150,
    labCharges: 500,
    otherCharges: 100,
    discountType: "percentage",
    discountAmount: 5,
    discountReason: "Insurance coverage",
    gstPercent: 18,
    subtotal: 4272.5,
    taxAmount: 769.05,
    totalAmount: 5041.55,
    paidAmount: 2500,
    balanceDue: 2541.55,
    paymentMethod: "insurance",
    paymentStatus: "partially_paid",
    invoiceDate: "2026-05-26",
    dueDate: "2026-06-26",
    notes: "Partial payment received. Balance due after implant crown placement.",
    createdBy: "Dr. David Park",
  },
  {
    id: "BI004",
    invoiceNumber: "INV-2026-004",
    patientId: "BP004",
    patientName: "Robert Brown",
    patientMobile: "+1 (555) 456-7890",
    doctorId: "DOC002",
    doctorName: "Dr. Emily Rodriguez",
    treatmentId: "TR004",
    treatmentName: "Porcelain Crown",
    treatmentCost: 900,
    xrayCharges: 100,
    medicineCharges: 50,
    labCharges: 300,
    otherCharges: 0,
    discountType: "fixed",
    discountAmount: 50,
    discountReason: "Referral discount",
    gstPercent: 18,
    subtotal: 1300,
    taxAmount: 234,
    totalAmount: 1534,
    paidAmount: 800,
    balanceDue: 734,
    paymentMethod: "debit_card",
    paymentStatus: "partially_paid",
    invoiceDate: "2026-05-27",
    dueDate: "2026-06-27",
    notes: "Crown fitting scheduled next week",
    createdBy: "Dr. Emily Rodriguez",
  },
  {
    id: "BI005",
    invoiceNumber: "INV-2026-005",
    patientId: "BP005",
    patientName: "Lisa Chen",
    patientMobile: "+1 (555) 567-8901",
    doctorId: "DOC001",
    doctorName: "Dr. Michael Chen",
    treatmentId: "TR005",
    treatmentName: "Composite Filling",
    treatmentCost: 180,
    xrayCharges: 50,
    medicineCharges: 20,
    labCharges: 0,
    otherCharges: 0,
    discountType: "fixed",
    discountAmount: 0,
    discountReason: "",
    gstPercent: 18,
    subtotal: 250,
    taxAmount: 45,
    totalAmount: 295,
    paidAmount: 0,
    balanceDue: 295,
    paymentMethod: "cash",
    paymentStatus: "pending",
    invoiceDate: "2026-05-27",
    dueDate: "2026-06-10",
    notes: "Payment pending - patient to pay on next visit",
    createdBy: "Dr. Michael Chen",
  },
  {
    id: "BI006",
    invoiceNumber: "INV-2026-006",
    patientId: "BP006",
    patientName: "David Martinez",
    patientMobile: "+1 (555) 678-9012",
    doctorId: "DOC003",
    doctorName: "Dr. David Park",
    treatmentId: "TR006",
    treatmentName: "Wisdom Tooth Extraction",
    treatmentCost: 600,
    xrayCharges: 100,
    medicineCharges: 120,
    labCharges: 0,
    otherCharges: 50,
    discountType: "fixed",
    discountAmount: 0,
    discountReason: "",
    gstPercent: 18,
    subtotal: 870,
    taxAmount: 156.6,
    totalAmount: 1026.6,
    paidAmount: 1026.6,
    balanceDue: 0,
    paymentMethod: "upi",
    paymentStatus: "paid",
    invoiceDate: "2026-05-27",
    dueDate: "2026-06-27",
    notes: "Post-operative review in 1 week",
    createdBy: "Dr. David Park",
  },
  {
    id: "BI007",
    invoiceNumber: "INV-2026-007",
    patientId: "BP007",
    patientName: "Jennifer Lee",
    patientMobile: "+1 (555) 789-0123",
    doctorId: "DOC004",
    doctorName: "Dr. Sarah Kim",
    treatmentId: "TR007",
    treatmentName: "Invisalign Consultation",
    treatmentCost: 150,
    xrayCharges: 200,
    medicineCharges: 0,
    labCharges: 0,
    otherCharges: 0,
    discountType: "fixed",
    discountAmount: 0,
    discountReason: "",
    gstPercent: 18,
    subtotal: 350,
    taxAmount: 63,
    totalAmount: 413,
    paidAmount: 0,
    balanceDue: 413,
    paymentMethod: "credit_card",
    paymentStatus: "pending",
    invoiceDate: "2026-05-28",
    dueDate: "2026-06-15",
    notes: "Consultation fee to be adjusted in treatment plan",
    createdBy: "Dr. Sarah Kim",
  },
  {
    id: "BI008",
    invoiceNumber: "INV-2026-008",
    patientId: "BP001",
    patientName: "Sarah Johnson",
    patientMobile: "+1 (555) 123-4567",
    doctorId: "DOC002",
    doctorName: "Dr. Emily Rodriguez",
    treatmentId: "TR009",
    treatmentName: "General Checkup",
    treatmentCost: 100,
    xrayCharges: 50,
    medicineCharges: 0,
    labCharges: 0,
    otherCharges: 0,
    discountType: "fixed",
    discountAmount: 0,
    discountReason: "",
    gstPercent: 18,
    subtotal: 150,
    taxAmount: 27,
    totalAmount: 177,
    paidAmount: 177,
    balanceDue: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    invoiceDate: "2026-05-20",
    dueDate: "2026-06-20",
    notes: "",
    createdBy: "Dr. Emily Rodriguez",
  },
];

// Payment Records
export const paymentRecords: PaymentRecord[] = [
  { id: "PR001", invoiceId: "BI001", invoiceNumber: "INV-2026-001", patientId: "BP001", patientName: "Sarah Johnson", amount: 1518.66, paymentMethod: "credit_card", paymentDate: "2026-05-25", notes: "Full payment" },
  { id: "PR002", invoiceId: "BI002", invoiceNumber: "INV-2026-002", patientId: "BP002", patientName: "James Wilson", amount: 330.4, paymentMethod: "cash", paymentDate: "2026-05-26", notes: "Full payment" },
  { id: "PR003", invoiceId: "BI003", invoiceNumber: "INV-2026-003", patientId: "BP003", patientName: "Maria Garcia", amount: 2500, paymentMethod: "insurance", paymentDate: "2026-05-26", notes: "Partial - insurance claim" },
  { id: "PR004", invoiceId: "BI004", invoiceNumber: "INV-2026-004", patientId: "BP004", patientName: "Robert Brown", amount: 800, paymentMethod: "debit_card", paymentDate: "2026-05-27", notes: "Partial payment" },
  { id: "PR005", invoiceId: "BI006", invoiceNumber: "INV-2026-006", patientId: "BP006", patientName: "David Martinez", amount: 1026.6, paymentMethod: "upi", paymentDate: "2026-05-27", notes: "Full payment via UPI" },
  { id: "PR006", invoiceId: "BI008", invoiceNumber: "INV-2026-008", patientId: "BP001", patientName: "Sarah Johnson", amount: 177, paymentMethod: "cash", paymentDate: "2026-05-20", notes: "Checkup payment" },
];

// Doctor Revenue Data
export const doctorRevenueData: DoctorRevenue[] = [
  { doctorId: "DOC001", doctorName: "Dr. Michael Chen", specialization: "Endodontist", totalRevenue: 1813.66, totalTreatments: 3, collections: 1695.66, pending: 295 },
  { doctorId: "DOC002", doctorName: "Dr. Emily Rodriguez", specialization: "General Dentist", totalRevenue: 2041.4, totalTreatments: 3, collections: 1307.4, pending: 734 },
  { doctorId: "DOC003", doctorName: "Dr. David Park", specialization: "Oral Surgeon", totalRevenue: 6068.15, totalTreatments: 3, collections: 3526.6, pending: 2541.55 },
  { doctorId: "DOC004", doctorName: "Dr. Sarah Kim", specialization: "Orthodontist", totalRevenue: 413, totalTreatments: 1, collections: 0, pending: 413 },
];

// Daily Collection Data
export const dailyCollections = [
  { date: "2026-05-20", revenue: 177, invoiceCount: 1, cash: 177, card: 0, upi: 0, insurance: 0 },
  { date: "2026-05-21", revenue: 0, invoiceCount: 0, cash: 0, card: 0, upi: 0, insurance: 0 },
  { date: "2026-05-22", revenue: 0, invoiceCount: 0, cash: 0, card: 0, upi: 0, insurance: 0 },
  { date: "2026-05-23", revenue: 0, invoiceCount: 0, cash: 0, card: 0, upi: 0, insurance: 0 },
  { date: "2026-05-24", revenue: 0, invoiceCount: 0, cash: 0, card: 0, upi: 0, insurance: 0 },
  { date: "2026-05-25", revenue: 1518.66, invoiceCount: 1, cash: 0, card: 1518.66, upi: 0, insurance: 0 },
  { date: "2026-05-26", revenue: 2830.4, invoiceCount: 2, cash: 330.4, card: 0, upi: 0, insurance: 2500 },
  { date: "2026-05-27", revenue: 1826.6, invoiceCount: 3, cash: 0, card: 800, upi: 1026.6, insurance: 0 },
  { date: "2026-05-28", revenue: 0, invoiceCount: 2, cash: 0, card: 0, upi: 0, insurance: 0 },
];

// Helper functions
export function getPaymentStatusColor(status: PaymentStatus): string {
  switch (status) {
    case "paid": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "partially_paid": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "pending": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }
}

export function getTreatmentStatusColor(status: TreatmentStatus): string {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "in_progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "planned": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
  }
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatPaymentMethod(method: PaymentMethod): string {
  switch (method) {
    case "cash": return "Cash";
    case "credit_card": return "Credit Card";
    case "debit_card": return "Debit Card";
    case "upi": return "UPI";
    case "insurance": return "Insurance";
    case "bank_transfer": return "Bank Transfer";
  }
}

export function formatTreatmentCategory(category: TreatmentCategory): string {
  return category.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
