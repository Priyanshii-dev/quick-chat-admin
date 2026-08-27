"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type SharedBreadcrumbProps = {
  current: string;
  className?: string;
};

const pathLabelMap: Record<string, string> = {
  settings: "Settings",
  "general-settings": "General Settings",
  "login-history": "Login History",
  "email-templates": "Email Templates",
  "smtp-settings": "SMTP Settings",
  "logo-settings": "Logo & Favicon",
  seo: "SEO",
  "social-media": "Social Media",
  subscribers: "Subscribers",
  blog: "Blog",
  categories: "Blog Category",
  new: "Add New Blog",
  dashboard: "Dashboard",
};

function formatSegmentLabel(segment: string) {
  return (
    pathLabelMap[segment] ??
    segment
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function SharedBreadcrumb({
  current,
  className,
}: SharedBreadcrumbProps) {
  const pathname = usePathname() ?? "/";
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = [{ label: "Home", href: "/" }];

  if (pathSegments.length > 0) {
    let currentPath = "";

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      breadcrumbItems.push({
        label: formatSegmentLabel(segment),
        href: currentPath,
      });
    });
  }

  if (pathSegments.length === 0) {
    breadcrumbItems.push({ label: current, href: "/" });
  }

  const itemsToRender =
    pathSegments.length > 0
      ? breadcrumbItems.map((item, index) =>
          index === breadcrumbItems.length - 1
            ? { ...item, label: current }
            : item,
        )
      : breadcrumbItems;

  return (
    <BreadcrumbPrimitive className={className}>
      <BreadcrumbList>
        {itemsToRender.map((item, index) => {
          const isLast = index === itemsToRender.length - 1;

          return (
            <BreadcrumbItem key={`${item.href}-${index}`}>
              {!isLast ? (
                <>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
}
