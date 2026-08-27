"use client";

import React, { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { GlobalTable, TableColumn } from "@/components/table/global-table";
import { useLoginHistory } from "../hook/login-history.hook";
import type { LoginEvent } from "../types/types";

export function LoginHistoryPage() {
  const { data, isLoading } = useLoginHistory();
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const rows: LoginEvent[] = data?.items ?? [];

  const filteredRows = useMemo(
    () =>
      rows.filter((event) => {
        const matchesName =
          !query ||
          event.user.toLowerCase().includes(query.toLowerCase()) ||
          (event.email &&
            event.email.toLowerCase().includes(query.toLowerCase()));
        const matchesType = !selectedType || event.type === selectedType;
        return matchesName && matchesType;
      }),
    [rows, query, selectedType],
  );

  const columns: TableColumn<LoginEvent>[] = [
    {
      id: "srNo",
      header: "S.No.",
      cell: (_event, index) => (
        <span className="font-semibold text-foreground">{index + 1}</span>
      ),
    },
    {
      id: "user",
      header: "User",
      cell: (event) => (
        <span className="font-extrabold text-foreground">{event.user}</span>
      ),
    },
    {
      id: "email",
      header: "Email",
      cell: (event) => (
        <span className="font-mono text-muted-foreground">
          {event.email ?? "—"}
        </span>
      ),
    },
    {
      id: "type",
      header: "Device Type",
      cell: (event) => (
        <span className="capitalize rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-foreground">
          {event.type ?? "desktop"}
        </span>
      ),
    },
    {
      id: "ip",
      header: "IP Address",
      cell: (event) => (
        <span className="font-mono text-xs">{event.ip ?? "—"}</span>
      ),
    },
    {
      id: "location",
      header: "Location",
      cell: (event) => (
        <span className="text-foreground">{event.location ?? "—"}</span>
      ),
    },
    {
      id: "device",
      header: "Device Info",
      cell: (event) => (
        <span className="text-muted-foreground">{event.device}</span>
      ),
    },
    {
      id: "createdAt",
      header: "Date & Time",
      cell: (event) => (
        <span className="whitespace-nowrap font-medium text-muted-foreground">
          {event.createdAt}
        </span>
      ),
    },
  ];

  const typeOptions = [
    { label: "Desktop", value: "desktop" },
    { label: "Mobile", value: "mobile" },
    { label: "Tablet", value: "tablet" },
  ];

  return (
    <div className="w-full">
      <GlobalTable
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Login History"
        description="Review recent administrator account access, IP addresses, and security audit logs."
        breadcrumbs={[
          { label: "Settings", href: "/settings" },
          { label: "Login History" },
        ]}
        showSearch={true}
        searchQuery={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search by user or email..."
        showStatusFilter={true}
        statusValue={selectedType}
        onStatusChange={setSelectedType}
        statusOptions={typeOptions}
        columns={columns}
        data={filteredRows}
        loading={isLoading}
        emptyMessage="No login audit events recorded."
      />
    </div>
  );
}
