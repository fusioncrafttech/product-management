import { useState } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return { isOpen, isCollapsed, toggle, open, close, toggleCollapse, setIsOpen };
}
