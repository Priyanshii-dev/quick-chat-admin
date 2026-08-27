"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTableFilter, FilterGroup } from "./global-table-filter";
import { DateRange, DateRangeValue } from "./date-range";

export interface TableToolbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string>;
  onFilterChange?: (groupId: string, value: string) => void;
  onResetFilters?: () => void;
  showDateRange?: boolean;
  dateRangeValue?: DateRangeValue;
  onDateRangeChange?: (range: DateRangeValue) => void;
  children?: React.ReactNode;
}

export function TableToolbar({
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Search records...",
  filterGroups = [],
  selectedFilters = {},
  onFilterChange,
  onResetFilters,
  showDateRange = false,
  dateRangeValue,
  onDateRangeChange,
  children,
}: TableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border border-b-0 border-border bg-card p-3 md:p-4">
      <div className="flex flex-1 flex-wrap items-center gap-2.5 min-w-[240px]">
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 pl-9 pr-8 text-xs bg-background border-border focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {filterGroups.length > 0 && onFilterChange && onResetFilters && (
          <GlobalTableFilter
            filterGroups={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
          />
        )}

        {showDateRange && onDateRangeChange && (
          <DateRange
            value={dateRangeValue}
            onChange={onDateRangeChange}
            onClear={() =>
              onDateRangeChange({ from: undefined, to: undefined })
            }
          />
        )}
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
