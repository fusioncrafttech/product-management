export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Teeth Cleaning',
    category: 'General',
    price: 120,
    duration: '30 min',
    description: 'Professional dental cleaning and polishing'
  },
  {
    id: '2',
    name: 'Root Canal',
    category: 'Surgical',
    price: 800,
    duration: '90 min',
    description: 'Root canal therapy for infected teeth'
  },
  {
    id: '3',
    name: 'Dental Filling',
    category: 'Restorative',
    price: 200,
    duration: '45 min',
    description: 'Composite or amalgam fillings for cavities'
  },
  {
    id: '4',
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    price: 350,
    duration: '60 min',
    description: 'Professional teeth whitening treatment'
  },
  {
    id: '5',
    name: 'Dental Extraction',
    category: 'Surgical',
    price: 250,
    duration: '30 min',
    description: 'Simple and surgical tooth extraction'
  },
  {
    id: '6',
    name: 'Dental Crown',
    category: 'Restorative',
    price: 1200,
    duration: '2 visits',
    description: 'Porcelain or metal crown placement'
  },
  {
    id: '7',
    name: 'Orthodontic Consultation',
    category: 'Orthodontics',
    price: 150,
    duration: '45 min',
    description: 'Initial consultation for braces or aligners'
  },
  {
    id: '8',
    name: 'Gum Treatment',
    category: 'Periodontal',
    price: 300,
    duration: '60 min',
    description: 'Treatment for gum disease and gingivitis'
  },
  {
    id: '9',
    name: 'Dental Implant',
    category: 'Surgical',
    price: 2500,
    duration: 'Multiple visits',
    description: 'Titanium implant for missing teeth'
  },
  {
    id: '10',
    name: 'Dentures',
    category: 'Prosthodontics',
    price: 1800,
    duration: 'Multiple visits',
    description: 'Complete or partial dentures'
  }
];
