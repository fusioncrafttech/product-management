import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Clock, DollarSign, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { services, serviceCategories } from "@/data/services";

export default function Services() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
              </motion.div>
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="svc-name">Service Name</Label>
              <Input id="svc-name" placeholder="Enter service name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="svc-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.filter(c => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="svc-price">Price ($)</Label>
                <Input id="svc-price" type="number" placeholder="0" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="svc-duration">Duration</Label>
              <Input id="svc-duration" placeholder="e.g., 30 min" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="svc-desc">Description</Label>
              <Textarea id="svc-desc" placeholder="Describe the service..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
