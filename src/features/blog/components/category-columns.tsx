import { StatusBadge } from "@/components/shared/status-badge";
import { TableActions } from "@/components/shared/table/table-actions";
import type { TableColumn } from "@/components/shared/table/types/types";

export type BlogCategory = {
  name: string;
  slug: string;
  updatedAt: string;
  status: "Active" | "Inactive";
};

type CategoryColumnActions = {
  onEdit: (category: BlogCategory) => void;
  onDelete: (category: BlogCategory) => void;
};

export function getCategoryColumns({
  onEdit,
  onDelete,
}: CategoryColumnActions): TableColumn<BlogCategory>[] {
  return [
    { id: "number", header: "S.No", cell: (_category, index) => index + 1 },
    {
      id: "name",
      header: "Name",
      cell: (category) => (
        <strong className="text-sm text-ink">{category.name}</strong>
      ),
    },
    {
      id: "slug",
      header: "Slug",
      cell: (category) => (
        <span className="text-muted-foreground">{category.slug}</span>
      ),
    },
    { id: "updatedAt", header: "Last updated", accessorKey: "updatedAt" },
    {
      id: "status",
      header: "Status",
      cell: (category) => <StatusBadge status={category.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: (category) => (
        <TableActions
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category)}
        />
      ),
    },
  ];
}
