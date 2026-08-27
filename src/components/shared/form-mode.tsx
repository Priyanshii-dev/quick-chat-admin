"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { AppButton } from "@/components/shared/app-button";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";

export type FormMode = "edit" | "view" | "delete";

type FormModeActionsProps = {
  mode: FormMode;
  onDelete?: () => void;
  saveLabel?: string;
  formId?: string;
  className?: string;
  onSave?: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
};

export function FormModeActions({
  mode,
  onDelete,
  saveLabel = "Save Changes",
  formId,
  className,
  onSave,
  isSubmitting = false,
  isDisabled = false,
}: FormModeActionsProps) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  if (mode === "view") return null;

  if (mode === "delete") {
    return (
      <>
        <AppButton
          variant="destructive"
          type="button"
          onClick={() => setDeleteConfirmationOpen(true)}
          className={className}
        >
          <Trash2 size={16} /> Delete
        </AppButton>
        <ConfirmationDialog
          open={deleteConfirmationOpen}
          onOpenChange={setDeleteConfirmationOpen}
          onConfirm={() => {
            setDeleteConfirmationOpen(false);
            onDelete?.();
          }}
        />
      </>
    );
  }

  return (
    <AppButton
      variant="primary"
      type={onSave ? "button" : "submit"}
      form={formId}
      onClick={onSave}
      disabled={isSubmitting || isDisabled}
      className={className}
    >
      <Save size={16} /> {isSubmitting ? "Saving..." : saveLabel}
    </AppButton>
  );
}
