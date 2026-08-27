"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Plus, Laptop, Smartphone, Code2, Send } from "lucide-react";
import { GlobalTable, TableColumn } from "@/components/table/global-table";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEmailTemplates } from "../hook/email-templates.hook";
import type { EmailTemplate } from "../types/types";
import { getEmailTemplateColumns } from "./columns";
import { toast } from "sonner";

const staticEmailTemplates: EmailTemplate[] = [
  {
    id: "welcome-subscriber",
    name: "Welcome subscriber",
    from: "hello@quietchat.in",
    subject: "Welcome to QuietChat Admin",
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
    status: "Active",
  },
];

export function EmailTemplatesPage() {
  const router = useRouter();
  const { data, isLoading } = useEmailTemplates();
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [editedTemplates, setEditedTemplates] = useState<
    Record<string, EmailTemplate>
  >({});
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [content, setContent] = useState(
    "Write your email template content here...",
  );
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile" | "html">(
    "desktop",
  );
  const [dialogMode, setDialogMode] = useState<"view" | "edit" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EmailTemplate | null>(null);

  const baseRows = data?.items?.length ? data.items : staticEmailTemplates;
  const rows = baseRows
    .filter((template) => !deletedIds.includes(template.id))
    .map((template) => editedTemplates[template.id] ?? template);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return rows.filter((template) => {
      const matchesQuery = [template.name, template.from, template.subject]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return (
        matchesQuery &&
        (!selectedStatus || template.status.toLowerCase() === selectedStatus.toLowerCase())
      );
    });
  }, [query, rows, selectedStatus]);

  const columns: TableColumn<EmailTemplate>[] = [
    {
      id: "name",
      header: "Template Name",
      cell: (row) => <span className="font-extrabold text-foreground">{row.name}</span>,
    },
    {
      id: "from",
      header: "From Email",
      cell: (row) => <span className="font-mono text-muted-foreground">{row.from}</span>,
    },
    {
      id: "subject",
      header: "Subject Line",
      cell: (row) => <span className="font-medium text-foreground">{row.subject}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            row.status === "Active"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <div className="w-full">
      <GlobalTable
        icon={<Mail className="h-5 w-5" />}
        title="Email Templates"
        description="Create, preview, and manage your automated notification email templates."
        breadcrumbs={[
          { label: "Settings", href: "/settings" },
          { label: "Email Templates" },
        ]}
        showSearch={true}
        searchQuery={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search template name, sender, or subject..."
        showStatusFilter={true}
        statusValue={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusOptions={statusOptions}
        primaryAction={{
          label: "New Template",
          href: "/settings/email-templates/create",
          icon: <Plus className="h-4 w-4" />,
        }}
        columns={columns}
        data={filteredRows}
        loading={isLoading}
        emptyMessage="No email templates found."
      />

      <Dialog
        open={dialogMode !== null}
        onOpenChange={(open) => !open && setDialogMode(null)}
      >
        <DialogContent className="max-w-[1048px] gap-0 overflow-hidden bg-card text-foreground p-0">
          <DialogHeader className="border-b border-border px-5 py-5 pr-14">
            <div className="flex items-center justify-between gap-5 max-[680px]:items-start max-[680px]:flex-col">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail size={19} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-lg font-bold">
                      {selectedTemplate?.name}
                    </DialogTitle>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                      {selectedTemplate?.status}
                    </span>
                  </div>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    From:{" "}
                    <span className="font-medium text-foreground">
                      {selectedTemplate?.from}
                    </span>
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                <button
                  type="button"
                  aria-label="Desktop preview"
                  onClick={() => setPreviewMode("desktop")}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${
                    previewMode === "desktop" ? "bg-card text-foreground font-bold" : ""
                  }`}
                >
                  <Laptop size={14} /> Desktop
                </button>
                <button
                  type="button"
                  aria-label="Mobile preview"
                  onClick={() => setPreviewMode("mobile")}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${
                    previewMode === "mobile" ? "bg-card text-foreground font-bold" : ""
                  }`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
                <button
                  type="button"
                  aria-label="HTML preview"
                  onClick={() => setPreviewMode("html")}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${
                    previewMode === "html" ? "bg-card text-foreground font-bold" : ""
                  }`}
                >
                  <Code2 size={14} /> HTML
                </button>
              </div>
            </div>
          </DialogHeader>
          {selectedTemplate ? (
            <div className="grid gap-0">
              <div className="border-b border-border px-5 py-4 text-xs">
                <span className="mr-3 text-muted-foreground">Subject:</span>
                <strong className="text-foreground">{selectedTemplate.subject}</strong>
              </div>
              <div className="flex min-h-[360px] justify-center p-6 max-[680px]:p-4 bg-muted/20">
                {previewMode === "html" ? (
                  <pre className="h-[300px] w-full overflow-auto rounded-xl border border-border bg-background p-5 text-xs font-mono text-foreground shadow-sm">
                    {content}
                  </pre>
                ) : (
                  <Textarea
                    value={content}
                    readOnly={dialogMode !== "edit"}
                    onChange={(event) => setContent(event.target.value)}
                    className={`h-[300px] resize-none rounded-xl border-border bg-background p-5 text-xs shadow-sm ${
                      previewMode === "mobile" ? "w-[360px] max-w-full" : "w-full"
                    }`}
                  />
                )}
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogMode(null)}
                >
                  Close
                </Button>
                {dialogMode === "view" ? (
                  <>
                    <Button type="button" variant="outline" className="gap-2">
                      <Send size={15} /> Test Email
                    </Button>
                    <Button
                      type="button"
                      className="bg-primary text-primary-foreground font-bold hover:opacity-90"
                      onClick={() => setDialogMode("edit")}
                    >
                      Edit Template
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    className="bg-primary text-primary-foreground font-bold hover:opacity-90"
                    onClick={() => setDialogMode(null)}
                  >
                    Save changes
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete email template"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"?`
            : undefined
        }
        onConfirm={() => {
          if (deleteTarget)
            setDeletedIds((current) => [...current, deleteTarget.id]);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
