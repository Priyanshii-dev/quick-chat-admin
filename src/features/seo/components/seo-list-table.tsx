"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { seoService } from "../services/seo.service";
import { SeoMeta } from "../types/seo.types";
import { getSeoColumns } from "./seo-columns";
import { GlobalTable } from "@/components/table/global-table";
import { useSeoStore } from "../store/seo.store";
import { toast } from "sonner";
import { Globe, Plus } from "lucide-react";

export function SeoListTable() {
  const router = useRouter();
  const [records, setRecords] = useState<SeoMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const { searchQuery, setSearchQuery } = useSeoStore();

  useEffect(() => {
    fetchSeo();
  }, []);

  async function fetchSeo() {
    try {
      setLoading(true);
      const data = await seoService.getSeoRecords();
      setRecords(data);
    } catch {
      toast.error("Failed to load SEO records");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await seoService.deleteSeo(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    toast.success("SEO entry deleted");
  };

  const handleEdit = (seo: SeoMeta) => {
    router.push(`/seo/add?id=${seo.id}`);
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      !searchQuery ||
      r.pageUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.metaTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const columns = getSeoColumns(handleEdit, handleDelete);

  return (
    <GlobalTable
      icon={<Globe className="h-5 w-5" />}
      title="SEO Management"
      description="Optimize page meta titles, descriptions, canonical URLs, and keywords."
      breadcrumbs={[{ label: "SEO Management" }, { label: "SEO List" }]}
      showSearch={true}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search page URL or meta title..."
      primaryAction={{
        label: "Add SEO Record",
        href: "/seo/add",
        icon: <Plus className="h-4 w-4" />,
      }}
      secondaryAction={{
        label: "Refresh",
        onClick: fetchSeo,
      }}
      columns={columns}
      data={filteredRecords}
      loading={loading}
      emptyMessage="No SEO records configured yet."
    />
  );
}
