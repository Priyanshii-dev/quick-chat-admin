"use client";

import React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DateRangeValue {
  from?: string;
  to?: string;
}

export interface DateRangeProps {
  value?: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  onClear?: () => void;
  className?: string;
}

export function DateRange({
  value = {},
  onChange,
  onClear,
  className = "",
}: DateRangeProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, from: e.target.value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, to: e.target.value });
  };

  const isFiltered = Boolean(value.from || value.to);

  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-md border border-border bg-card p-1.5 text-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground px-1">
        <CalendarIcon className="h-3.5 w-3.5" />
        <span className="font-medium">Date:</span>
      </div>

      <input
        type="date"
        value={value.from || ""}
        onChange={handleFromChange}
        className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />

      <span className="text-muted-foreground">to</span>

      <input
        type="date"
        value={value.to || ""}
        onChange={handleToChange}
        className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {isFiltered && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="h-6 w-6 rounded-full hover:bg-destructive/20 hover:text-destructive"
          title="Clear date filter"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
