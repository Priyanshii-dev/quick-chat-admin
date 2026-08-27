"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GlobalTableProps, TableColumn } from "./types/types";
import { CustomPagination } from "./custom-pagination";

export function GlobalTable<TData>({
  data,
  columns,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  filters,
  isPaginationEnabled = true,
  loading = false,
}: Readonly<GlobalTableProps<TData>>) {
  const pageCount = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1;
  const visibleData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
      {filters && filters.length > 0 ? (
        <div className="border-b p-4">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) =>
              filter.type === "search" ? (
                <Input
                  key={filter.key}
                  type="search"
                  aria-label={filter.label}
                  placeholder={
                    filter.placeholder ?? `Search ${filter.label}...`
                  }
                  value={filter.value}
                  onChange={(event) => filter.onChange(event.target.value)}
                  className="h-9 w-[min(100%,400px)] rounded-md px-3 text-sm"
                />
              ) : filter.type === "select" ? (
                <Select
                  key={filter.key}
                  value={filter.value || "all"}
                  onValueChange={(value) =>
                    filter.onChange(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger
                    aria-label={filter.label}
                    className="h-9 w-48 rounded-md px-3 text-sm"
                  >
                    <SelectValue
                      placeholder={filter.placeholder ?? filter.label}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {filter.options
                      .filter((option) => option.value !== "all")
                      .map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              ) : null,
            )}
          </div>
        </div>
      ) : null}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={column.id ?? String(column.accessorKey) ?? index}
                className="whitespace-nowrap bg-muted/50 font-semibold"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                {columns.map((_column, columnIndex) => (
                  <TableCell key={`skeleton-cell-${columnIndex}`}>
                    <Skeleton className="h-5 w-4/5" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : visibleData.length > 0 ? (
            visibleData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <TableCell
                    key={column.id ?? String(column.accessorKey) ?? columnIndex}
                  >
                    {column.cell
                      ? column.cell(
                        row,
                        (currentPage - 1) * pageSize + rowIndex,
                      )
                      : column.accessorKey
                        ? String(row[column.accessorKey] ?? "-")
                        : "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isPaginationEnabled && totalCount > 0 ? (
        <CustomPagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={onPageChange}
          totalItems={totalCount}
          itemsPerPage={pageSize}
          onItemsPerPageChange={onPageSizeChange}
        />
      ) : null}
    </div>
  );
}

export type { GlobalTableProps, TableColumn };
