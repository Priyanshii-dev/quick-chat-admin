"use client";

import { TableColumn } from "@/components/table/global-table";
import { BlogPost } from "../types/types";
import { ActionsButton } from "@/components/table/actions-button";
import { Eye, FileText } from "lucide-react";

export const getBlogColumns = (
  onEdit: (blog: BlogPost) => void,
  onDelete: (id: string) => void,
  onToggleStatus: (blog: BlogPost) => void,
): TableColumn<BlogPost>[] => [
  {
    id: "sno",
    header: "S.No",
    cell: (blog, index) => (
      <span className="font-semibold text-foreground">{index + 1}</span>
    ),
  },
  {
    accessorKey: "title",
    header: "Title & Details",
    cell: (blog) => (
      <div className="flex items-center gap-3 py-1 min-w-[240px]">
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="h-10 w-14 rounded-md object-cover border border-border bg-muted"
          />
        ) : (
          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted/60 text-muted-foreground border border-border">
            <FileText className="h-5 w-5" />
          </div>
        )}
        <div>
          <span className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors cursor-pointer">
            {blog.title}
          </span>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
            <span>/{blog.slug}</span>
            <span>•</span>
            <span>{blog.readTime || "4 min read"}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (blog) => (
      <span className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
        {blog.description || "—"}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (blog) => (
      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground border border-border">
        {blog.category || "General"}
      </span>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: (blog) => (
      <span className="font-medium text-foreground">
        {blog.author || "Admin"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (blog) => {
      const status = blog.status;
      let badgeStyle =
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      if (status === "Draft") {
        badgeStyle = "bg-amber-500/10 text-amber-500 border-amber-500/20";
      } else if (status === "Archived") {
        badgeStyle = "bg-muted text-muted-foreground border-border";
      }

      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${badgeStyle}`}
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "engagement",
    header: "Engagement",
    cell: (blog) => (
      <div className="flex items-center gap-1 text-muted-foreground font-medium">
        <Eye className="h-3.5 w-3.5" />
        <span>{(blog.engagement ?? 0).toLocaleString()}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (blog) => (
      <span className="text-muted-foreground">
        {blog.date || blog.updatedAt || "—"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (blog) => (
      <ActionsButton
        onEdit={() => onEdit(blog)}
        onDelete={() => onDelete(blog.id)}
        onToggleStatus={() => onToggleStatus(blog)}
        status={blog.status === "Published"}
      />
    ),
  },
];
