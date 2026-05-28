import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { JrDoctorLayout } from "@/components/layout/JrDoctorLayout";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import Appointments from "@/pages/Appointments";
import AppointmentCalendar from "@/pages/AppointmentCalendar";

import Doctors from "@/pages/Doctors";
import DoctorProfile from "@/pages/DoctorProfile";
import Services from "@/pages/Services";
import Inquiry from "@/pages/Inquiry";
import Reports from "@/pages/Reports";
import Attendance from "@/pages/Attendance";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";

// Billing Module Pages
import AdminPatients from "@/pages/billing/AdminPatients";
import AdminTreatmentRecords from "@/pages/billing/AdminTreatmentRecords";
import AdminBillingDashboard from "@/pages/billing/AdminBillingDashboard";
import AdminPayments from "@/pages/billing/AdminPayments";
import AdminRevenue from "@/pages/billing/AdminRevenue";
import AdminInvoicePrint from "@/pages/billing/AdminInvoicePrint";
import JrNewBilling from "@/pages/billing/JrNewBilling";
import JrMyBills from "@/pages/billing/JrMyBills";
import JrMyPatients from "@/pages/billing/JrMyPatients";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "appointments", element: <Appointments /> },
      { path: "appointments/calendar", element: <AppointmentCalendar /> },
      { path: "billing", element: <AdminBillingDashboard /> },
      { path: "patients", element: <AdminPatients /> },
      { path: "treatment-records", element: <AdminTreatmentRecords /> },
      { path: "payments", element: <AdminPayments /> },
      { path: "revenue", element: <AdminRevenue /> },
      { path: "invoice-print/:invoiceId", element: <AdminInvoicePrint /> },
      { path: "doctors", element: <Doctors /> },
      { path: "doctors/:doctorId", element: <DoctorProfile /> },
      { path: "services", element: <Services /> },
      { path: "inquiry", element: <Inquiry /> },
      { path: "reports", element: <Reports /> },
      { path: "attendance", element: <Attendance /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/jr-dashboard",
    element: <JrDoctorLayout />,
    children: [
      { index: true, element: <JrNewBilling /> },
      { path: "new-billing", element: <JrNewBilling /> },
      { path: "my-bills", element: <JrMyBills /> },
      { path: "my-patients", element: <JrMyPatients /> },
    ],
  },
]);
