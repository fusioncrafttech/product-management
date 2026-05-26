export interface Invoice {
  id: string;
  patientName: string;
  service: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue" | "partial";
  paymentMethod?: string;
}

export const invoices: Invoice[] = [
  {
    id: "INV001",
    patientName: "Sarah Johnson",
    service: "Root Canal Treatment",
    amount: 1200,
    date: "2026-05-20",
    dueDate: "2026-06-20",
    status: "paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    patientName: "James Wilson",
    service: "Teeth Cleaning",
    amount: 150,
    date: "2026-05-22",
    dueDate: "2026-06-22",
    status: "unpaid",
  },
  {
    id: "INV003",
    patientName: "Maria Garcia",
    service: "Dental Implant",
    amount: 3500,
    date: "2026-05-15",
    dueDate: "2026-06-15",
    status: "partial",
    paymentMethod: "Insurance",
  },
  {
    id: "INV004",
    patientName: "Robert Brown",
    service: "Teeth Whitening",
    amount: 450,
    date: "2026-05-18",
    dueDate: "2026-06-18",
    status: "paid",
    paymentMethod: "Debit Card",
  },
  {
    id: "INV005",
    patientName: "Lisa Anderson",
    service: "Orthodontics Consultation",
    amount: 200,
    date: "2026-05-10",
    dueDate: "2026-05-25",
    status: "overdue",
  },
  {
    id: "INV006",
    patientName: "David Martinez",
    service: "Cavity Filling",
    amount: 300,
    date: "2026-05-23",
    dueDate: "2026-06-23",
    status: "paid",
    paymentMethod: "Cash",
  },
  {
    id: "INV007",
    patientName: "Jennifer Lee",
    service: "Wisdom Tooth Extraction",
    amount: 800,
    date: "2026-05-25",
    dueDate: "2026-06-25",
    status: "unpaid",
  },
  {
    id: "INV008",
    patientName: "Michael Taylor",
    service: "Dental Crown",
    amount: 950,
    date: "2026-05-12",
    dueDate: "2026-05-27",
    status: "overdue",
  },
  {
    id: "INV009",
    patientName: "Emily White",
    service: "Teeth Cleaning",
    amount: 150,
    date: "2026-05-26",
    dueDate: "2026-06-26",
    status: "unpaid",
  },
  {
    id: "INV010",
    patientName: "Christopher Davis",
    service: "Veneer Placement",
    amount: 2200,
    date: "2026-05-24",
    dueDate: "2026-06-24",
    status: "paid",
    paymentMethod: "Credit Card",
  },
];

export const revenueSummary = {
  totalRevenue: 42500,
  paidAmount: 35200,
  pendingAmount: 5100,
  overdueAmount: 2200,
};
