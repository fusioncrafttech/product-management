export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  date: string;
}

export const inquiries: Inquiry[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 234-567-2221',
    subject: 'Appointment Inquiry',
    message: 'I would like to schedule a consultation for braces.',
    status: 'New',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1 234-567-2222',
    subject: 'Insurance Question',
    message: 'Do you accept my dental insurance plan?',
    status: 'In Progress',
    date: '2024-01-14'
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol.white@email.com',
    phone: '+1 234-567-2223',
    subject: 'Treatment Cost',
    message: 'What is the cost for a dental implant procedure?',
    status: 'Resolved',
    date: '2024-01-13'
  },
  {
    id: '4',
    name: 'Daniel Brown',
    email: 'daniel.brown@email.com',
    phone: '+1 234-567-2224',
    subject: 'Emergency Appointment',
    message: 'I have severe tooth pain and need immediate attention.',
    status: 'New',
    date: '2024-01-15'
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva.martinez@email.com',
    phone: '+1 234-567-2225',
    subject: 'General Information',
    message: 'What are your clinic hours on weekends?',
    status: 'In Progress',
    date: '2024-01-12'
  },
  {
    id: '6',
    name: 'Frank Lee',
    email: 'frank.lee@email.com',
    phone: '+1 234-567-2226',
    subject: 'Payment Options',
    message: 'Do you offer payment plans for expensive procedures?',
    status: 'Resolved',
    date: '2024-01-10'
  }
];
