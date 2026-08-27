"use client";

import React, { useEffect, useState } from "react";
import { subscribersService } from "../services/subscribers.service";
import { Subscriber } from "../types/subscribers.types";
import { getSubscribersColumns } from "./subscribers-columns";
import { GlobalTable } from "@/components/table/global-table";
import { useSubscribersStore } from "../store/subscribers.store";
import { toast } from "sonner";
import { Download, Users } from "lucide-react";

export function SubscribersListTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const { searchQuery, setSearchQuery, selectedStatus, setSelectedStatus } =
    useSubscribersStore();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await subscribersService.getSubscribers();
      setSubscribers(data);
    } catch (err) {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await subscribersService.deleteSubscriber(id);
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    toast.success("Subscriber removed");
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Email,Source,Status,SubscribedAt"]
        .concat(
          subscribers.map(
            (s) =>
              `${s.email},${s.source || "Website"},${s.status},${s.subscribedAt}`,
          ),
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `subscribers-${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers CSV exported!");
  };

  const filteredSubscribers = subscribers.filter((s) => {
    const matchesSearch =
      !searchQuery || s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || s.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = getSubscribersColumns(handleDelete);

  const statusOptions = [
    { label: "Subscribed", value: "Subscribed" },
    { label: "Unsubscribed", value: "Unsubscribed" },
  ];

  return (
    <GlobalTable
      icon={<Users className="h-5 w-5" />}
      title="Email Subscribers"
      description="Manage newsletter subscribers and export email lists."
      breadcrumbs={[{ label: "Growth" }, { label: "Subscribers" }]}
      showSearch={true}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search subscriber email..."
      showStatusFilter={true}
      statusValue={selectedStatus}
      onStatusChange={setSelectedStatus}
      statusOptions={statusOptions}
      primaryAction={{
        label: "Export CSV",
        onClick: handleExportCSV,
        icon: <Download className="h-4 w-4" />,
      }}
      secondaryAction={{
        label: "Refresh",
        onClick: fetchSubscribers,
      }}
      columns={columns}
      data={filteredSubscribers}
      loading={loading}
      emptyMessage="No subscribers found."
    />
  );
}
