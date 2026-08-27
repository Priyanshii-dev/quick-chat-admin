"use client";

import { TableColumn } from "@/components/table/global-table";
import { BlogCategory } from "../types/types";
import { ActionsButton } from "@/components/table/actions-button";
import { Folder } from "lucide-react";

export const getCategoryColumns = (
  onEdit: (cat: BlogCategory) => void,
  onDelete: (id: string) => void
): TableColumn<BlogCategory>[] => [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: (cat) => (
      <div className="flex items-center gap-2.5 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Folder className="h-4 w-4" />
        </div>
        <div>
          <span className="font-semibold text-foreground">{cat.name}</span>
          <div className="text-[11px] text-muted-foreground">/{cat.slug}</div>
        </div>
      </div>
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
