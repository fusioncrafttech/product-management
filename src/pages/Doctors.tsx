import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Star, Phone, Mail, Edit, Grid3X3, List, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FormField } from "@/components/common/FormField";
import { useFormValidation } from "@/hooks/useFormValidation";
import { getStatusVariant } from "@/lib/variants";
import { doctors } from "@/data/doctors";

export default function Doctors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    email: "",
    phone: "",
  });

  const { errors, touched, validateAll, setFieldTouched, reset } = useFormValidation({
    name: { required: true, minLength: 2 },
    specialization: { required: true },
    experience: { required: true, pattern: { value: /^\d+$/, message: "Must be a number" } },
    email: { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } },
    phone: { required: true, pattern: { value: /^[+]?[\d\s()-]{7,}$/, message: "Enter a valid phone number" } },
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ name: "", specialization: "", experience: "", email: "", phone: "" });
    reset();
  }, [reset]);

  const handleSave = () => {
    if (!validateAll(formData)) return;
    toast.success("Doctor profile saved successfully");
    handleCloseModal();
  };

  const isFormEmpty = !formData.name && !formData.email && !formData.specialization;

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Doctors" description="Manage clinic doctors and their schedules">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </PageHeader>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search doctors..."
          value={search}
          onChange={setSearch}
          className="sm:w-72"
        />
      </div>

      {/* Views */}
      <Tabs defaultValue="cards">
        <TabsList>
          <TabsTrigger value="cards">
            <Grid3X3 className="mr-2 h-4 w-4" />
            Cards
          </TabsTrigger>
          <TabsTrigger value="table">
            <List className="mr-2 h-4 w-4" />
            Table
          </TabsTrigger>
        </TabsList>

        {/* Card View */}
        <TabsContent value="cards">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor, index) => (
              <AnimatedSection
                key={doctor.id}
                delay={index * 0.05}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {doctor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant("availability", doctor.availability)}>
                        {doctor.availability}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{doctor.rating} rating</span>
                        <span className="mx-1">•</span>
                        <span>{doctor.experience} years exp.</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-sm text-muted-foreground">
                        {doctor.patients} patients
                      </span>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/admin/doctors/${doctor.id}`)}>
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">All Doctors ({filteredDoctors.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead className="hidden md:table-cell">Experience</TableHead>
                    <TableHead className="hidden lg:table-cell">Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Patients</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {doctor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{doctor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell className="hidden md:table-cell">{doctor.experience} years</TableCell>
                      <TableCell className="hidden lg:table-cell">{doctor.phone}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant("availability", doctor.availability)}>
                          {doctor.availability}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{doctor.patients}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/doctors/${doctor.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Doctor Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) handleCloseModal(); else setIsModalOpen(true); }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField label="Full Name" htmlFor="doc-name" required error={errors.name} touched={touched.name}>
              <Input
                id="doc-name"
                placeholder="Dr. Full Name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => setFieldTouched("name", formData.name)}
                className={touched.name && errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Specialization" htmlFor="doc-spec" required error={errors.specialization} touched={touched.specialization}>
                <Select value={formData.specialization} onValueChange={(val) => { updateField("specialization", val); setFieldTouched("specialization", val); }}>
                  <SelectTrigger className={touched.specialization && errors.specialization ? "border-destructive focus-visible:ring-destructive" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Dentist</SelectItem>
                    <SelectItem value="endo">Endodontist</SelectItem>
                    <SelectItem value="ortho">Orthodontist</SelectItem>
                    <SelectItem value="surgeon">Oral Surgeon</SelectItem>
                    <SelectItem value="perio">Periodontist</SelectItem>
                    <SelectItem value="pedo">Pediatric Dentist</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Experience (years)" htmlFor="doc-exp" required error={errors.experience} touched={touched.experience}>
                <Input
                  id="doc-exp"
                  type="number"
                  placeholder="0"
                  value={formData.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  onBlur={() => setFieldTouched("experience", formData.experience)}
                  className={touched.experience && errors.experience ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Email" htmlFor="doc-email" required error={errors.email} touched={touched.email}>
                <Input
                  id="doc-email"
                  type="email"
                  placeholder="doctor@clinic.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => setFieldTouched("email", formData.email)}
                  className={touched.email && errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
              <FormField label="Phone" htmlFor="doc-phone" required error={errors.phone} touched={touched.phone}>
                <Input
                  id="doc-phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => setFieldTouched("phone", formData.phone)}
                  className={touched.phone && errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave} disabled={isFormEmpty}>Add Doctor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
