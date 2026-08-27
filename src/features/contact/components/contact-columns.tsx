"use client";

import { TableColumn } from "@/components/table/global-table";
import { ContactInquiry } from "../types/contact.types";
import { ActionsButton } from "@/components/table/actions-button";
import { Mail } from "lucide-react";

export const getContactColumns = (
  onView: (inquiry: ContactInquiry) => void,
  onDelete: (id: string) => void,
): TableColumn<ContactInquiry>[] => [
  {
    accessorKey: "name",
    header: "Sender",
    cell: (item) => (
      <div className="flex items-center gap-2.5 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
          {item.name.charAt(0)}
        </div>
        <div>
          <span className="font-semibold text-foreground">{item.name}</span>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>{item.email}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject & Message",
    cell: (item) => (
      <div className="max-w-md py-1">
        <span className="font-semibold text-foreground line-clamp-1">
          {item.subject}
        </span>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {item.message}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (item) => {
      const status = item.status;
      let style = "bg-primary/10 text-primary border-primary/20";
      if (status === "Replied")
        style = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      if (status === "Closed")
        style = "bg-muted text-muted-foreground border-border";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${style}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Received At",
    cell: (item) => (
      <span className="text-muted-foreground">{item.createdAt}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (item) => (
      <ActionsButton
        onView={() => onView(item)}
        onDelete={() => onDelete(item.id)}
      />
    ),
  },
];
