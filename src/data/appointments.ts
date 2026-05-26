export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  service: string;
  notes?: string;
}

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Smith',
    patientPhone: '+1 234-567-8900',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '09:00 AM',
    status: 'Confirmed',
    service: 'Teeth Cleaning',
    notes: 'Regular checkup'
  },
  {
    id: '2',
    patientName: 'Emily Davis',
    patientPhone: '+1 234-567-8901',
    doctor: 'Dr. Michael Chen',
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'Pending',
    service: 'Root Canal',
    notes: 'Pain in lower molar'
  },
  {
    id: '3',
    patientName: 'Robert Wilson',
    patientPhone: '+1 234-567-8902',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-01-14',
    time: '02:00 PM',
    status: 'Completed',
    service: 'Dental Filling',
    notes: 'Cavity treatment'
  },
  {
    id: '4',
    patientName: 'Lisa Anderson',
    patientPhone: '+1 234-567-8903',
    doctor: 'Dr. Emily Brown',
    date: '2024-01-16',
    time: '11:00 AM',
    status: 'Confirmed',
    service: 'Teeth Whitening',
    notes: 'Cosmetic procedure'
  },
  {
    id: '5',
    patientName: 'James Taylor',
    patientPhone: '+1 234-567-8904',
    doctor: 'Dr. Michael Chen',
    date: '2024-01-14',
    time: '03:30 PM',
    status: 'Cancelled',
    service: 'Dental Extraction',
    notes: 'Patient cancelled'
  },
  {
    id: '6',
    patientName: 'Maria Garcia',
    patientPhone: '+1 234-567-8905',
    doctor: 'Dr. Emily Brown',
    date: '2024-01-17',
    time: '09:30 AM',
    status: 'Pending',
    service: 'Orthodontic Consultation',
    notes: 'Braces consultation'
  },
  {
    id: '7',
    patientName: 'David Martinez',
    patientPhone: '+1 234-567-8906',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-01-17',
    time: '01:00 PM',
    status: 'Confirmed',
    service: 'Dental Crown',
    notes: 'Crown replacement'
  },
  {
    id: '8',
    patientName: 'Jennifer Lee',
    patientPhone: '+1 234-567-8907',
    doctor: 'Dr. Michael Chen',
    date: '2024-01-18',
    time: '10:00 AM',
    status: 'Pending',
    service: 'Gum Treatment',
    notes: 'Gingivitis treatment'
  }
];
