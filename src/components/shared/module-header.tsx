"use client";

import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { AppButton } from "@/components/shared/app-button";
import { SharedBreadcrumb } from "@/components/shared/shared-breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/api/hooks/use-logout";
import { useUser } from "@/features/auth/hook/auth.hook";
import { cn } from "@/lib/utils";

type ModuleHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function ModuleHeader({
  title,
  className,
  children,
}: ModuleHeaderProps) {
  const profile = useUser();
  const logout = useLogout();
  const initials =
    profile?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header
      className={cn("-mt-7 max-[1000px]:-mt-6 max-[680px]:-mt-5", className)}
    >
      <div className="-mx-[42px] flex justify-end bg-[var(--navigation)] px-[42px] py-3 max-[1000px]:-mx-6 max-[1000px]:px-6 max-[680px]:-mx-4 max-[680px]:px-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <AppButton
                variant="ghost"
                size="icon"
                aria-label="Open profile menu"
                className="size-[38px] rounded-full bg-[var(--navigation-active)] text-[13px] text-white hover:bg-[#185d6d]"
              />
            }
          >
            {initials}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="font-semibold text-foreground">
                  {profile?.name ?? "Loading user..."}
                </div>
                <div className="mt-1 truncate font-normal text-muted-foreground">
                  {profile?.email ?? ""}
                </div>
                <div className="mt-1 font-normal capitalize text-muted-foreground">
                  {profile?.role ?? ""}
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              <LogOut />
              {logout.isPending ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-3 flex items-start justify-between gap-6 max-[680px]:mt-8 max-[680px]:flex-col">
        <h1 className="text-[30px] font-semibold leading-tight text-foreground max-[680px]:text-3xl">
          {title}
        </h1>
        {children ? (
          <div className="flex shrink-0 items-center gap-3 max-[680px]:w-full max-[680px]:justify-end">
            {children}
          </div>
        ) : null}
      </div>
      <SharedBreadcrumb current={title} className="mt-4 mb-3" />
    </header>
  );
}
