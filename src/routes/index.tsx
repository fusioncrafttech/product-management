import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import Appointments from "@/pages/Appointments";
import AppointmentCalendar from "@/pages/AppointmentCalendar";
import Billing from "@/pages/Billing";
import Doctors from "@/pages/Doctors";
import DoctorProfile from "@/pages/DoctorProfile";
import Services from "@/pages/Services";
import Inquiry from "@/pages/Inquiry";
import Reports from "@/pages/Reports";
import Attendance from "@/pages/Attendance";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";

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
      { path: "billing", element: <Billing /> },
      { path: "doctors", element: <Doctors /> },
      { path: "doctors/:doctorId", element: <DoctorProfile /> },
      { path: "services", element: <Services /> },
      { path: "inquiry", element: <Inquiry /> },
      { path: "reports", element: <Reports /> },
      { path: "attendance", element: <Attendance /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
