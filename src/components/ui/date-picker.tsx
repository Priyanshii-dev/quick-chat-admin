"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: string; // ISO date string (YYYY-MM-DD) or datetime (YYYY-MM-DDTHH:mm)
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showTime?: boolean;
  label?: string;
  error?: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({
  value = "",
  onChange,
  placeholder = "Select date...",
  disabled = false,
  className = "",
  showTime = false,
  error = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date or default to current date
  const parsedDate = value ? new Date(value) : null;
  const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

  const [viewYear, setViewYear] = useState<number>(
    isValidDate ? parsedDate.getFullYear() : new Date().getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState<number>(
    isValidDate ? parsedDate.getMonth() : new Date().getMonth(),
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    isValidDate
      ? `${String(parsedDate.getHours()).padStart(2, "0")}:${String(parsedDate.getMinutes()).padStart(2, "0")}`
      : "12:00",
  );

  // Keep view year/month updated when value changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
        setSelectedTime(
          `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
        );
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const monthStr = String(viewMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const datePart = `${viewYear}-${monthStr}-${dayStr}`;

    if (showTime) {
      const finalVal = `${datePart}T${selectedTime || "00:00"}`;
      onChange(finalVal);
    } else {
      onChange(datePart);
      setIsOpen(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeVal = e.target.value;
    setSelectedTime(timeVal);
    if (value) {
      const datePart = value.split("T")[0];
      onChange(`${datePart}T${timeVal}`);
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const timeStr = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

    setViewYear(y);
    setViewMonth(today.getMonth());
    setSelectedTime(timeStr);

    if (showTime) {
      onChange(`${y}-${m}-${d}T${timeStr}`);
    } else {
      onChange(`${y}-${m}-${d}`);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  // Calendar grid calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Format displayed text
  const formatDisplay = () => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;

    const dateStr = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (showTime) {
      const timeStr = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return `${dateStr}, ${timeStr}`;
    }

    return dateStr;
  };

  const isToday = (day: number) => {
    const now = new Date();
    return (
      now.getFullYear() === viewYear &&
      now.getMonth() === viewMonth &&
      now.getDate() === day
    );
  };

  const isSelected = (day: number) => {
    if (!isValidDate || !parsedDate) return false;
    return (
      parsedDate.getFullYear() === viewYear &&
      parsedDate.getMonth() === viewMonth &&
      parsedDate.getDate() === day
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        error && "is-invalid",
        className,
      )}
    >
      <div className="relative flex items-center">
        <button
          type="button"
          disabled={disabled}
          aria-invalid={error}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-all outline-none",
            error
              ? "border-destructive ring-2 ring-destructive/40"
              : isOpen
                ? "border-primary ring-2 ring-primary/40"
                : "border-border hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/40",
            disabled && "cursor-not-allowed opacity-50 bg-muted",
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
            <span
              className={
                value ? "text-foreground font-medium" : "text-muted-foreground"
              }
            >
              {formatDisplay() || placeholder}
            </span>
          </div>

          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded-full"
              title="Clear date"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1.5 w-72 rounded-xl border border-border bg-popover p-3 shadow-xl animate-in fade-in-50 zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-accent text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-xs font-bold text-foreground">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-accent text-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEKDAYS.map((wd) => (
              <span
                key={wd}
                className="text-[10px] font-bold uppercase text-muted-foreground py-1"
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Previous month padding days */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => {
              const dayNum = daysInPrevMonth - firstDayOfMonth + i + 1;
              return (
                <div
                  key={`prev-${i}`}
                  className="flex h-8 w-full items-center justify-center text-xs text-muted-foreground/30"
                >
                  {dayNum}
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const selected = isSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "flex h-8 w-full items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                    selected
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : today
                        ? "border border-primary text-primary font-bold hover:bg-primary/10"
                        : "hover:bg-accent text-foreground",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Optional Time Picker */}
          {showTime && (
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Time:</span>
              </div>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="h-8 rounded-md border border-input bg-background px-2 text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={handleSetToday}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-muted-foreground hover:text-foreground"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
