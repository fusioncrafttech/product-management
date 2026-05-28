import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Calendar,
  Shield,
  Users,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Calendar,
    title: "Easy Appointments",
    description: "Book your dental appointment online in just a few clicks.",
  },
  {
    icon: Users,
    title: "Expert Dentists",
    description: "Our team of experienced dental professionals is here for you.",
  },
  {
    icon: Shield,
    title: "Safe & Hygienic",
    description: "We follow the highest standards of safety and sterilization.",
  },
];

const services = [
  "General Dentistry",
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics",
  "Root Canal Treatment",
  "Cosmetic Dentistry",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">DentaCare</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link to="/login">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-50/50 dark:from-primary/10 dark:to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Star className="h-3.5 w-3.5" />
                Trusted by 500+ clinics
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Smile,{" "}
                <span className="text-primary">Our Priority</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Experience world-class dental care with cutting-edge technology and compassionate professionals dedicated to your oral health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="gap-2">
                    Book Appointment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#services">
                  <Button variant="outline" size="lg">
                    Our Services
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">10,000+ Patients</p>
                  <p className="text-xs text-muted-foreground">Happy & healthy smiles</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-100 dark:from-primary/30 dark:to-blue-900/20 flex items-center justify-center">
                  <Stethoscope className="h-32 w-32 text-primary/40" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Next Available</p>
                      <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-semibold text-foreground">4.9/5</span>
                    <span className="text-xs text-muted-foreground">(2.4k reviews)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose DentaCare?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, technology, and compassion to deliver exceptional dental experiences.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive dental care services tailored to your needs.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground font-medium">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-blue-100 to-primary/10 dark:from-blue-900/30 dark:to-primary/20 flex items-center justify-center">
                <Users className="h-24 w-24 text-primary/30" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-foreground">About DentaCare</h2>
              <p className="text-muted-foreground">
                With over 15 years of experience, DentaCare has been providing exceptional dental services to our community. Our state-of-the-art facility and dedicated team ensure you receive the best care possible.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-2xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-2xl font-bold text-primary">25+</p>
                  <p className="text-sm text-muted-foreground">Expert Dentists</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card">
              <Phone className="h-6 w-6 text-primary mb-3" />
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card">
              <Mail className="h-6 w-6 text-primary mb-3" />
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">hello@dentacare.com</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card">
              <Clock className="h-6 w-6 text-primary mb-3" />
              <p className="text-sm font-medium text-foreground">Hours</p>
              <p className="text-sm text-muted-foreground">Mon-Sat: 9AM-7PM</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <p className="text-sm">123 Healthcare Blvd, Medical District, NY 10001</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">DentaCare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 DentaCare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
