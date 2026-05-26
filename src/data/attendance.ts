export interface AttendanceRecord {
  id: string;
  nurseName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "late" | "half-day";
  hoursWorked: number;
  department: string;
}

export const attendance: AttendanceRecord[] = [
  {
    id: "ATT001",
    nurseName: "Jessica Adams",
    date: "2026-05-27",
    checkIn: "08:00 AM",
    checkOut: "04:00 PM",
    status: "present",
    hoursWorked: 8,
    department: "General",
  },
  {
    id: "ATT002",
    nurseName: "Karen Mitchell",
    date: "2026-05-27",
    checkIn: "08:15 AM",
    checkOut: "04:00 PM",
    status: "late",
    hoursWorked: 7.75,
    department: "Surgery",
  },
  {
    id: "ATT003",
    nurseName: "Laura Peterson",
    date: "2026-05-27",
    checkIn: "08:00 AM",
    checkOut: "12:00 PM",
    status: "half-day",
    hoursWorked: 4,
    department: "Orthodontics",
  },
  {
    id: "ATT004",
    nurseName: "Rachel Cooper",
    date: "2026-05-27",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    hoursWorked: 0,
    department: "General",
  },
  {
    id: "ATT005",
    nurseName: "Diana Howard",
    date: "2026-05-27",
    checkIn: "07:55 AM",
    checkOut: "04:00 PM",
    status: "present",
    hoursWorked: 8,
    department: "Pediatrics",
  },
  {
    id: "ATT006",
    nurseName: "Michelle Ward",
    date: "2026-05-27",
    checkIn: "08:00 AM",
    checkOut: "04:00 PM",
    status: "present",
    hoursWorked: 8,
    department: "Surgery",
  },
  {
    id: "ATT007",
    nurseName: "Angela Torres",
    date: "2026-05-26",
    checkIn: "08:00 AM",
    checkOut: "04:00 PM",
    status: "present",
    hoursWorked: 8,
    department: "General",
  },
  {
    id: "ATT008",
    nurseName: "Jessica Adams",
    date: "2026-05-26",
    checkIn: "08:30 AM",
    checkOut: "04:00 PM",
    status: "late",
    hoursWorked: 7.5,
    department: "General",
  },
  {
    id: "ATT009",
    nurseName: "Karen Mitchell",
    date: "2026-05-26",
    checkIn: "08:00 AM",
    checkOut: "04:00 PM",
    status: "present",
    hoursWorked: 8,
    department: "Surgery",
  },
  {
    id: "ATT010",
    nurseName: "Laura Peterson",
    date: "2026-05-26",
    checkIn: "08:00 AM",
    checkOut: "04:00 PM",
    status: "present",
    hoursWorked: 8,
    department: "Orthodontics",
  },
];

export const attendanceSummary = {
  totalNurses: 7,
  present: 4,
  absent: 1,
  late: 1,
  halfDay: 1,
};
