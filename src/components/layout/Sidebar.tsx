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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Appointments", path: "/appointments", icon: Calendar },
  { label: "Billing", path: "/billing", icon: Receipt },
  { label: "Doctors", path: "/doctors", icon: Stethoscope },
  { label: "Services", path: "/services", icon: Wrench },
  { label: "Inquiry", path: "/inquiry", icon: MessageSquare },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Nurse Attendance", path: "/attendance", icon: ClipboardCheck },
  { label: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
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
            className="rounded-lg p-1 hover:bg-accent lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
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
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2">
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
