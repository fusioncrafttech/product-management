import { useState } from "react";
import { Search, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useBilling } from "@/context/BillingContext";
import { formatCurrency, getTreatmentStatusColor, formatTreatmentCategory } from "@/data/billing";
import type { TreatmentCategory, TreatmentStatus } from "@/data/billing";

export default function AdminTreatmentRecords() {
  const { treatments, attachments } = useBilling();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<TreatmentCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TreatmentStatus | "all">("all");
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);

  const filtered = treatments.filter((t) => {
    const matchesSearch =
      t.patientName.toLowerCase().includes(search.toLowerCase()) ||
      t.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      t.treatmentName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.treatmentCategory === categoryFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const selected = selectedTreatment ? treatments.find((t) => t.id === selectedTreatment) : null;
  const selectedAttachments = selectedTreatment ? attachments.filter((a) => a.treatmentId === selectedTreatment) : [];

  const categories: TreatmentCategory[] = ["consultation", "scaling", "filling", "root_canal", "crown", "implant", "extraction", "orthodontics", "surgery"];

  return (
    <div className="space-y-6">
      <PageHeader title="Treatment Records" description="View all treatment records across patients" />

      {!selectedTreatment ? (
        <AnimatedSection>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>All Treatments ({filtered.length})</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search treatments..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as TreatmentCategory | "all")}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{formatTreatmentCategory(c)}</option>
                    ))}
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as TreatmentStatus | "all")}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Tooth</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-mono text-sm">{t.id}</TableCell>
                        <TableCell className="font-medium">{t.patientName}</TableCell>
                        <TableCell>{t.doctorName}</TableCell>
                        <TableCell>{t.treatmentName}</TableCell>
                        <TableCell><Badge variant="outline">{formatTreatmentCategory(t.treatmentCategory)}</Badge></TableCell>
                        <TableCell>{t.toothNumber}</TableCell>
                        <TableCell>{t.visitDate}</TableCell>
                        <TableCell><Badge className={getTreatmentStatusColor(t.status)}>{t.status.replace("_", " ")}</Badge></TableCell>
                        <TableCell>{formatCurrency(t.cost)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTreatment(t.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      ) : (
        <AnimatedSection>
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedTreatment(null)}>
              ← Back to All Treatments
            </Button>

            {selected && (
              <>
                <Card>
                  <CardHeader><CardTitle>Treatment Details - {selected.treatmentName}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div><span className="text-sm text-muted-foreground">Treatment ID</span><p className="font-medium">{selected.id}</p></div>
                      <div><span className="text-sm text-muted-foreground">Patient</span><p className="font-medium">{selected.patientName}</p></div>
                      <div><span className="text-sm text-muted-foreground">Doctor</span><p className="font-medium">{selected.doctorName}</p></div>
                      <div><span className="text-sm text-muted-foreground">Visit Date</span><p className="font-medium">{selected.visitDate}</p></div>
                      <div><span className="text-sm text-muted-foreground">Tooth Number</span><p className="font-medium">{selected.toothNumber}</p></div>
                      <div><span className="text-sm text-muted-foreground">Category</span><p className="font-medium">{formatTreatmentCategory(selected.treatmentCategory)}</p></div>
                      <div><span className="text-sm text-muted-foreground">Status</span><Badge className={getTreatmentStatusColor(selected.status)}>{selected.status.replace("_", " ")}</Badge></div>
                      <div><span className="text-sm text-muted-foreground">Cost</span><p className="font-medium text-lg">{formatCurrency(selected.cost)}</p></div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm text-muted-foreground">Description</span>
                      <p className="font-medium">{selected.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Attachments ({selectedAttachments.length})</CardTitle></CardHeader>
                  <CardContent>
                    {selectedAttachments.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No attachments uploaded</p>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {selectedAttachments.map((att) => (
                          <div key={att.id} className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{att.fileName}</p>
                              <p className="text-xs text-muted-foreground">{att.type.toUpperCase()} • {att.size}</p>
                            </div>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
