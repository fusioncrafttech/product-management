export interface Invoice {
  id: string;
  patientName: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Partial';
  services: string[];
  dueDate: string;
}

export const invoices: Invoice[] = [
  {
    id: '1',
    patientName: 'John Smith',
    invoiceNumber: 'INV-001',
    date: '2024-01-10',
    amount: 120,
    status: 'Paid',
    services: ['Teeth Cleaning'],
    dueDate: '2024-01-24'
  },
  {
    id: '2',
    patientName: 'Emily Davis',
    invoiceNumber: 'INV-002',
    date: '2024-01-12',
    amount: 800,
    status: 'Unpaid',
    services: ['Root Canal'],
    dueDate: '2024-01-26'
  },
  {
    id: '3',
    patientName: 'Robert Wilson',
    invoiceNumber: 'INV-003',
    date: '2024-01-08',
    amount: 200,
    status: 'Paid',
    services: ['Dental Filling'],
    dueDate: '2024-01-22'
  },
  {
    id: '4',
    patientName: 'Lisa Anderson',
    invoiceNumber: 'INV-004',
    date: '2024-01-14',
    amount: 350,
    status: 'Partial',
    services: ['Teeth Whitening'],
    dueDate: '2024-01-28'
  },
  {
    id: '5',
    patientName: 'Maria Garcia',
    invoiceNumber: 'INV-005',
    date: '2024-01-15',
    amount: 150,
    status: 'Unpaid',
    services: ['Orthodontic Consultation'],
    dueDate: '2024-01-29'
  },
  {
    id: '6',
    patientName: 'David Martinez',
    invoiceNumber: 'INV-006',
    date: '2024-01-13',
    amount: 1200,
    status: 'Paid',
    services: ['Dental Crown'],
    dueDate: '2024-01-27'
  }
];
