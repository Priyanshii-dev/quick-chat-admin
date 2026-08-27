"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppButton } from "@/components/shared/app-button";

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-8 bg-white p-8">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="max-w-xl text-base leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <AppButton
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="min-w-28"
          >
            Cancel
          </AppButton>
          <AppButton
            type="button"
            variant="destructive"
            onClick={onConfirm}
            className="min-w-28"
          >
            Delete
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
