"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { AppButton } from "@/components/shared/app-button";

import { CommonTableFilters } from "@/components/shared/table/common-table-filters";
import { GlobalTable } from "@/components/shared/table/global-table";
import { Sidebar } from "@/components/layout/sidebar";
import { useSubscribers } from "../hook/subscribers.hook";
import { subscriberColumns } from "./subscriber.column";
import { ModuleHeader } from "@/components/shared/module-header";

export function SubscribersPage() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("all");
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { data, isLoading } = useSubscribers();

  const processedData = (data?.items ?? []).filter(
    ({ email, status: subscriberStatus, subscribedAt }) => {
      const matchesSearch = email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        !status || status === "all" || subscriberStatus === status;
      const matchesDate = !date || subscribedAt?.startsWith(date);
      return matchesSearch && matchesStatus && matchesDate;
    },
  );

  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <ModuleHeader
          eyebrow="Audience"
          title="Subscribers"
          description="Manage your subscribers, their plans, and subscription status."
        >
          <AppButton variant="secondary">
            <Download size={19} /> Export
          </AppButton>
        </ModuleHeader>

        <CommonTableFilters
          status
          statusValue={status}
          statusOptions={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Unsubscribed", value: "unsubscribed" },
          ]}
          onStatusChange={(value) => {
            setStatus(value);
            setPagination((current) => ({ ...current, page: 1 }));
          }}
          search
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPagination((current) => ({ ...current, page: 1 }));
          }}
          date
          dateValue={date}
          onDateChange={(value) => {
            setDate(value);
            setPagination((current) => ({ ...current, page: 1 }));
          }}
          className="mb-4"
        />

        <section className="rounded-lg">
          <GlobalTable
            data={processedData}
            columns={subscriberColumns}
            loading={isLoading}
            totalCount={processedData.length}
            currentPage={pagination.page}
            pageSize={pagination.limit}
            onPageChange={(page) =>
              setPagination((current) => ({ ...current, page }))
            }
            onPageSizeChange={(limit) => setPagination({ limit, page: 1 })}
            filters={[]}
          />
        </section>
      </main>
    </div>
  );
}

export default SubscribersPage;
