"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ModuleHeader } from "@/components/shared/module-header";
import { CommonTableFilters } from "@/components/shared/table/common-table-filters";
import { GlobalTable } from "@/components/shared/table/global-table";
import type { TableColumn } from "@/components/shared/table/types/types";
import { useLoginHistory } from "../hook/login-history.hook";
import type { LoginEvent } from "../types/types";

export function LoginHistoryPage() {
  const { data, isLoading } = useLoginHistory();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const rows: LoginEvent[] = data?.items ?? [];
  const filteredRows = useMemo(
    () =>
      rows.filter((event) => {
        const matchesName = event.user
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesName && (type === "all" || event.type === type);
      }),
    [rows, query, type],
  );
  const total = filteredRows.length;
  const columns: TableColumn<LoginEvent>[] = [
    {
      id: "srNo",
      header: "S.No.",
      cell: (_event, index) => <span className="font-medium">{index + 1}</span>,
    },
    {
      id: "user",
      header: "User",
      cell: (event) => <span className="whitespace-nowrap">{event.user}</span>,
    },
    {
      id: "email",
      header: "Email",
      cell: (event) => (
        <span className="whitespace-nowrap">{event.email ?? "-"}</span>
      ),
    },
    {
      id: "type",
      header: "Type",
      cell: (event) => (
        <span className="lowercase">{event.type ?? "desktop"}</span>
      ),
    },
    { id: "ip", header: "IP", cell: (event) => <span>{event.ip ?? "-"}</span> },
    {
      id: "location",
      header: "Location",
      cell: (event) => <span>{event.location ?? "-"}</span>,
    },
    {
      id: "device",
      header: "Device",
      cell: (event) => <span>{event.device}</span>,
    },
    {
      id: "createdAt",
      header: "Date & Time",
      cell: (event) => (
        <span className="whitespace-nowrap">{event.createdAt}</span>
      ),
    },
  ];

  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar alwaysOpen />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <ModuleHeader eyebrow="Security" title="Login History" />
        <div className="mb-4 flex items-center justify-between gap-4 max-[680px]:flex-col">
          <CommonTableFilters
            search
            searchValue={query}
            onSearchChange={(value) => {
              setQuery(value);
              setPage(1);
            }}
            select
            selectValue={type === "all" ? "" : type}
            selectOptions={[
              { label: "Desktop", value: "desktop" },
              { label: "Mobile", value: "mobile" },
              { label: "Tablet", value: "tablet" },
            ]}
            onSelectChange={(value) => {
              setType(value || "all");
              setPage(1);
            }}
            selectLabel="Type"
            includeAllOption={false}
            className="flex-1"
          />
        </div>
        <section className="rounded-lg">
          <GlobalTable
            data={filteredRows}
            columns={columns}
            totalCount={total}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            loading={isLoading}
          />
        </section>
      </main>
    </div>
  );
}
