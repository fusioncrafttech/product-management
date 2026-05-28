type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "completed" | "pending" | "confirmed" | "cancelled" | "warning";

const appointmentVariants: Record<string, BadgeVariant> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};

const invoiceVariants: Record<string, BadgeVariant> = {
  paid: "completed",
  unpaid: "pending",
  overdue: "cancelled",
  partial: "warning",
};

const attendanceVariants: Record<string, BadgeVariant> = {
  present: "completed",
  absent: "cancelled",
  late: "warning",
  "half-day": "confirmed",
};

const inquiryStatusVariants: Record<string, BadgeVariant> = {
  new: "confirmed",
  replied: "completed",
  closed: "secondary",
};

const inquiryPriorityVariants: Record<string, BadgeVariant> = {
  high: "cancelled",
  medium: "warning",
  low: "secondary",
};

const doctorAvailabilityVariants: Record<string, BadgeVariant> = {
  available: "completed",
  busy: "warning",
  "off-duty": "secondary",
};

export function getStatusVariant(type: "appointment" | "invoice" | "attendance" | "inquiry" | "priority" | "availability", status: string): BadgeVariant {
  const maps: Record<string, Record<string, BadgeVariant>> = {
    appointment: appointmentVariants,
    invoice: invoiceVariants,
    attendance: attendanceVariants,
    inquiry: inquiryStatusVariants,
    priority: inquiryPriorityVariants,
    availability: doctorAvailabilityVariants,
  };
  return maps[type]?.[status] ?? "secondary";
}
