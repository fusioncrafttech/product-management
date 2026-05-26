export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

export const appointments: Appointment[] = [
  {
    id: "APT001",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.j@email.com",
    patientPhone: "+1 (555) 123-4567",
    doctor: "Dr. Michael Chen",
    service: "Root Canal",
    date: "2026-05-27",
    time: "09:00 AM",
    status: "confirmed",
    notes: "Patient has mild anxiety, recommended sedation",
  },
  {
    id: "APT002",
    patientName: "James Wilson",
    patientEmail: "james.w@email.com",
    patientPhone: "+1 (555) 234-5678",
    doctor: "Dr. Emily Rodriguez",
    service: "Teeth Cleaning",
    date: "2026-05-27",
    time: "10:30 AM",
    status: "pending",
  },
  {
    id: "APT003",
    patientName: "Maria Garcia",
    patientEmail: "maria.g@email.com",
    patientPhone: "+1 (555) 345-6789",
    doctor: "Dr. David Park",
    service: "Dental Implant",
    date: "2026-05-27",
    time: "02:00 PM",
    status: "confirmed",
    notes: "Follow-up appointment after initial consultation",
  },
  {
    id: "APT004",
    patientName: "Robert Brown",
    patientEmail: "robert.b@email.com",
    patientPhone: "+1 (555) 456-7890",
    doctor: "Dr. Michael Chen",
    service: "Teeth Whitening",
    date: "2026-05-28",
    time: "11:00 AM",
    status: "pending",
  },
  {
    id: "APT005",
    patientName: "Lisa Anderson",
    patientEmail: "lisa.a@email.com",
    patientPhone: "+1 (555) 567-8901",
    doctor: "Dr. Sarah Kim",
    service: "Orthodontics Consultation",
    date: "2026-05-28",
    time: "03:30 PM",
    status: "completed",
  },
  {
    id: "APT006",
    patientName: "David Martinez",
    patientEmail: "david.m@email.com",
    patientPhone: "+1 (555) 678-9012",
    doctor: "Dr. Emily Rodriguez",
    service: "Cavity Filling",
    date: "2026-05-26",
    time: "09:30 AM",
    status: "completed",
  },
  {
    id: "APT007",
    patientName: "Jennifer Lee",
    patientEmail: "jennifer.l@email.com",
    patientPhone: "+1 (555) 789-0123",
    doctor: "Dr. David Park",
    service: "Wisdom Tooth Extraction",
    date: "2026-05-29",
    time: "01:00 PM",
    status: "confirmed",
  },
  {
    id: "APT008",
    patientName: "Michael Taylor",
    patientEmail: "michael.t@email.com",
    patientPhone: "+1 (555) 890-1234",
    doctor: "Dr. Sarah Kim",
    service: "Dental Crown",
    date: "2026-05-26",
    time: "04:00 PM",
    status: "cancelled",
    notes: "Patient rescheduled due to personal reasons",
  },
  {
    id: "APT009",
    patientName: "Emily White",
    patientEmail: "emily.w@email.com",
    patientPhone: "+1 (555) 901-2345",
    doctor: "Dr. Michael Chen",
    service: "Teeth Cleaning",
    date: "2026-05-29",
    time: "10:00 AM",
    status: "pending",
  },
  {
    id: "APT010",
    patientName: "Christopher Davis",
    patientEmail: "chris.d@email.com",
    patientPhone: "+1 (555) 012-3456",
    doctor: "Dr. Emily Rodriguez",
    service: "Veneer Placement",
    date: "2026-05-30",
    time: "11:30 AM",
    status: "confirmed",
  },
];
