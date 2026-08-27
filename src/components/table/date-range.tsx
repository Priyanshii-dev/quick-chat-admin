"use client";

import React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

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
  const isFiltered = Boolean(value.from || value.to);

  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-1.5 text-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground px-1">
        <CalendarIcon className="h-3.5 w-3.5 text-primary" />
        <span className="font-semibold">Date:</span>
      </div>

      <div className="w-36">
        <DatePicker
          value={value.from || ""}
          onChange={(fromVal) => onChange?.({ ...value, from: fromVal })}
          placeholder="From date"
        />
      </div>

      <span className="text-muted-foreground font-medium">to</span>

      <div className="w-36">
        <DatePicker
          value={value.to || ""}
          onChange={(toVal) => onChange?.({ ...value, to: toVal })}
          placeholder="To date"
        />
      </div>

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
