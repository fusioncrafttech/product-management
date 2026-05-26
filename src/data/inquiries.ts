export interface Inquiry {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "replied" | "closed";
  priority: "low" | "medium" | "high";
}

export const inquiries: Inquiry[] = [
  {
    id: "INQ001",
    patientName: "Alice Thompson",
    email: "alice.t@email.com",
    phone: "+1 (555) 111-2222",
    subject: "Appointment Rescheduling",
    message: "I need to reschedule my appointment from May 28 to May 30. Is that possible?",
    date: "2026-05-25",
    status: "new",
    priority: "medium",
  },
  {
    id: "INQ002",
    patientName: "George Miller",
    email: "george.m@email.com",
    phone: "+1 (555) 222-3333",
    subject: "Insurance Coverage Query",
    message: "Does your clinic accept Blue Cross Blue Shield insurance for dental implants?",
    date: "2026-05-24",
    status: "replied",
    priority: "low",
  },
  {
    id: "INQ003",
    patientName: "Patricia Moore",
    email: "patricia.m@email.com",
    phone: "+1 (555) 333-4444",
    subject: "Emergency Dental Pain",
    message: "I have severe tooth pain and need an emergency appointment as soon as possible.",
    date: "2026-05-26",
    status: "new",
    priority: "high",
  },
  {
    id: "INQ004",
    patientName: "Richard Clark",
    email: "richard.c@email.com",
    phone: "+1 (555) 444-5555",
    subject: "Treatment Cost Inquiry",
    message: "Could you provide me with an estimate for a full set of dental veneers?",
    date: "2026-05-23",
    status: "replied",
    priority: "low",
  },
  {
    id: "INQ005",
    patientName: "Susan Wright",
    email: "susan.w@email.com",
    phone: "+1 (555) 555-6666",
    subject: "Post-Treatment Follow-up",
    message: "I had a root canal last week and I'm still experiencing some discomfort. Is this normal?",
    date: "2026-05-26",
    status: "new",
    priority: "high",
  },
  {
    id: "INQ006",
    patientName: "Thomas Harris",
    email: "thomas.h@email.com",
    phone: "+1 (555) 666-7777",
    subject: "New Patient Registration",
    message: "I'd like to register as a new patient. What documents do I need to bring?",
    date: "2026-05-22",
    status: "closed",
    priority: "low",
  },
  {
    id: "INQ007",
    patientName: "Nancy Lopez",
    email: "nancy.l@email.com",
    phone: "+1 (555) 777-8888",
    subject: "Teeth Whitening Options",
    message: "What whitening options do you offer? I'm interested in professional in-office whitening.",
    date: "2026-05-25",
    status: "new",
    priority: "medium",
  },
  {
    id: "INQ008",
    patientName: "Kevin Young",
    email: "kevin.y@email.com",
    phone: "+1 (555) 888-9999",
    subject: "Payment Plan Request",
    message: "Do you offer payment plans for dental implant procedures?",
    date: "2026-05-24",
    status: "replied",
    priority: "medium",
  },
];
