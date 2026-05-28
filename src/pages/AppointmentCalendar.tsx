import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, User, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { getStatusVariant } from "@/lib/variants";
import { appointments, type Appointment } from "@/data/appointments";
import { doctors } from "@/data/doctors";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseTime(time: string): number {
  const [hourStr, period] = time.split(" ");
  const [hours] = hourStr.split(":").map(Number);
  if (period === "PM" && hours !== 12) return hours + 12;
  if (period === "AM" && hours === 12) return 0;
  return hours;
}

type CalendarView = "month" | "week" | "day";

export default function AppointmentCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState<CalendarView>("month");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const filteredAppointments = useMemo(() => {
    if (doctorFilter === "all") return appointments;
    return appointments.filter((a) => a.doctor === doctorFilter);
  }, [doctorFilter]);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    filteredAppointments.forEach((apt) => {
      if (!map[apt.date]) map[apt.date] = [];
      map[apt.date].push(apt);
    });
    return map;
  }, [filteredAppointments]);

  const navigate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() + direction);
    else if (view === "week") newDate.setDate(newDate.getDate() + direction * 7);
    else newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());

  const monthLabel = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Week view helpers
  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const dayAppointments = useMemo(() => {
    if (selectedDay) return appointmentsByDate[selectedDay] || [];
    const dateStr = formatDate(year, month, currentDate.getDate());
    return appointmentsByDate[dateStr] || [];
  }, [selectedDay, appointmentsByDate, year, month, currentDate]);

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: React.ReactNode[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-24 border border-border/50 bg-muted/20" />);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day);
      const dayApts = appointmentsByDate[dateStr] || [];
      const isToday =
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

      cells.push(
        <div
          key={day}
          className={`h-24 border border-border/50 p-1 cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden ${
            isToday ? "bg-primary/5 border-primary/30" : ""
          }`}
          onClick={() => setSelectedDay(dateStr)}
        >
          <span
            className={`text-xs font-medium ${
              isToday ? "bg-primary text-primary-foreground rounded-full px-1.5 py-0.5" : "text-foreground"
            }`}
          >
            {day}
          </span>
          <div className="mt-1 space-y-0.5">
            {dayApts.slice(0, 3).map((apt) => (
              <div
                key={apt.id}
                className="text-[10px] leading-tight truncate rounded px-1 py-0.5 bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAppointment(apt);
                }}
              >
                {apt.time.replace(":00", "")} {apt.patientName.split(" ")[0]}
              </div>
            ))}
            {dayApts.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{dayApts.length - 3} more</span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7">
        {DAYS.map((day) => (
          <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground border-b border-border">
            {day}
          </div>
        ))}
        {cells}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates();

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-2 text-xs text-muted-foreground" />
            {weekDates.map((date) => {
              const isToday = date.toDateString() === today.toDateString();
              return (
                <div key={date.toISOString()} className={`p-2 text-center border-l border-border ${isToday ? "bg-primary/5" : ""}`}>
                  <div className="text-xs text-muted-foreground">{DAYS[date.getDay()]}</div>
                  <div className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Time slots */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border/50">
              <div className="p-2 text-xs text-muted-foreground text-right pr-3">
                {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? "PM" : "AM"}
              </div>
              {weekDates.map((date) => {
                const dateStr = formatDate(date.getFullYear(), date.getMonth(), date.getDate());
                const hourApts = (appointmentsByDate[dateStr] || []).filter(
                  (a) => parseTime(a.time) === hour
                );
                return (
                  <div key={date.toISOString() + hour} className="border-l border-border/50 p-0.5 min-h-[3rem]">
                    {hourApts.map((apt) => (
                      <div
                        key={apt.id}
                        className="text-[10px] rounded px-1 py-0.5 bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 truncate"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        {apt.patientName.split(" ")[0]} - {apt.service}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dateStr = formatDate(year, month, currentDate.getDate());
    const dayApts = appointmentsByDate[dateStr] || [];

    return (
      <div className="space-y-1">
        {HOURS.map((hour) => {
          const hourApts = dayApts.filter((a) => parseTime(a.time) === hour);
          return (
            <div key={hour} className="flex border-b border-border/50">
              <div className="w-20 shrink-0 p-3 text-sm text-muted-foreground text-right pr-4">
                {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? "PM" : "AM"}
              </div>
              <div className="flex-1 min-h-[4rem] p-1 space-y-1">
                {hourApts.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.service} • {apt.doctor}</p>
                    </div>
                    <Badge variant={getStatusVariant("appointment", apt.status)} className="shrink-0">
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Appointment Calendar" description="Visual scheduling overview for your dental clinic">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </PageHeader>

      <AnimatedSection>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigate(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h2 className="ml-2 text-lg font-semibold text-foreground">{monthLabel}</h2>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Doctors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {doctors.map((doc) => (
                      <SelectItem key={doc.id} value={doc.name}>{doc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={view} onValueChange={(v) => setView(v as CalendarView)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {view === "month" && renderMonthView()}
            {view === "week" && renderWeekView()}
            {view === "day" && renderDayView()}
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Day detail sidebar when clicking a day in month view */}
      {selectedDay && view === "month" && (
        <AnimatedSection delay={0.1}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {new Date(selectedDay + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric",
                  })}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedDay(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {dayAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No appointments scheduled</p>
              ) : (
                <div className="space-y-3">
                  {dayAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate">{apt.patientName}</p>
                          <Badge variant={getStatusVariant("appointment", apt.status)} className="text-[10px]">
                            {apt.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {apt.time} • {apt.service} • {apt.doctor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Appointment Detail Modal */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ID: {selectedAppointment.id}</span>
                <Badge variant={getStatusVariant("appointment", selectedAppointment.status)}>
                  {selectedAppointment.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{selectedAppointment.patientName}</p>
                    <p className="text-xs text-muted-foreground">{selectedAppointment.patientEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Doctor</p>
                    <p className="font-medium">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Service</p>
                    <p className="font-medium">{selectedAppointment.service}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedAppointment.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">{selectedAppointment.time}</p>
                  </div>
                </div>
                {selectedAppointment.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm mt-1 rounded-md bg-muted p-2">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
