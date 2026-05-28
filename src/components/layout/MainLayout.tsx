import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useSidebar } from "@/hooks/useSidebar";

export function MainLayout() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar isOpen={isOpen} onClose={close} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Navbar onMenuClick={toggle} />
        <main className="flex-1 overflow-y-auto bg-background p-3 sm:p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
