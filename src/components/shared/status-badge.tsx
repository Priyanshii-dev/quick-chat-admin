import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusBadgeValue = "Active" | "Inactive" | "Published" | "Draft";

const statusConfig: Record<StatusBadgeValue, { className: string }> = {
  Active: { className: "border-teal/20 bg-teal-soft text-teal" },
  Published: { className: "border-teal/20 bg-teal-soft text-teal" },
  Inactive: { className: "border-red-200 bg-red-50 text-red-600" },
  Draft: { className: "border-amber-200 bg-amber-50 text-amber-700" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: StatusBadgeValue;
  className?: string;
}) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2.5 py-1 text-[10px] font-bold uppercase",
        config.className,
        className,
      )}
    >
      {status}
    </Badge>
  );
}
