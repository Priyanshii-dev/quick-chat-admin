"use client";

import type { ReactNode } from "react";
import { SharedBreadcrumb } from "@/components/shared/shared-breadcrumb";
import { cn } from "@/lib/utils";

type ModuleHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function ModuleHeader({
  title,
  description,
  className,
  children,
}: ModuleHeaderProps) {
  return (
    <header className={cn("mb-6 space-y-2", className)}>
      <SharedBreadcrumb current={title} className="mb-2" />
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        {children ? (
          <div className="flex shrink-0 items-center gap-3">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
