import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Star, Phone, Mail, Edit, Grid3X3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { doctors } from "@/data/doctors";

function getAvailabilityVariant(status: string) {
  switch (status) {
    case "available": return "completed" as const;
    case "busy": return "warning" as const;
    case "off-duty": return "secondary" as const;
    default: return "secondary" as const;
  }
}

export default function Doctors() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                      <Badge variant={getAvailabilityVariant(doctor.availability)}>
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
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
                        <Badge variant={getAvailabilityVariant(doctor.availability)}>
                          {doctor.availability}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{doctor.patients}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="doc-name">Full Name</Label>
              <Input id="doc-name" placeholder="Dr. Full Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="doc-spec">Specialization</Label>
                <Select>
                  <SelectTrigger>
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="doc-exp">Experience (years)</Label>
                <Input id="doc-exp" type="number" placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="doc-email">Email</Label>
                <Input id="doc-email" type="email" placeholder="doctor@clinic.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="doc-phone">Phone</Label>
                <Input id="doc-phone" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Add Doctor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
