"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "../../api/hooks/use-logout";
import { useUser } from "@/features/auth/hook/auth.hook";

const groups: {
  label: string;
  items: { label: string; href: string; icon: LucideIcon }[];
}[] = [
  {
    label: "Workspace",
    items: [{ label: "Overview", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Growth",
    items: [{ label: "Subscribers", href: "/subscribers", icon: Users }],
  },
  {
    label: "Settings",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];

export function Sidebar({ alwaysOpen = false }: { alwaysOpen?: boolean }) {
  const [open, setOpen] = useState(alwaysOpen);
  const [collapsed, setCollapsed] = useState(false);
  const [blogOpen, setBlogOpen] = useState(true);
  const pathname = usePathname();
  const profile = useUser();
  const logout = useLogout();

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={`hidden size-10 place-items-center rounded-[7px] border border-line bg-white max-[680px]:inline-grid ${alwaysOpen ? "max-[680px]:hidden" : ""}`}
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <Menu size={19} />
      </Button>
      <aside
        className={`sticky top-0 flex h-screen min-h-0 flex-col overflow-y-auto bg-[var(--navigation)] px-[18px] py-7 text-[var(--navigation-foreground)] ${open ? "max-[680px]:fixed max-[680px]:inset-y-0 max-[680px]:left-0 max-[680px]:z-10 max-[680px]:flex max-[680px]:w-[calc(100%-72px)]" : "max-[680px]:hidden"} ${collapsed ? "px-3 [&_.brand-name]:hidden [&_.nav-label]:hidden [&_.nav-item>span]:hidden [&_.nav-item>svg:last-child]:hidden [&_.profile-details]:hidden [&_.nav-item]:justify-center [&_.nav-item]:px-2.5" : ""}`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-inherit no-underline"
            onClick={() => {
              if (!alwaysOpen) setOpen(false);
            }}
          >
            <span className="grid size-[38px] place-items-center rounded-[11px] bg-yellow text-xl font-bold text-[#173735]">
              N
            </span>
            <strong className="brand-name">northstar</strong>
          </Link>
        </div>
        {groups.map((group) => (
          <div key={group.label}>
            <div className="mx-3 mt-[30px] mb-2 text-[10px] leading-tight font-bold tracking-[0.14em] text-[#809c97] uppercase">
              {group.label}
            </div>
            {group.items.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--navigation-foreground)] no-underline hover:bg-white/70 hover:text-[var(--navigation-active)] ${pathname === href || (href === "/settings" && pathname.startsWith("/settings/")) ? "bg-[var(--navigation-active)] text-white" : ""}`}
                onClick={() => {
                  if (!alwaysOpen) setOpen(false);
                }}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{label}</span>
                {(pathname === href ||
                  (href === "/settings" &&
                    pathname.startsWith("/settings/"))) && (
                  <ChevronRight size={14} style={{ marginLeft: "auto" }} />
                )}
              </Link>
            ))}
            {group.label === "Workspace" ? (
              <div className="mt-1 rounded-lg bg-white/25 p-1.5">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-semibold text-[var(--navigation-foreground)] hover:bg-white/70"
                  onClick={() => setBlogOpen((isOpen) => !isOpen)}
                >
                  <BookOpen size={17} strokeWidth={1.8} />
                  <span className="nav-label">Blog</span>
                  <ChevronDown
                    size={15}
                    className={`ml-auto transition-transform ${blogOpen ? "" : "-rotate-90"}`}
                  />
                </button>
                {blogOpen ? (
                  <div className="mt-1 grid gap-1 border-t border-coral/20 pt-1">
                    {[
                      { label: "Blog Category", href: "/blog/categories" },
                      { label: "Blogs List", href: "/blog" },
                      { label: "Add New Blog", href: "/blog/new" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-[var(--navigation-foreground)] no-underline hover:bg-white/70 hover:text-[var(--navigation-active)] ${pathname === item.href ? "bg-[var(--navigation-active)] text-white" : ""}`}
                      >
                        <BookOpen size={14} strokeWidth={1.8} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </aside>
    </>
  );
}
