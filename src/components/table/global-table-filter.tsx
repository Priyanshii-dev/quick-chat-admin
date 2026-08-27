"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  condition?: boolean; // condition-based filter group visibility!
}

export interface GlobalTableFilterProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string>;
  onFilterChange: (groupId: string, value: string) => void;
  onResetFilters: () => void;
}

export function GlobalTableFilter({
  filterGroups,
  selectedFilters,
  onFilterChange,
  onResetFilters,
}: GlobalTableFilterProps) {
  const activeCount = Object.values(selectedFilters).filter(Boolean).length;

  // Filter groups based on condition
  const visibleGroups = filterGroups.filter(
    (g) => g.condition === undefined || g.condition === true
  );

  if (visibleGroups.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium px-1">
        <Filter className="h-3.5 w-3.5" />
        <span>Filters:</span>
      </div>

      {visibleGroups.map((group) => (
        <select
          key={group.id}
          value={selectedFilters[group.id] || ""}
          onChange={(e) => onFilterChange(group.id, e.target.value)}
          className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
        >
          <option value="">All {group.label}</option>
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      )}
    </div>
  );
}
