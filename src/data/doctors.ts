export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
  status: 'Available' | 'In Surgery' | 'On Leave';
  rating: number;
  patients: number;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Dentistry',
    experience: '12 years',
    phone: '+1 234-567-1111',
    email: 'sarah.johnson@dentalcare.com',
    status: 'Available',
    rating: 4.8,
    patients: 450
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Orthodontics',
    experience: '8 years',
    phone: '+1 234-567-1112',
    email: 'michael.chen@dentalcare.com',
    status: 'In Surgery',
    rating: 4.9,
    patients: 320
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    specialization: 'Pediatric Dentistry',
    experience: '6 years',
    phone: '+1 234-567-1113',
    email: 'emily.brown@dentalcare.com',
    status: 'Available',
    rating: 4.7,
    patients: 280
  },
  {
    id: '4',
    name: 'Dr. David Wilson',
    specialization: 'Oral Surgery',
    experience: '15 years',
    phone: '+1 234-567-1114',
    email: 'david.wilson@dentalcare.com',
    status: 'On Leave',
    rating: 4.9,
    patients: 520
  },
  {
    id: '5',
    name: 'Dr. Amanda Martinez',
    specialization: 'Cosmetic Dentistry',
    experience: '10 years',
    phone: '+1 234-567-1115',
    email: 'amanda.martinez@dentalcare.com',
    status: 'Available',
    rating: 4.6,
    patients: 380
  }
];
