import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Eye, Reply, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { StatsCard } from "@/components/common/StatsCard";
import { inquiries, type Inquiry } from "@/data/inquiries";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "New", value: "new" },
  { label: "Replied", value: "replied" },
  { label: "Closed", value: "closed" },
];

const priorityOptions = [
  { label: "All Priority", value: "all" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "new": return "confirmed" as const;
    case "replied": return "completed" as const;
    case "closed": return "secondary" as const;
    default: return "secondary" as const;
  }
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "high": return "cancelled" as const;
    case "medium": return "warning" as const;
    case "low": return "secondary" as const;
    default: return "secondary" as const;
  }
}

export default function Inquiry() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || inq.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const highPriorityCount = inquiries.filter((i) => i.priority === "high").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Inquiries" description="Manage patient inquiries and messages" />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Total Inquiries" value={inquiries.length} icon={MessageSquare} />
        <StatsCard title="New Inquiries" value={newCount} icon={Clock} iconColor="text-blue-500" />
        <StatsCard title="High Priority" value={highPriorityCount} icon={AlertTriangle} iconColor="text-destructive" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search inquiries..."
          value={search}
          onChange={setSearch}
          className="sm:w-72"
        />
        <FilterDropdown
          placeholder="Status"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <FilterDropdown
          placeholder="Priority"
          options={priorityOptions}
          value={priorityFilter}
          onChange={setPriorityFilter}
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inquiries ({filteredInquiries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inquiry.patientName}</p>
                        <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{inquiry.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">{inquiry.date}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityVariant(inquiry.priority)}>{inquiry.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(inquiry.status)}>{inquiry.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Inquiry Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedInquiry?.patientName} • {selectedInquiry?.date}
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4 py-4">
              <div className="flex gap-2">
                <Badge variant={getPriorityVariant(selectedInquiry.priority)}>
                  {selectedInquiry.priority} priority
                </Badge>
                <Badge variant={getStatusVariant(selectedInquiry.status)}>
                  {selectedInquiry.status}
                </Badge>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">{selectedInquiry.message}</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Email: {selectedInquiry.email}</p>
                <p>Phone: {selectedInquiry.phone}</p>
              </div>
              <div className="grid gap-2">
                <Label>Reply</Label>
                <Textarea placeholder="Type your reply here..." />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
            <Button onClick={() => setIsDetailOpen(false)}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
