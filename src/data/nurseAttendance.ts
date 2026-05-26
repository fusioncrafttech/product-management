export interface NurseAttendance {
  id: string;
  name: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  department: string;
}

export const nurseAttendance: NurseAttendance[] = [
  {
    id: '1',
    name: 'Nurse Amanda Clark',
    date: '2024-01-15',
    checkIn: '08:55 AM',
    checkOut: '05:00 PM',
    status: 'Present',
    department: 'General'
  },
  {
    id: '2',
    name: 'Nurse Brian Davis',
    date: '2024-01-15',
    checkIn: '09:15 AM',
    checkOut: '05:00 PM',
    status: 'Late',
    department: 'Surgery'
  },
  {
    id: '3',
    name: 'Nurse Catherine Evans',
    date: '2024-01-15',
    checkIn: '08:45 AM',
    checkOut: '01:00 PM',
    status: 'Half Day',
    department: 'Pediatric'
  },
  {
    id: '4',
    name: 'Nurse Daniel Foster',
    date: '2024-01-15',
    checkIn: '-',
    checkOut: '-',
    status: 'Absent',
    department: 'Orthodontics'
  },
  {
    id: '5',
    name: 'Nurse Emma Green',
    date: '2024-01-15',
    checkIn: '08:50 AM',
    checkOut: '05:10 PM',
    status: 'Present',
    department: 'General'
  },
  {
    id: '6',
    name: 'Nurse Amanda Clark',
    date: '2024-01-14',
    checkIn: '08:58 AM',
    checkOut: '05:05 PM',
    status: 'Present',
    department: 'General'
  },
  {
    id: '7',
    name: 'Nurse Brian Davis',
    date: '2024-01-14',
    checkIn: '08:52 AM',
    checkOut: '05:00 PM',
    status: 'Present',
    department: 'Surgery'
  },
  {
    id: '8',
    name: 'Nurse Catherine Evans',
    date: '2024-01-14',
    checkIn: '-',
    checkOut: '-',
    status: 'Absent',
    department: 'Pediatric'
  }
];
