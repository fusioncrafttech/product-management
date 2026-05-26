import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useSidebar } from "@/hooks/useSidebar";

export function MainLayout() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} onClose={close} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={toggle} />
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
