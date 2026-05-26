export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  email: string;
  phone: string;
  availability: "available" | "busy" | "off-duty";
  patients: number;
  rating: number;
  image?: string;
}

export const doctors: Doctor[] = [
  {
    id: "DOC001",
    name: "Dr. Michael Chen",
    specialization: "Endodontist",
    experience: 12,
    email: "michael.chen@dentacare.com",
    phone: "+1 (555) 100-2001",
    availability: "available",
    patients: 245,
    rating: 4.9,
  },
  {
    id: "DOC002",
    name: "Dr. Emily Rodriguez",
    specialization: "General Dentist",
    experience: 8,
    email: "emily.rodriguez@dentacare.com",
    phone: "+1 (555) 100-2002",
    availability: "busy",
    patients: 312,
    rating: 4.8,
  },
  {
    id: "DOC003",
    name: "Dr. David Park",
    specialization: "Oral Surgeon",
    experience: 15,
    email: "david.park@dentacare.com",
    phone: "+1 (555) 100-2003",
    availability: "available",
    patients: 189,
    rating: 4.9,
  },
  {
    id: "DOC004",
    name: "Dr. Sarah Kim",
    specialization: "Orthodontist",
    experience: 10,
    email: "sarah.kim@dentacare.com",
    phone: "+1 (555) 100-2004",
    availability: "off-duty",
    patients: 278,
    rating: 4.7,
  },
  {
    id: "DOC005",
    name: "Dr. James Thompson",
    specialization: "Periodontist",
    experience: 6,
    email: "james.thompson@dentacare.com",
    phone: "+1 (555) 100-2005",
    availability: "available",
    patients: 156,
    rating: 4.6,
  },
  {
    id: "DOC006",
    name: "Dr. Amanda Foster",
    specialization: "Pediatric Dentist",
    experience: 9,
    email: "amanda.foster@dentacare.com",
    phone: "+1 (555) 100-2006",
    availability: "busy",
    patients: 203,
    rating: 4.8,
  },
];
