"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ActionOption {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void | Promise<void>;
  href?: string;
  variant?: "default" | "destructive" | "warning";
  condition?: boolean; // Condition-based visibility!
  requiresConfirmation?: boolean;
  confirmTitle?: string;
  confirmMessage?: string;
}

export interface ActionsButtonProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void | Promise<void>;
  onToggleStatus?: () => void | Promise<void>;
  status?: string | boolean;
  customActions?: ActionOption[];
  disabled?: boolean;
}

export function ActionsButton({
  onEdit,
  onView,
  onDelete,
  onToggleStatus,
  status,
  customActions = [],
  disabled = false,
}: ActionsButtonProps) {
  const [open, setOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (
    actionFn?: () => void | Promise<void>,
    actionName: string = "action"
  ) => {
    if (!actionFn) return;
    try {
      setLoadingAction(actionName);
      await actionFn();
    } finally {
      setLoadingAction(null);
      setOpen(false);
    }
  };

  const activeStatus =
    typeof status === "boolean" ? status : status === "active" || status === "published";

  return (
    <div className="relative inline-block text-left">
      <Button
        variant="ghost"
        size="icon"
        disabled={disabled || Boolean(loadingAction)}
        onClick={() => setOpen((prev) => !prev)}
        className="h-8 w-8 rounded-md p-0 hover:bg-accent text-foreground"
      >
        {loadingAction ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <MoreHorizontal className="h-4 w-4" />
        )}
        <span className="sr-only">Open menu</span>
      </Button>

      {open && (
        <>
          {/* Backdrop overlay to close menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 z-50 mt-1 w-44 origin-top-right rounded-lg border border-border bg-card p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
            {onView && (
              <button
                type="button"
                onClick={() => handleAction(onView, "view")}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                View Details
              </button>
            )}

            {onEdit && (
              <button
                type="button"
                onClick={() => handleAction(onEdit, "edit")}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                <Edit className="h-3.5 w-3.5 text-primary" />
                Edit Item
              </button>
            )}

            {onToggleStatus && (
              <button
                type="button"
                onClick={() => handleAction(onToggleStatus, "toggle")}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                {activeStatus ? (
                  <>
                    <XCircle className="h-3.5 w-3.5 text-amber-500" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    Activate
                  </>
                )}
              </button>
            )}

            {/* Render condition-based custom actions */}
            {customActions
              .filter((action) => action.condition === undefined || action.condition === true)
              .map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAction(action.onClick, action.label)}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    action.variant === "destructive"
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}

            {onDelete && (
              <>
                <div className="my-1 border-t border-border" />
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this item?")) {
                      handleAction(onDelete, "delete");
                    } else {
                      setOpen(false);
                    }
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete Item
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
