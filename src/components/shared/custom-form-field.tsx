import type { ReactNode } from "react";
import { RequiredAsterisk } from "./required-assert-risk";

type FormFieldProps = {
  label: string;
  id?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export function CustomFormField({
  label,
  id,
  required,
  error,
  children,
}: FormFieldProps) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="grid self-start gap-1.5">
      <label htmlFor={id} className="text-xs font-bold text-foreground">
        {label}
        {required ? <RequiredAsterisk /> : null}
      </label>
      {children}
      {error ? (
        <small
          id={errorId}
          role="alert"
          className="text-xs font-semibold text-destructive mt-0.5"
        >
          {error}
        </small>
      ) : null}
    </div>
  );
}
