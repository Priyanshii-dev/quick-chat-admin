"use client";

import { Save, Trash2 } from "lucide-react";
import { AppButton } from "@/components/shared/app-button";

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
  if (mode === "view") return null;

  if (mode === "delete") {
    return (
      <AppButton
        variant="destructive"
        type="button"
        onClick={onDelete}
        className={className}
      >
        <Trash2 size={16} /> Delete
      </AppButton>
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
