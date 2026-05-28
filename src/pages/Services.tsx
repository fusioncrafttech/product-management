import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Edit, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FormField } from "@/components/common/FormField";
import { useFormValidation } from "@/hooks/useFormValidation";
import { services, serviceCategories } from "@/data/services";

export default function Services() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
  });

  const { errors, touched, validateAll, setFieldTouched, reset } = useFormValidation({
    name: { required: true, minLength: 2 },
    category: { required: true },
    price: { required: true, pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Enter a valid price" } },
    duration: { required: true },
    description: {},
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ name: "", category: "", price: "", duration: "", description: "" });
    reset();
  }, [reset]);

  const handleSave = () => {
    if (!validateAll(formData)) return;
    toast.success("Service saved successfully");
    handleCloseModal();
  };

  const isFormEmpty = !formData.name && !formData.category && !formData.price;

  const categoryOptions = serviceCategories.map((cat) => ({ label: cat, value: cat }));

  const filteredServices = services.filter((svc) => {
    const matchesSearch =
      svc.name.toLowerCase().includes(search.toLowerCase()) ||
      svc.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || svc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Services" description="Manage dental services and pricing">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search services..."
          value={search}
          onChange={setSearch}
          className="sm:w-72"
        />
        <FilterDropdown
          placeholder="Category"
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      {/* Views */}
      <Tabs defaultValue="cards">
        <TabsList>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="table">Price List</TabsTrigger>
        </TabsList>

        {/* Card View */}
        <TabsContent value="cards">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <AnimatedSection
                key={service.id}
                delay={index * 0.05}
              >
                <Card className="hover:shadow-md transition-shadow duration-200 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{service.category}</Badge>
                      {!service.isActive && (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex-1">{service.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold text-foreground">${service.price}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
              <CardTitle className="text-base">Service Price List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden sm:table-cell">Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{service.category}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">${service.price}</TableCell>
                      <TableCell className="hidden sm:table-cell">{service.duration}</TableCell>
                      <TableCell>
                        <Badge variant={service.isActive ? "completed" : "cancelled"}>
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
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

      {/* Add Service Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) handleCloseModal(); else setIsModalOpen(true); }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField label="Service Name" htmlFor="svc-name" required error={errors.name} touched={touched.name}>
              <Input
                id="svc-name"
                placeholder="Enter service name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => setFieldTouched("name", formData.name)}
                className={touched.name && errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category" htmlFor="svc-category" required error={errors.category} touched={touched.category}>
                <Select value={formData.category} onValueChange={(val) => { updateField("category", val); setFieldTouched("category", val); }}>
                  <SelectTrigger className={touched.category && errors.category ? "border-destructive focus-visible:ring-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.filter(c => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Price ($)" htmlFor="svc-price" required error={errors.price} touched={touched.price}>
                <Input
                  id="svc-price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  onBlur={() => setFieldTouched("price", formData.price)}
                  className={touched.price && errors.price ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
            <FormField label="Duration" htmlFor="svc-duration" required error={errors.duration} touched={touched.duration}>
              <Input
                id="svc-duration"
                placeholder="e.g., 30 min"
                value={formData.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                onBlur={() => setFieldTouched("duration", formData.duration)}
                className={touched.duration && errors.duration ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </FormField>
            <FormField label="Description" htmlFor="svc-desc" error={errors.description} touched={touched.description}>
              <Textarea
                id="svc-desc"
                placeholder="Describe the service..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </FormField>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave} disabled={isFormEmpty}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
