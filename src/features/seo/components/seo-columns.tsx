"use client";

import { TableColumn } from "@/components/table/global-table";
import { SeoMeta } from "../types/seo.types";
import { ActionsButton } from "@/components/table/actions-button";
import { Globe } from "lucide-react";

export const getSeoColumns = (
  onEdit: (seo: SeoMeta) => void,
  onDelete: (id: string) => void
): TableColumn<SeoMeta>[] => [
  {
    accessorKey: "pageUrl",
    header: "Page URL Path",
    cell: (seo) => (
      <div className="flex items-center gap-2 py-1 font-mono text-xs font-semibold text-primary">
        <Globe className="h-3.5 w-3.5" />
        <span>{seo.pageUrl}</span>
      </div>
    ),
  },
  {
    accessorKey: "metaTitle",
    header: "Meta Title",
    cell: (seo) => (
      <div className="max-w-xs">
        <span className="font-semibold text-foreground line-clamp-1">
          {seo.metaTitle}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "metaDescription",
    header: "Meta Description",
    cell: (seo) => (
      <span className="text-muted-foreground line-clamp-1 max-w-sm">
        {seo.metaDescription}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (seo) => {
      const status = seo.status;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
            status === "Active"
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
          }`}
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: (seo) => (
      <span className="text-muted-foreground">{seo.updatedAt}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (seo) => (
      <ActionsButton
        onEdit={() => onEdit(seo)}
        onDelete={() => onDelete(seo.id)}
      />
    ),
  },
];
