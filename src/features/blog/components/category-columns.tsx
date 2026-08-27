"use client";

import { TableColumn } from "@/components/table/global-table";
import { BlogCategory } from "../types/types";
import { ActionsButton } from "@/components/table/actions-button";
import { Folder, Image as ImageIcon } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";

export const getCategoryColumns = (
  onEdit: (cat: BlogCategory) => void,
  onDelete: (id: string) => void,
): TableColumn<BlogCategory>[] => [
  {
    id: "serialNumber",
    header: "S.No.",
    cell: (_cat, index) => <span className="font-medium">{index + 1}</span>,
  },
  {
    id: "icon",
    header: "Icon",
    cell: (cat) =>
      cat.iconUrl ? (
        <img
          src={cat.iconUrl}
          alt={`${cat.name} icon`}
          className="h-8 w-8 rounded-lg border border-border object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Folder className="h-4 w-4" />
        </div>
      ),
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: (cat) =>
      cat.imageUrl ? (
        <img
          src={cat.imageUrl}
          alt={`${cat.name} category`}
          className="h-10 w-14 rounded-md border border-border bg-muted object-cover"
        />
      ) : (
        <div className="flex h-10 w-14 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
          <ImageIcon className="h-4 w-4" />
        </div>
      ),
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: (cat) => (
      <span className="font-semibold text-foreground">{cat.name}</span>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: (cat) => (
      <span className="font-mono text-xs text-muted-foreground">
        /{cat.slug}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (cat) => (
      <span className="text-muted-foreground line-clamp-1">
        {cat.description || "—"}
      </span>
    ),
  },
  {
    accessorKey: "blogCount",
    header: "Articles",
    cell: (cat) => (
      <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
        {cat.blogCount || 0} blogs
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: (cat) => (
      <span className="text-muted-foreground">
        {cat.updatedAt || cat.createdAt || "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (cat) => <StatusBadge status={cat.status || "Active"} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: (cat) => (
      <span className="text-muted-foreground">{cat.createdAt || "—"}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (cat) => (
      <ActionsButton
        onEdit={() => onEdit(cat)}
        onDelete={() => onDelete(cat.id)}
      />
    ),
  },
];
