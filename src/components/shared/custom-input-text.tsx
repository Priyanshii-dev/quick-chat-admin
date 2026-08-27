import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { CustomFormField } from "./custom-form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type CustomInputTextProps = InputHTMLAttributes<HTMLInputElement>;
export type CustomTextareaInputProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormInputBaseProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  required?: boolean;
  inputWrapperClassName?: string;
  startAdornment?: ReactNode;
};

export type FormInputProps<TFieldValues extends FieldValues> =
  | (FormInputBaseProps<TFieldValues> &
    Omit<CustomInputTextProps, "name" | "required"> & { textarea?: false })
  | (FormInputBaseProps<TFieldValues> &
    Omit<CustomTextareaInputProps, "name" | "required"> & {
      textarea: true;
      rows?: number;
    });

export const CustomInputText = forwardRef<
  HTMLInputElement,
  CustomInputTextProps
>(function CustomInputText({ className = "", ...props }, ref) {
  return (
    <Input
      ref={ref}
      className={cn("h-10 bg-background border-border px-3 text-xs rounded-md", className)}
      {...props}
    />
  );
});

export const CustomTextareaInput = forwardRef<
  HTMLTextAreaElement,
  CustomTextareaInputProps
>(function CustomTextareaInput({ className = "", ...props }, ref) {
  return (
    <Textarea
      ref={ref}
      className={cn("min-h-20 bg-background border-border px-3 text-xs rounded-md", className)}
      {...props}
    />
  );
});

export function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  className,
  inputWrapperClassName,
  startAdornment,
  textarea,
  required,
  ...inputProps
}: FormInputProps<TFieldValues>) {
  const fieldId = `field-${String(name).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const inputType = "type" in inputProps ? inputProps.type : undefined;
  const placeholder =
    inputProps.placeholder ??
    (inputType === "email"
      ? "name@example.com"
      : `Enter ${label.toLowerCase()}`);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CustomFormField
          id={fieldId}
          label={label}
          required={required}
          error={fieldState.error?.message}
        >
          {textarea ? (
            <div className={inputWrapperClassName}>
              {startAdornment}
              <CustomTextareaInput
                {...field}
                {...(inputProps as Omit<CustomTextareaInputProps, "name">)}
                id={fieldId}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                aria-required={required}
                aria-describedby={
                  fieldState.error ? `${fieldId}-error` : undefined
                }
                className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive", className)}
              />
            </div>
          ) : (
            <div className={inputWrapperClassName}>
              {startAdornment}
              <CustomInputText
                {...field}
                {...(inputProps as Omit<CustomInputTextProps, "name">)}
                id={fieldId}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                aria-required={required}
                aria-describedby={
                  fieldState.error ? `${fieldId}-error` : undefined
                }
                className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive", className)}
              />
            </div>
          )}
        </CustomFormField>
      )}
    />
  );
}
