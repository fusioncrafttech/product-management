import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Receipt,
  Stethoscope,
  Wrench,
  MessageSquare,
  BarChart3,
  ClipboardCheck,
  Settings,
  X,
  Activity,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Appointments", path: "/admin/appointments", icon: Calendar },
  { label: "Billing", path: "/admin/billing", icon: Receipt },
  { label: "Patients", path: "/admin/patients", icon: Users },
  { label: "Treatments", path: "/admin/treatment-records", icon: FileText },
  { label: "Payments", path: "/admin/payments", icon: DollarSign },
  { label: "Revenue", path: "/admin/revenue", icon: TrendingUp },
  { label: "Doctors", path: "/admin/doctors", icon: Stethoscope },
  { label: "Services", path: "/admin/services", icon: Wrench },
  { label: "Inquiry", path: "/admin/inquiry", icon: MessageSquare },
  { label: "Reports", path: "/admin/reports", icon: BarChart3 },
  { label: "Nurse Attendance", path: "/admin/attendance", icon: ClipboardCheck },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    // Swipe left to close
    if (diff > 80) onClose();
    touchStartX.current = null;
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">DentaCare</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent active:bg-accent/80 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 overflow-y-auto p-3 pb-24 scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
                  "min-h-[44px]", // Touch-friendly minimum height
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-sidebar-foreground hover:bg-accent hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border bg-sidebar p-3">
          <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">DC</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">DentaCare Clinic</p>
              <p className="text-xs text-muted-foreground truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
