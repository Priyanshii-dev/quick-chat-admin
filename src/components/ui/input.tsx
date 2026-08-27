import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
  const isInvalid =
    error || props["aria-invalid"] === true || props["aria-invalid"] === "true";

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      aria-invalid={isInvalid ? true : undefined}
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/40 md:text-xs",
        isInvalid && "border-destructive ring-2 ring-destructive/40 focus:border-destructive! focus:ring-destructive/40!",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
