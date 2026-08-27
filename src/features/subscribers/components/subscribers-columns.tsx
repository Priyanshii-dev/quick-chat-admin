"use client";

import { TableColumn } from "@/components/table/global-table";
import { Subscriber } from "../types/subscribers.types";
import { ActionsButton } from "@/components/table/actions-button";
import { Mail } from "lucide-react";

export const getSubscribersColumns = (
  onDelete: (id: string) => void,
): TableColumn<Subscriber>[] => [
  {
    accessorKey: "email",
    header: "Subscriber Email",
    cell: (sub) => (
      <div className="flex items-center gap-2 py-1 font-semibold text-foreground">
        <Mail className="h-3.5 w-3.5 text-primary" />
        <span>{sub.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Signup Source",
    cell: (sub) => (
      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground border border-border">
        {sub.source || "Website Footer"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (sub) => {
      const status = sub.status;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
            status === "Subscribed"
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
          }`}
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "subscribedAt",
    header: "Joined Date",
    cell: (sub) => (
      <span className="text-muted-foreground">{sub.subscribedAt}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (sub) => <ActionsButton onDelete={() => onDelete(sub.id)} />,
  },
];
