import { useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, FileText, Users, Activity, X, Menu, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useTheme } from "@/hooks/useTheme";
import { Breadcrumb } from "@/components/common/Breadcrumb";

const jrNavItems = [
  { label: "New Billing", path: "/jr-dashboard/new-billing", icon: Receipt },
  { label: "My Bills", path: "/jr-dashboard/my-bills", icon: FileText },
  { label: "My Patients", path: "/jr-dashboard/my-patients", icon: Users },
];

export function JrDoctorLayout() {
  const { isOpen, toggle, close } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 80) close();
    touchStartX.current = null;
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
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
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">DentaCare</span>
              <p className="text-[10px] text-muted-foreground leading-none">Junior Doctor</p>
            </div>
          </div>
          <button onClick={close} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent lg:hidden" aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto p-3 pb-24">
          {jrNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={close}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-medium">Dr. Emily Rodriguez</p>
              <p className="text-xs text-muted-foreground">General Dentist • Junior Doctor</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-3 sm:p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
