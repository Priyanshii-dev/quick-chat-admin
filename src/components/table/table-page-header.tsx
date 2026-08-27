"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TablePageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  children?: React.ReactNode;
}

export function TablePageHeader({
  title,
  description,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  children,
}: TablePageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-border/40 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
        </div>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {children}

        {secondaryAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={secondaryAction.onClick}
            className="gap-2 border-border bg-card hover:bg-accent text-foreground"
          >
            {secondaryAction.icon || <RefreshCw className="h-4 w-4" />}
            {secondaryAction.label}
          </Button>
        )}

        {primaryAction &&
          (primaryAction.href ? (
            <Link href={primaryAction.href}>
              <Button
                size="sm"
                className="gap-2 bg-primary text-primary-foreground font-semibold hover:opacity-90"
              >
                {primaryAction.icon || <Plus className="h-4 w-4" />}
                {primaryAction.label}
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              onClick={primaryAction.onClick}
              className="gap-2 bg-primary text-primary-foreground font-semibold hover:opacity-90"
            >
              {primaryAction.icon || <Plus className="h-4 w-4" />}
              {primaryAction.label}
            </Button>
          ))}
      </div>
    </div>
  );
}
