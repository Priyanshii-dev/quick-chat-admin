"use client";

import { DataTableToolbarCompact } from "./datatable-toolbar";
import type { CommonTableFiltersProps, FilterConfig } from "./types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

export function CommonTableFilters({
  search = false,
  searchValue = "",
  onSearchChange,
  select = false,
  selectValue = "",
  selectOptions = [],
  onSelectChange,
  selectLabel,
  includeAllOption = true,
  multiple = false,
  multipleValue = [],
  multipleOptions = [],
  onMultipleChange,
  date = false,
  dateValue = "",
  onDateChange,
  status = false,
  statusValue = "",
  statusOptions = [],
  onStatusChange,
  className,
}: CommonTableFiltersProps) {
  const toggleMultiple = (value: string, checked: boolean) => {
    const nextValue = checked
      ? [...multipleValue, value]
      : multipleValue.filter((item) => item !== value);
    onMultipleChange?.(nextValue);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {select ? (
        <label className="grid shrink-0">
          <Select
            value={selectValue}
            onValueChange={(value) => onSelectChange?.(value ?? "")}
          >
            <SelectTrigger
              className={cn(
                "!h-9 w-40 rounded-md px-3 text-sm",
                selectLabel && "w-[145px] font-semibold",
              )}
            >
              {selectLabel ? (
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  {selectLabel}
                </span>
              ) : (
                <SelectValue placeholder="All" />
              )}
            </SelectTrigger>
            <SelectContent side="bottom">
              {includeAllOption ? (
                <SelectItem value="all">All</SelectItem>
              ) : null}
              {selectOptions
                .filter((option) => option.value !== "all")
                .map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </label>
      ) : null}

      {status ? (
        <label className="grid shrink-0">
          <Select
            value={statusValue}
            onValueChange={(value) => onStatusChange?.(value ?? "")}
          >
            <SelectTrigger className="!h-9 w-48 rounded-md px-3 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent side="bottom">
              <SelectItem value="all">All</SelectItem>
              {statusOptions
                .filter((option) => option.value !== "all")
                .map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </label>
      ) : null}

      {search ? (
        <label className="grid w-1/3 min-w-[300px]">
          <Input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search..."
            className="!h-9 w-full rounded-md px-3 text-sm placeholder:text-muted-foreground"
          />
        </label>
      ) : null}

      {date ? (
        <label className="grid shrink-0">
          <Input
            type="date"
            value={dateValue}
            onChange={(event) => onDateChange?.(event.target.value)}
            className="!h-9 w-48 rounded-md px-3 text-sm"
          />
        </label>
      ) : null}

      {multiple ? (
        <fieldset className="grid gap-1.5">
          <legend className="text-xs font-medium text-muted-foreground">
            Options
          </legend>
          <div className="flex min-h-9 items-center gap-3">
            {multipleOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm"
              >
                <Checkbox
                  checked={multipleValue.includes(option.value)}
                  onCheckedChange={(checked) =>
                    toggleMultiple(option.value, checked === true)
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}

const GlobalFilterSection = ({ filters }: { filters: FilterConfig[] }) => {
  return (
    <div className="my-4">
      <DataTableToolbarCompact filters={filters} />
    </div>
  );
};

export default GlobalFilterSection;
