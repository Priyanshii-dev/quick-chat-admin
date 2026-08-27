"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "link"
  | "default"
  | "outline"
  | "destructive";

export interface AppButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "variant"
> {
  variant?: AppButtonVariant;
  isLoading?: boolean;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(
    {
      children,
      className,
      variant = "secondary",
      size,
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) {
    const variants: Record<AppButtonVariant, string> = {
      primary: "bg-teal text-white hover:bg-[#05685f]",
      secondary:
        "border-line bg-white text-ink hover:border-teal hover:text-teal",
      ghost: "bg-transparent text-teal hover:bg-teal-soft",
      link: "min-h-0 border-transparent bg-transparent p-1 text-teal",
      default: "",
      outline: "",
      destructive: "",
    };
    type ShadcnButtonVariant = NonNullable<
      React.ComponentProps<typeof Button>["variant"]
    >;
    const isCustomVariant = ["primary", "secondary", "ghost", "link"].includes(
      variant,
    );
    const buttonVariant: ShadcnButtonVariant = isCustomVariant
      ? "outline"
      : (variant as ShadcnButtonVariant);

    return (
      <Button
        ref={ref}
        type={props.type ?? "button"}
        variant={buttonVariant}
        size={size}
        disabled={disabled || isLoading}
        className={cn(
          "min-h-9 rounded-[7px] px-3 py-2 text-[13px] font-bold",
          variants[variant],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : null}
        {children}
      </Button>
    );
  },
);

AppButton.displayName = "AppButton";
