"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
  totalItems?: number;
}

const itemsPerPageOptions = [5, 10, 25, 50, 100];

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  totalItems,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-6 px-6 pt-8 pb-5 max-[760px]:flex-wrap max-[760px]:gap-4">
      {/* Results Info and Items Per Page */}
      <div className="contents">
        {/* Total Results */}
        {totalItems && (
          <div className="order-1 shrink-0 text-sm text-slate-600 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {Math.max(1, (currentPage - 1) * itemsPerPage + 1)}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {totalItems}
            </span>{" "}
            results
          </div>
        )}

        {/* Items Per Page Selector */}
        {onItemsPerPageChange && (
          <div className="order-3 flex shrink-0 items-center gap-2 max-[760px]:order-2 max-[430px]:w-full max-[430px]:justify-end">
            <label
              htmlFor="items-per-page"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Show
            </label>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(value) => {
                onItemsPerPageChange(Number(value));
                onPageChange(1);
              }}
            >
              <SelectTrigger id="items-per-page" className="h-9 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              per page
            </span>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="order-2 flex shrink-0 items-center justify-center max-[760px]:order-3 max-[760px]:mx-auto">
        <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-white px-4 py-2 shadow-md">
          <div className="flex align-middle gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronsLeft className="w-4 h-4 text-muted-foreground dark:text-slate-400" />
            </Button>

            {/* Previous Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground dark:text-slate-400" />
            </Button>
          </div>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 px-2">
            {renderPageNumbers().map((page, idx) => (
              <Button
                type="button"
                variant={page === currentPage ? "outline" : "ghost"}
                size="icon"
                key={idx}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={typeof page === "string" || page === currentPage}
                className="size-9 rounded-full text-sm font-semibold"
              >
                {page}
              </Button>
            ))}
          </div>

          {/* Next Button */}
          <div className="flex align-middle gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground dark:text-slate-400" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronsRight className="w-4 h-4 text-muted-foreground dark:text-slate-400" />
            </Button>
          </div>

          {/* Go to Page Input */}
          {/* <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 shadow-sm">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Go to
            </span>
            <Input
              type="number"
              min="1"
              max={totalPages}
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleGoToPage()}
              placeholder="Page"
              className="h-9 w-20 text-center text-sm"
            />
            <Button
              type="button"
              variant="default"
              onClick={handleGoToPage}
              disabled={!goToPage}
              className="px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded-md hover:shadow-md hover:shadow-[#3B38A0]/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              Go
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
