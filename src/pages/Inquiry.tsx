import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Eye, Reply, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { StatsCard } from "@/components/common/StatsCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { SortableHeader } from "@/components/common/SortableHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { FormField } from "@/components/common/FormField";
import { useTableState } from "@/hooks/useTableState";
import { useFormValidation } from "@/hooks/useFormValidation";
import { getStatusVariant } from "@/lib/variants";
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

export default function Inquiry() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const { errors, touched, validateAll, setFieldTouched, reset } = useFormValidation({
    reply: { required: true, minLength: 10 },
  });

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setReplyText("");
    reset();
  }, [reset]);

  const handleSendReply = () => {
    if (!validateAll({ reply: replyText })) return;
    toast.success("Reply sent successfully");
    handleCloseDetail();
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || inq.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    sortConfig,
    handleSort,
    resetPage,
    itemsPerPage,
    totalItems,
  } = useTableState({
    data: filteredInquiries as unknown as Record<string, unknown>[],
    itemsPerPage: 7,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    resetPage();
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    resetPage();
  };

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
      <AnimatedSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Search inquiries..."
            value={search}
            onChange={handleSearchChange}
            className="sm:w-72"
          />
          <FilterDropdown
            placeholder="Status"
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusChange}
          />
          <FilterDropdown
            placeholder="Priority"
            options={priorityOptions}
            value={priorityFilter}
            onChange={handlePriorityChange}
          />
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inquiries ({totalItems})</CardTitle>
          </CardHeader>
          <CardContent>
            {totalItems === 0 ? (
              <EmptyState
                title="No inquiries found"
                description="Try adjusting your search or filters to find what you're looking for."
              />
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <SortableHeader label="Patient" sortKey="patientName" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>
                          <SortableHeader label="Subject" sortKey="subject" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          <SortableHeader label="Date" sortKey="date" currentSort={sortConfig} onSort={handleSort} />
                        </TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(paginatedData as unknown as typeof inquiries).map((inquiry) => (
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
                            <Badge variant={getStatusVariant("priority", inquiry.priority)}>{inquiry.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant("inquiry", inquiry.status)}>{inquiry.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedInquiry(inquiry);
                                  setIsDetailOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Reply className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3">
                  {(paginatedData as unknown as typeof inquiries).map((inquiry) => (
                    <div key={inquiry.id} className="rounded-lg border border-border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant={getStatusVariant("priority", inquiry.priority)}>{inquiry.priority}</Badge>
                          <Badge variant={getStatusVariant("inquiry", inquiry.status)}>{inquiry.status}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{inquiry.date}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{inquiry.patientName}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{inquiry.subject}</p>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="mr-1 h-3.5 w-3.5" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Reply className="mr-1 h-3.5 w-3.5" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Inquiry Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={(open) => { if (!open) handleCloseDetail(); else setIsDetailOpen(true); }}>
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
                <Badge variant={getStatusVariant("priority", selectedInquiry.priority)}>
                  {selectedInquiry.priority} priority
                </Badge>
                <Badge variant={getStatusVariant("inquiry", selectedInquiry.status)}>
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
              <FormField label="Reply" required error={errors.reply} touched={touched.reply}>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onBlur={() => setFieldTouched("reply", replyText)}
                  className={touched.reply && errors.reply ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              </FormField>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDetail}>Close</Button>
            <Button onClick={handleSendReply} disabled={!replyText.trim()}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
