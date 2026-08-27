import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useDebounce from "@/hook/use-debounce";
import type { DataTableToolbarProps } from "./types/types";
import { cn } from "@/lib/utils";

export function DataTableToolbarCompact({
  filters = [],
  className = "",
}: Readonly<DataTableToolbarProps>) {
  const searchFilter = filters.find((f) => f.type === "search");
  const [search, setSearch] = useState(searchFilter?.value ?? "");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (searchFilter?.onChange) {
      searchFilter.onChange(debouncedSearch);
    }
  }, [debouncedSearch, searchFilter]);

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {filters.map((filter) => {
          if (filter.type === "select") {
            return (
              <Select
                key={filter.key}
                value={filter.value || "all"}
                onValueChange={(value) =>
                  filter.onChange(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-9 w-48 rounded-md px-3 text-sm">
                  <SelectValue placeholder={filter.placeholder ?? "All"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {filter.options
                    ?.filter((option) => option.value !== "all")
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            );
          }

          if (filter.type === "search") {
            return (
              <Input
                key={filter.key}
                type="search"
                aria-label={filter.label}
                placeholder={filter.placeholder ?? "Search..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 min-w-[200px] flex-1 rounded-md px-3 text-sm"
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
