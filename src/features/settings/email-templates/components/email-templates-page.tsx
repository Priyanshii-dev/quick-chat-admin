"use client";

import {
  Code2,
  Download,
  Laptop,
  Mail,
  Plus,
  Send,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { ModuleHeader } from "@/components/shared/module-header";
import { CommonTableFilters } from "@/components/shared/table/common-table-filters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { GlobalTable } from "@/components/shared/table/global-table";
import { useEmailTemplates } from "../hook/email-templates.hook";
import type { EmailTemplate } from "../types/types";
import { getEmailTemplateColumns } from "./columns";
import { toast } from "sonner";

const staticEmailTemplates: EmailTemplate[] = [
  {
    id: "welcome-subscriber",
    name: "Welcome subscriber",
    from: "hello@northstar.example",
    subject: "Welcome to Northstar",
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
    status: "Active",
  },
];

export function EmailTemplatesPage() {
  const router = useRouter();
  const { data, isLoading } = useEmailTemplates();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [editedTemplates, setEditedTemplates] = useState<
    Record<string, EmailTemplate>
  >({});
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [content, setContent] = useState(
    "Write your email content...\nGhdgh fdjvj hnhgn",
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
        (status === "all" || template.status.toLowerCase() === status)
      );
    });
  }, [query, rows, status]);

  const columns = getEmailTemplateColumns({
    onView: (template) => {
      setSelectedTemplate(template);
      setContent("Write your email content...\nGhdgh fdjvj hnhgn");
      setDialogMode("view");
    },
    onEdit: (template) => {
      setSelectedTemplate(template);
      setContent("Write your email content...\nGhdgh fdjvj hnhgn");
      setDialogMode("edit");
    },
    onDelete: setDeleteTarget,
    onShare: async (template) => {
      const shareUrl = `${window.location.origin}/settings/email-templates/${template.id}`;
      if (navigator.share) {
        await navigator.share({ title: template.name, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Template link copied");
      }
    },
  });

  const saveTemplate = () => {
    if (!selectedTemplate) return;
    setEditedTemplates((current) => ({
      ...current,
      [selectedTemplate.id]: selectedTemplate,
    }));
    setDialogMode(null);
  };

  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar alwaysOpen />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <ModuleHeader
          eyebrow="Communication"
          title="Email templates"
          description="Create, preview-ready, and manage your email templates with the dashboard theme."
        >
          <button
            type="button"
            onClick={() => router.push("/settings/email-templates/create")}
            className="inline-flex items-center gap-2 rounded-[7px] bg-teal px-4 py-3 text-[13px] font-bold text-white hover:bg-[#05685f]"
          >
            <Plus size={16} /> New template
          </button>
        </ModuleHeader>
        <div className="mb-5 flex items-center gap-4 max-[800px]:flex-col max-[800px]:items-stretch">
          <CommonTableFilters
            search
            searchValue={query}
            onSearchChange={(value) => {
              setQuery(value);
              setPage(1);
            }}
            status
            statusValue={status}
            statusOptions={[
              { label: "Active", value: "active" },
              { label: "Draft", value: "draft" },
            ]}
            onStatusChange={(value) => {
              setStatus(value || "all");
              setPage(1);
            }}
            className="min-w-0 flex-1"
          />
          <button
            type="button"
            aria-label="Export templates"
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm"
          >
            <Download size={16} /> Export
          </button>
        </div>
        <GlobalTable
          data={filteredRows}
          columns={columns}
          totalCount={filteredRows.length}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          loading={isLoading}
        />
      </main>
      <Dialog
        open={dialogMode !== null}
        onOpenChange={(open) => !open && setDialogMode(null)}
      >
        <DialogContent className="max-w-[1048px] gap-0 overflow-hidden bg-[#f1f2f3] p-0">
          <DialogHeader className="border-b border-[#dfe2e5] px-5 py-5 pr-14">
            <div className="flex items-center justify-between gap-5 max-[680px]:items-start max-[680px]:flex-col">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-teal-soft text-teal">
                  <Mail size={19} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-lg">
                      {selectedTemplate?.name}
                    </DialogTitle>
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                      {selectedTemplate?.status}
                    </span>
                  </div>
                  <DialogDescription>
                    From:{" "}
                    <span className="font-medium text-foreground">
                      {selectedTemplate?.from}
                    </span>
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-[#dfe2e5] bg-white px-3 py-2 text-xs text-muted">
                <button
                  type="button"
                  aria-label="Desktop preview"
                  onClick={() => setPreviewMode("desktop")}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${previewMode === "desktop" ? "bg-muted text-foreground" : ""}`}
                >
                  <Laptop size={14} /> Desktop
                </button>
                <button
                  type="button"
                  aria-label="Mobile preview"
                  onClick={() => setPreviewMode("mobile")}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${previewMode === "mobile" ? "bg-muted text-foreground" : ""}`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
                <button
                  type="button"
                  aria-label="HTML preview"
                  onClick={() => setPreviewMode("html")}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${previewMode === "html" ? "bg-muted text-foreground" : ""}`}
                >
                  <Code2 size={14} /> HTML
                </button>
              </div>
            </div>
          </DialogHeader>
          {selectedTemplate ? (
            <div className="grid gap-0">
              <div className="border-b border-[#dfe2e5] px-5 py-5 text-sm">
                <span className="mr-5 text-muted">Subject:</span>
                <strong>{selectedTemplate.subject}</strong>
              </div>
              <div className="flex min-h-[390px] justify-center p-8 max-[680px]:p-4">
                {previewMode === "html" ? (
                  <pre className="h-[310px] w-full overflow-auto rounded-xl border border-[#dfe2e5] bg-[#1f2933] p-6 text-xs leading-5 text-[#d5e5e3] shadow-sm">
                    {content}
                  </pre>
                ) : (
                  <Textarea
                    value={content}
                    readOnly={dialogMode !== "edit"}
                    onChange={(event) => setContent(event.target.value)}
                    className={`h-[310px] resize-none rounded-xl border-[#dfe2e5] bg-white p-6 shadow-sm ${previewMode === "mobile" ? "w-[360px] max-w-full" : "w-full"}`}
                  />
                )}
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-[#dfe2e5] px-5 py-4 max-[680px]:flex-wrap">
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
                      className="bg-teal text-white hover:bg-[#05685f]"
                      onClick={() => setDialogMode("edit")}
                    >
                      Edit Template
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    className="bg-teal text-white hover:bg-[#05685f]"
                    onClick={saveTemplate}
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
