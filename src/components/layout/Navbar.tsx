import { useState } from "react";
import { Search, Bell, Moon, Sun, Menu, User, LogOut, Settings, Calendar, Receipt, MessageSquare, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type NotificationType = "appointment" | "billing" | "inquiry";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "New Appointment",
    message: "John Smith booked a dental cleaning for tomorrow at 10:00 AM.",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "billing",
    title: "Payment Received",
    message: "Invoice #INV-2024-089 has been paid — $450.00.",
    time: "20 min ago",
    read: false,
  },
  {
    id: "3",
    type: "inquiry",
    title: "New Inquiry",
    message: "Sarah Johnson asked about teeth whitening services.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "appointment",
    title: "Appointment Cancelled",
    message: "Mike Davis cancelled his 3:00 PM appointment today.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "billing",
    title: "Overdue Invoice",
    message: "Invoice #INV-2024-072 is 7 days overdue — $320.00.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "6",
    type: "inquiry",
    title: "Inquiry Follow-up",
    message: "David Lee responded to your message about orthodontics.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "7",
    type: "appointment",
    title: "Appointment Reminder",
    message: "3 appointments scheduled for tomorrow morning.",
    time: "6 hours ago",
    read: true,
  },
];

const notificationIcon: Record<NotificationType, typeof Calendar> = {
  appointment: Calendar,
  billing: Receipt,
  inquiry: MessageSquare,
};

const notificationColor: Record<NotificationType, string> = {
  appointment: "bg-primary/10 text-primary",
  billing: "bg-warning/10 text-warning",
  inquiry: "bg-success/10 text-success",
};

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4 lg:px-6">
      {/* Left section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients, appointments..."
            className="w-64 pl-9 lg:w-80"
          />
        </div>
      </div>

      {/* Mobile search bar (full-width overlay) */}
      {showMobileSearch && (
        <div className="absolute inset-0 z-50 flex items-center bg-background px-3 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full pl-9"
              autoFocus
              onBlur={() => setShowMobileSearch(false)}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowMobileSearch(false)} className="ml-2">
            Cancel
          </Button>
        </div>
      )}

      {/* Right section */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile search trigger */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileSearch(true)}>
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-24px)] sm:w-96 p-0" align="end" forceMount>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">Notifications</p>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = notificationIcon[notification.type];
                  return (
                    <button
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={cn(
                        "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors border-b border-border last:border-0",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", notificationColor[notification.type])}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={cn("text-sm truncate", !notification.read ? "font-semibold text-foreground" : "font-medium text-foreground/80")}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-[11px] text-muted-foreground/70 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-2.5">
              <button className="w-full text-center text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                View all notifications
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@dentacare.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
