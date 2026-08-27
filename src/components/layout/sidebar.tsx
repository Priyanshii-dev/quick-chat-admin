"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Globe,
  Sparkles,
  MessageSquare,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavGroupItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  subItems?: NavSubItem[];
}

interface NavSection {
  title?: string;
  items: NavGroupItem[];
}

export function Sidebar({ alwaysOpen }: { alwaysOpen?: boolean } = {}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Single active accordion group (for Blog & SEO)
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/blog")) {
      setOpenGroup("Blog Management");
    } else if (pathname.startsWith("/seo")) {
      setOpenGroup("SEO Management");
    } else {
      setOpenGroup(null);
    }
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  const navSections: NavSection[] = [
    {
      items: [
        {
          label: "Dashboard",
          href: "/",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Content Management",
      items: [
        {
          label: "Blog Management",
          icon: BookOpen,
          subItems: [
            { label: "Blog Category", href: "/blog/categories" },
            { label: "Add Blog", href: "/blog/add" },
            { label: "Blog List", href: "/blog" },
          ],
        },
        {
          label: "SEO Management",
          icon: Globe,
          subItems: [
            { label: "Add SEO", href: "/seo/add" },
            { label: "SEO List", href: "/seo" },
          ],
        },
        {
          label: "Hero Section",
          href: "/hero",
          icon: Sparkles,
        },
      ],
    },
    {
      title: "Community & Support",
      items: [
        {
          label: "Contact Us",
          href: "/contact-us",
          icon: MessageSquare,
        },
        {
          label: "Subscribers",
          href: "/subscribers",
          icon: Users,
        },
      ],
    },
    {
      title: "System Settings",
      items: [
        {
          label: "Settings & Configuration",
          href: "/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-3 left-3 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="h-10 w-10 border-border bg-card shadow-md text-foreground"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="mb-6 flex items-center gap-3 px-2 text-inherit no-underline group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
              QuietChat <span className="text-[11px] uppercase tracking-widest text-primary font-bold">ADMIN</span>
            </div>
            <div className="text-xs text-muted-foreground">Module Architecture</div>
          </div>
        </Link>

        {/* Navigation List */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              {section.title && (
                <div className="px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-muted-foreground/80">
                  {section.title}
                </div>
              )}

              {section.items.map((item) => {
                const Icon = item.icon;

                // Handle items with nested subItems (Parent Accordion for Blog & SEO)
                if (item.subItems) {
                  const isGroupOpen = openGroup === item.label;
                  const isChildActive = item.subItems.some(
                    (sub) => pathname === sub.href
                  );

                  return (
                    <div key={item.label} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleGroup(item.label)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold transition-all ${
                          isChildActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-extrabold shadow-xs"
                            : "text-sidebar-foreground/90 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4.5 w-4.5 ${isChildActive ? "text-primary-foreground font-bold" : "text-primary"}`} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isGroupOpen ? "rotate-0 text-primary" : "-rotate-90 opacity-60"
                          }`}
                        />
                      </button>

                      {/* Render SubItems */}
                      {isGroupOpen && (
                        <div className="ml-3 space-y-1 border-l-2 border-primary/30 pl-3 py-1 animate-in fade-in-50 slide-in-from-top-1">
                          {item.subItems.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-semibold no-underline transition-colors ${
                                  isSubActive
                                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                                }`}
                              >
                                <span>{sub.label}</span>
                                {isSubActive && <ChevronRight className="h-3.5 w-3.5" />}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle single navigation items (including Settings & Configuration link)
                const isActive =
                  pathname === item.href ||
                  (item.href === "/settings" && pathname.startsWith("/settings"));

                return (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold no-underline transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-extrabold shadow-sm"
                        : "text-sidebar-foreground/90 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4.5 w-4.5" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer info */}
        <div className="mt-auto border-t border-border pt-4 px-2 text-xs text-muted-foreground">
          <div className="font-bold text-foreground">QuietChat Admin v1.0</div>
          <div>Card Grid Settings Navigation</div>
        </div>
      </aside>
    </>
  );
}
