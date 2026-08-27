"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface FormCardLayoutProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backHref?: string;
  onBack?: () => void;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  footerActions?: React.ReactNode;
}

export function FormCardLayout({
  icon,
  title,
  description,
  breadcrumbs,
  backHref,
  onBack,
  children,
  onSubmit,
  footerActions,
}: FormCardLayoutProps) {
  return (
    <div className="w-full space-y-4">
      <div className="w-full rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
        {/* Card Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                {title}
              </h1>
              {description && (
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  {description}
                </p>
              )}
            </div>
          </div>

          {(backHref || onBack) &&
            (backHref ? (
              <Link href={backHref}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-border bg-background hover:bg-accent text-xs font-semibold h-9 px-3.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Button>
              </Link>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onBack}
                className="gap-1.5 border-border bg-background hover:bg-accent text-xs font-semibold h-9 px-3.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>
            ))}
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="space-y-6">
          {children}

          {footerActions && (
            <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-5">
              {footerActions}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
