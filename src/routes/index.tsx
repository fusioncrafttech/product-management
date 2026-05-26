import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Appointments from "@/pages/Appointments";
import Billing from "@/pages/Billing";
import Doctors from "@/pages/Doctors";
import Services from "@/pages/Services";
import Inquiry from "@/pages/Inquiry";
import Reports from "@/pages/Reports";
import Attendance from "@/pages/Attendance";
import Settings from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "appointments", element: <Appointments /> },
      { path: "billing", element: <Billing /> },
      { path: "doctors", element: <Doctors /> },
      { path: "services", element: <Services /> },
      { path: "inquiry", element: <Inquiry /> },
      { path: "reports", element: <Reports /> },
      { path: "attendance", element: <Attendance /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
