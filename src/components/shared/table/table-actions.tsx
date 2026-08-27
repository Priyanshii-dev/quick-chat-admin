"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TableActionsProps = {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
};

export function TableActions({
  onEdit,
  onView,
  onDelete,
  onShare,
}: TableActionsProps) {
  const hasMoreActions = onEdit || onView || onDelete || onShare;

  return (
    <div className="flex items-center gap-2">
      {hasMoreActions ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="More actions"
                className="grid size-8 cursor-pointer place-items-center rounded-md text-muted transition hover:bg-muted hover:text-foreground"
              />
            }
          >
            <MoreHorizontal size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {onEdit ? (
              <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                <Pencil size={15} /> Edit
              </DropdownMenuItem>
            ) : null}
            {onView ? (
              <DropdownMenuItem className="cursor-pointer" onClick={onView}>
                <Eye size={15} /> View
              </DropdownMenuItem>
            ) : null}
            {onShare ? (
              <DropdownMenuItem className="cursor-pointer" onClick={onShare}>
                <Share2 size={15} /> Share
              </DropdownMenuItem>
            ) : null}
            {onDelete ? (
              <DropdownMenuItem
                className="cursor-pointer"
                variant="destructive"
                onClick={onDelete}
              >
                <Trash2 size={15} /> Delete
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
}
