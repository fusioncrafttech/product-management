export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  isActive: boolean;
}

export const services: Service[] = [
  {
    id: "SRV001",
    name: "Teeth Cleaning",
    category: "Preventive",
    price: 150,
    duration: "30 min",
    description: "Professional dental cleaning to remove plaque and tartar buildup",
    isActive: true,
  },
  {
    id: "SRV002",
    name: "Root Canal Treatment",
    category: "Restorative",
    price: 1200,
    duration: "90 min",
    description: "Treatment to repair and save a badly damaged or infected tooth",
    isActive: true,
  },
  {
    id: "SRV003",
    name: "Dental Implant",
    category: "Surgical",
    price: 3500,
    duration: "120 min",
    description: "Permanent tooth replacement with titanium implant",
    isActive: true,
  },
  {
    id: "SRV004",
    name: "Teeth Whitening",
    category: "Cosmetic",
    price: 450,
    duration: "60 min",
    description: "Professional whitening treatment for brighter smile",
    isActive: true,
  },
  {
    id: "SRV005",
    name: "Orthodontics Consultation",
    category: "Orthodontics",
    price: 200,
    duration: "45 min",
    description: "Initial consultation for braces or aligners",
    isActive: true,
  },
  {
    id: "SRV006",
    name: "Cavity Filling",
    category: "Restorative",
    price: 300,
    duration: "45 min",
    description: "Composite or amalgam filling for tooth decay",
    isActive: true,
  },
  {
    id: "SRV007",
    name: "Wisdom Tooth Extraction",
    category: "Surgical",
    price: 800,
    duration: "60 min",
    description: "Surgical removal of wisdom teeth",
    isActive: true,
  },
  {
    id: "SRV008",
    name: "Dental Crown",
    category: "Restorative",
    price: 950,
    duration: "60 min",
    description: "Custom crown to cover and protect a damaged tooth",
    isActive: true,
  },
  {
    id: "SRV009",
    name: "Veneer Placement",
    category: "Cosmetic",
    price: 2200,
    duration: "90 min",
    description: "Porcelain veneers for cosmetic tooth enhancement",
    isActive: true,
  },
  {
    id: "SRV010",
    name: "Dental X-Ray",
    category: "Diagnostic",
    price: 75,
    duration: "15 min",
    description: "Digital dental X-ray for diagnosis",
    isActive: true,
  },
  {
    id: "SRV011",
    name: "Gum Treatment",
    category: "Periodontics",
    price: 600,
    duration: "45 min",
    description: "Treatment for gum disease and inflammation",
    isActive: true,
  },
  {
    id: "SRV012",
    name: "Dental Bridge",
    category: "Restorative",
    price: 1800,
    duration: "90 min",
    description: "Fixed bridge to replace missing teeth",
    isActive: false,
  },
];

export const serviceCategories = [
  "All",
  "Preventive",
  "Restorative",
  "Cosmetic",
  "Surgical",
  "Orthodontics",
  "Diagnostic",
  "Periodontics",
];
