import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
}

function Textarea({ className, error, ...props }: TextareaProps) {
  const isInvalid =
    error || props["aria-invalid"] === true || props["aria-invalid"] === "true";

  return (
    <textarea
      data-slot="textarea"
      aria-invalid={isInvalid ? true : undefined}
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/40 md:text-xs",
        isInvalid && "border-destructive ring-2 ring-destructive/40 focus:border-destructive! focus:ring-destructive/40!",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
