"use client";

import { TableColumn } from "@/components/table/global-table";
import { SeoMeta } from "../types/seo.types";
import { ActionsButton } from "@/components/table/actions-button";
import { ExternalLink } from "lucide-react";

export const getSeoColumns = (
  onEdit: (seo: SeoMeta) => void,
  onDelete: (id: string) => void,
): TableColumn<SeoMeta>[] => [
  {
    id: "srNo",
    header: "Sr No",
    cell: (_seo, index) => <span className="font-medium">{index + 1}</span>,
  },
  {
    accessorKey: "pageName",
    header: "Page Name",
    sortable: true,
    cell: (seo) => <span className="font-medium">{seo.pageName}</span>,
  },
  {
    accessorKey: "metaTitle",
    header: "Title",
    sortable: true,
    cell: (seo) => <span>{seo.metaTitle}</span>,
  },
  {
    id: "url",
    header: "URL",
    sortable: true,
    cell: (seo) => {
      const seoUrl = seo.pageUrl;
      const canonicalUrl = seo.canonicalUrl || seo.pageUrl;

      return (
        <div className="space-y-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              SEO URL
            </p>
            <a
              href={seoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary"
            >
              {seoUrl}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              CANONICAL URL
            </p>
            <a
              href={canonicalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary"
            >
              {canonicalUrl}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      );
    },
  },
  {
    id: "slug",
    header: "slug",
    sortable: true,
    cell: (seo) => (
      <span>{seo.pageUrl.split("/").filter(Boolean).pop() || "/"}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (seo) => (
      <ActionsButton onEdit={() => onEdit(seo)} onDelete={() => onDelete(seo.id)} />
    ),
  },
];
