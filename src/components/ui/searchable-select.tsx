"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

export interface SearchableOption {
  label: string;
  value: string;
}

export interface SearchableSelectProps {
  options: SearchableOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  disabled = false,
  className = "",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/40 transition-colors"
      >
        <span
          className={
            selectedOption ? "text-foreground" : "text-muted-foreground"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover p-1.5 shadow-lg animate-in fade-in-50 zoom-in-95">
          <div className="relative mb-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-border bg-background py-1.5 pl-8 pr-2 text-xs text-foreground focus:outline-none"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-2 text-center text-xs text-muted-foreground">
                No matching options
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
