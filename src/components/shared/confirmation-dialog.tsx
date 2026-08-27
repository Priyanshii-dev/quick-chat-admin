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
  title = "Delete SEO Configuration",
  description = "Are you sure you want to delete this SEO configuration?",
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <AppButton
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </AppButton>
          <AppButton type="button" variant="destructive" onClick={onConfirm}>
            Delete
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
