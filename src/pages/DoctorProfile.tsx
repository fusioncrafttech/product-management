import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Star, Phone, Mail, Clock, Users, Calendar,
  Award, TrendingUp, MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { StatsCard } from "@/components/common/StatsCard";
import { getStatusVariant } from "@/lib/variants";
import { doctors } from "@/data/doctors";
import { appointments } from "@/data/appointments";

export default function DoctorProfile() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();

  const doctor = useMemo(() => doctors.find((d) => d.id === doctorId), [doctorId]);

  const doctorAppointments = useMemo(() => {
    if (!doctor) return [];
    return appointments.filter((a) => a.doctor === doctor.name);
  }, [doctor]);

  const stats = useMemo(() => {
    const completed = doctorAppointments.filter((a) => a.status === "completed").length;
    const upcoming = doctorAppointments.filter((a) => a.status === "confirmed" || a.status === "pending").length;
    const cancelled = doctorAppointments.filter((a) => a.status === "cancelled").length;
    const completionRate = doctorAppointments.length > 0
      ? Math.round(((completed) / (completed + cancelled)) * 100) || 0
      : 0;
    return { completed, upcoming, cancelled, completionRate };
  }, [doctorAppointments]);

  // Weekly schedule mock
  const schedule = [
    { day: "Monday", hours: "8:00 AM - 5:00 PM", slots: 8 },
    { day: "Tuesday", hours: "8:00 AM - 5:00 PM", slots: 8 },
    { day: "Wednesday", hours: "9:00 AM - 3:00 PM", slots: 5 },
    { day: "Thursday", hours: "8:00 AM - 5:00 PM", slots: 8 },
    { day: "Friday", hours: "8:00 AM - 2:00 PM", slots: 5 },
    { day: "Saturday", hours: "Off", slots: 0 },
    { day: "Sunday", hours: "Off", slots: 0 },
  ];

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-muted-foreground">Doctor not found</p>
        <Button variant="outline" onClick={() => navigate("/admin/doctors")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/doctors")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Doctors
      </Button>

      {/* Profile header */}
      <AnimatedSection>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {doctor.name.split(" ").slice(1).map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">{doctor.name}</h1>
                  <Badge variant={getStatusVariant("availability", doctor.availability)}>
                    {doctor.availability}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{doctor.specialization}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {doctor.experience} years experience
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {doctor.rating} rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {doctor.patients} patients
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    DentaCare Clinic
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm mt-3">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {doctor.email}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {doctor.phone}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Statistics */}
      <AnimatedSection delay={0.1}>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Patients" value={doctor.patients} icon={Users} trend="+12 this month" />
          <StatsCard title="Completed" value={stats.completed} icon={Calendar} trend={`${stats.completionRate}% rate`} />
          <StatsCard title="Upcoming" value={stats.upcoming} icon={Clock} />
          <StatsCard title="Rating" value={doctor.rating} icon={TrendingUp} trend="Based on reviews" />
        </div>
      </AnimatedSection>

      {/* Tabs: Schedule & Appointments */}
      <AnimatedSection delay={0.2}>
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="appointments">Appointments ({doctorAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((s) => (
                    <div
                      key={s.day}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        s.slots === 0 ? "bg-muted/50 border-border/50" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${s.slots > 0 ? "bg-green-500" : "bg-gray-300"}`} />
                        <span className="font-medium text-sm text-foreground w-24">{s.day}</span>
                        <span className="text-sm text-muted-foreground">{s.hours}</span>
                      </div>
                      {s.slots > 0 && (
                        <span className="text-xs text-muted-foreground">{s.slots} slots</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent & Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {doctorAppointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No appointments found</p>
                ) : (
                  <div className="space-y-3">
                    {doctorAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{apt.patientName}</p>
                            <p className="text-xs text-muted-foreground">
                              {apt.date} at {apt.time} • {apt.service}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant("appointment", apt.status)} className="shrink-0 ml-2">
                          {apt.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AnimatedSection>
    </div>
  );
}
