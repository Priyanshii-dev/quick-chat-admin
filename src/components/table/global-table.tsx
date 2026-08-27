"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
  ArrowUpDown,
  Search,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRange, DateRangeValue } from "./date-range";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<TData> {
  id?: string;
  accessorKey?: keyof TData | string;
  header: React.ReactNode;
  cell?: (row: TData, index: number) => React.ReactNode;
  sortable?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface GlobalTableProps<TData> {
  // Title & Header info
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];

  // Configurable Toolbar Controls (Condition-based: true/false!)
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;

  showStatusFilter?: boolean;
  statusValue?: string;
  onStatusChange?: (val: string) => void;
  statusOptions?: FilterOption[];

  showCategoryFilter?: boolean;
  categoryValue?: string;
  onCategoryChange?: (val: string) => void;
  categoryOptions?: FilterOption[];

  showDateRange?: boolean;
  dateRangeValue?: DateRangeValue;
  onDateRangeChange?: (range: DateRangeValue) => void;

  // Custom Primary & Secondary Actions
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  // Table Data & Columns
  columns: TableColumn<TData>[];
  data: TData[];
  loading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  rowClassName?: (row: TData) => string;
}

export function GlobalTable<TData>({
  icon,
  title,
  description,
  breadcrumbs,
  showSearch = true,
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Search records...",
  showStatusFilter = false,
  statusValue = "",
  onStatusChange,
  statusOptions = [],
  showCategoryFilter = false,
  categoryValue = "",
  onCategoryChange,
  categoryOptions = [],
  showDateRange = false,
  dateRangeValue,
  onDateRangeChange,
  primaryAction,
  secondaryAction,
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  pageSize = 10,
  rowClassName,
}: GlobalTableProps<TData>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const hasControls =
    (showSearch && onSearchChange) ||
    (showStatusFilter && onStatusChange) ||
    (showCategoryFilter && onCategoryChange) ||
    (showDateRange && onDateRangeChange);

  return (
    <div className="w-full space-y-3">
      <div className="w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {(title || primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 p-5 md:p-6">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {icon}
                </div>
              )}
              <div>
                {title && (
                  <h1 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {secondaryAction && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={secondaryAction.onClick}
                  className="gap-2 border-border bg-background hover:bg-accent text-xs font-semibold h-9"
                >
                  {secondaryAction.icon || <RefreshCw className="h-3.5 w-3.5" />}
                  {secondaryAction.label}
                </Button>
              )}

              {primaryAction && (
                primaryAction.href ? (
                  <Link href={primaryAction.href}>
                    <Button
                      size="sm"
                      className="gap-2 bg-primary text-primary-foreground font-bold hover:opacity-90 h-9 px-4 shadow-sm"
                    >
                      {primaryAction.icon || <Plus className="h-4 w-4" />}
                      {primaryAction.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    onClick={primaryAction.onClick}
                    className="gap-2 bg-primary text-primary-foreground font-bold hover:opacity-90 h-9 px-4 shadow-sm"
                  >
                    {primaryAction.icon || <Plus className="h-4 w-4" />}
                    {primaryAction.label}
                  </Button>
                )
              )}
            </div>
          </div>
        )}

        {/* Toolbar Controls Section inside Card */}
        {hasControls && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/20 p-4">
            <div className="flex flex-1 flex-wrap items-center gap-3 min-w-[240px]">
              {/* Search Input */}
              {showSearch && onSearchChange && (
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-9 pl-9 pr-8 text-xs bg-background border-border"
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

              {/* Status Select Filter */}
              {showStatusFilter && onStatusChange && (
                <select
                  value={statusValue}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground focus:outline-none"
                >
                  <option value="">All Visibility / Status</option>
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Category Select Filter */}
              {showCategoryFilter && onCategoryChange && (
                <select
                  value={categoryValue}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Date Range Picker */}
              {showDateRange && onDateRangeChange && (
                <DateRange
                  value={dateRangeValue}
                  onChange={onDateRangeChange}
                  onClear={() => onDateRangeChange({ from: undefined, to: undefined })}
                />
              )}
            </div>
          </div>
        )}

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground uppercase font-semibold tracking-wider">
                {columns.map((col, idx) => (
                  <th
                    key={col.id || String(col.accessorKey) || idx}
                    className="px-4 py-3.5 font-bold select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      {col.header}
                      {col.sortable && <ArrowUpDown className="h-3 w-3 opacity-60" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, rIdx) => (
                  <tr key={rIdx} className="animate-pulse">
                    {columns.map((_, cIdx) => (
                      <td key={cIdx} className="px-4 py-4">
                        <div className="h-4 w-3/4 rounded bg-muted/60" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : visibleData.length > 0 ? (
                visibleData.map((row, rIdx) => {
                  const customClass = rowClassName ? rowClassName(row) : "";
                  return (
                    <tr
                      key={rIdx}
                      className={`transition-colors hover:bg-muted/40 ${customClass}`}
                    >
                      {columns.map((col, cIdx) => (
                        <td
                          key={col.id || String(col.accessorKey) || cIdx}
                          className="px-4 py-3.5 text-xs align-middle"
                        >
                          {col.cell
                            ? col.cell(row, startIndex + rIdx)
                            : col.accessorKey
                              ? String((row as any)[col.accessorKey] ?? "—")
                              : "—"}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="h-8 w-8 opacity-40 text-primary" />
                      <p className="text-sm font-medium">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-xs text-muted-foreground bg-muted/20">
          <div>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {totalItems > 0 ? startIndex + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(startIndex + itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalItems}</span>{" "}
            entries
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="mr-1">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded border border-border bg-card px-2 py-1 text-xs text-foreground focus:outline-none"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="h-7 w-7 p-0"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="px-2 font-medium text-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage >= totalPages}
                className="h-7 w-7 p-0"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
