"use client";

import { TableColumn } from "@/components/table/global-table";
import { HeroBanner } from "../types/hero.types";
import { ActionsButton } from "@/components/table/actions-button";

export const getHeroColumns = (
  onEdit: (hero: HeroBanner) => void,
): TableColumn<HeroBanner>[] => [
  {
    accessorKey: "heading",
    header: "Main Heading & Badge",
    cell: (hero) => (
      <div className="py-1 max-w-sm space-y-1">
        {hero.badgeText && (
          <span className="inline-block rounded-full bg-primary/15 text-primary px-2.5 py-0.5 text-[10px] font-bold">
            {hero.badgeText}
          </span>
        )}
        <div className="font-bold text-foreground line-clamp-1">
          {hero.heading}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {hero.subheading}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "primaryCtaText",
    header: "CTAs",
    cell: (hero) => (
      <div className="flex flex-col gap-1 text-xs">
        <span className="font-medium text-primary">
          Primary: {hero.primaryCtaText}
        </span>
        {hero.secondaryCtaText && (
          <span className="text-muted-foreground">
            Secondary: {hero.secondaryCtaText}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: (hero) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
          hero.isActive
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
        }`}
      >
        {hero.isActive ? "Active Live" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: (hero) => (
      <span className="text-muted-foreground">{hero.updatedAt}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (hero) => <ActionsButton onEdit={() => onEdit(hero)} />,
  },
];
