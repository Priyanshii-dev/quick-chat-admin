import { Eye } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { TableActions } from "@/components/shared/table/table-actions";
import { formatDate } from "@/lib/common-function";
import type { TableColumn } from "@/components/shared/table/types/types";
import type { BlogPost } from "../types/types";

type BlogColumnActions = {
  onView: (post: BlogPost) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
};

export function getBlogColumns({
  onView,
  onEdit,
  onDelete,
}: BlogColumnActions): TableColumn<BlogPost>[] {
  return [
    { id: "number", header: "S.No", cell: (_post, index) => index + 1 },
    {
      id: "title",
      header: "Title",
      cell: (post) => (
        <div className="min-w-[190px]">
          <strong className="block truncate text-sm text-ink">
            {post.title}
          </strong>
          <span className="text-xs text-muted-foreground">{post.slug}</span>
        </div>
      ),
    },
    {
      id: "description",
      header: "Description",
      cell: (post) => (
        <span className="inline-block max-w-[210px] truncate text-xs text-muted-foreground">
          {post.description ?? "N/A"}
        </span>
      ),
    },
    { id: "author", header: "Author", cell: (post) => post.author ?? "N/A" },
    {
      id: "category",
      header: "Category",
      cell: (post) => post.category ?? "Uncategorized",
    },
    {
      id: "engagement",
      header: "Engagement",
      cell: (post) => (
        <span className="text-xs text-muted-foreground">
          <Eye size={13} className="mr-1 inline" />
          {post.views}
        </span>
      ),
    },
    {
      id: "updated",
      header: "Updated",
      cell: (post) => formatDate(post.updatedAt),
    },
    {
      id: "status",
      header: "Status",
      cell: (post) => <StatusBadge status={post.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: (post) => (
        <TableActions
          onView={() => onView(post)}
          onEdit={() => onEdit(post)}
          onDelete={() => onDelete(post)}
        />
      ),
    },
  ];
}
