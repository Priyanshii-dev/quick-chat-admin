"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Sparkles, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Active
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 3-Theme Switcher Selector */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1 text-xs">
          <button
            type="button"
            onClick={() => setTheme("theme-quietchat")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
              theme === "theme-quietchat" || theme === "system"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="QuietChat Gold Dark Theme"
          >
            <Sparkles className="h-3.5 w-3.5" />
            QuietChat
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
              theme === "dark"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Dark Theme"
          >
            <Moon className="h-3.5 w-3.5" />
            Dark
          </button>

          <button
            type="button"
            onClick={() => setTheme("theme-light")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
              theme === "theme-light"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Light Theme"
          >
            <Sun className="h-3.5 w-3.5" />
            Light
          </button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
        </Button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-extrabold text-xs">
            QC
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-foreground">Admin Workspace</div>
            <div className="text-[10px] text-muted-foreground">admin@quietchat.in</div>
          </div>
        </div>
      </div>
    </header>
  );
}
