import { StatusBadge } from "@/components/shared/status-badge";
import { TableActions } from "@/components/shared/table/table-actions";
import type { TableColumn } from "@/components/shared/table/types/types";
import type { EmailTemplate } from "../types/types";

type EmailTemplateColumnActions = {
  onView: (template: EmailTemplate) => void;
  onEdit: (template: EmailTemplate) => void;
  onDelete: (template: EmailTemplate) => void;
  onShare: (template: EmailTemplate) => void;
};

export function getEmailTemplateColumns({
  onView,
  onEdit,
  onDelete,
  onShare,
}: EmailTemplateColumnActions): TableColumn<EmailTemplate>[] {
  return [
    {
      id: "srNo",
      header: "Sr No",
      cell: (_template, index) => index + 1,
    },
    {
      id: "name",
      header: "Template Name",
      cell: (template) => (
        <span className="flex items-center gap-3 whitespace-nowrap text-foreground">
          {template.name}
        </span>
      ),
    },
    {
      id: "from",
      header: "From",
      cell: (template) => (
        <span className="whitespace-nowrap">{template.from}</span>
      ),
    },
    {
      id: "subject",
      header: "Subject",
      cell: (template) => (
        <span className="whitespace-nowrap">{template.subject}</span>
      ),
    },
    {
      id: "createdAt",
      header: "Created Date",
      cell: (template) => (
        <span className="whitespace-nowrap text-muted">
          {template.createdAt}
        </span>
      ),
    },
    {
      id: "updatedAt",
      header: "Updated Date",
      cell: (template) => (
        <span className="whitespace-nowrap text-muted">
          {template.updatedAt}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (template) => <StatusBadge status={template.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: (template) => (
        <TableActions
          onEdit={() => onEdit(template)}
          onView={() => onView(template)}
          onDelete={() => onDelete(template)}
          onShare={() => onShare(template)}
        />
      ),
    },
  ];
}
