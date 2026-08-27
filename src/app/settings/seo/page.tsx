"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { AppButton } from "@/components/shared/app-button";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { ModuleHeader } from "@/components/shared/module-header";
import { TableActions } from "@/components/shared/table/table-actions";
import { CommonTableFilters } from "@/components/shared/table/common-table-filters";
import { GlobalTable } from "@/components/shared/table/global-table";
import type { TableColumn } from "@/components/shared/table/types/types";
import type { FormMode } from "@/components/shared/form-mode";
import { useSiteSettings } from "@/features/settings/components/seo-settings/hook/seo.hook";

type SeoRow = {
  pageName: string;
  title: string;
  seoUrl: string;
  canonicalUrl: string;
  slug: string;
};

export default function SeoSettingsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();
  const { data: settings, isLoading } = useSiteSettings();
  const rows = useMemo<SeoRow[]>(() => {
    if (isDeleted) return [];
    if (!settings) return [];

    return [
      {
        pageName: settings.siteName,
        title: settings.defaultTitle,
        seoUrl: settings.siteUrl,
        canonicalUrl: settings.siteUrl,
        slug:
          settings.siteUrl
            .replace(/^https?:\/\/[^/]+\/?/, "")
            .replace(/\/$/, "") || "home",
      },
    ];
  }, [isDeleted, settings]);

  const openSeoPage = (mode: Extract<FormMode, "edit" | "view">) => {
    router.push(`/settings/seo/${mode}`);
  };

  const filteredRows = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return rows;

    return rows.filter((row) => {
      return (
        row.pageName.toLowerCase().includes(value) ||
        row.title.toLowerCase().includes(value) ||
        row.slug.toLowerCase().includes(value)
      );
    });
  }, [rows, search]);

  const columns: TableColumn<SeoRow>[] = [
    {
      id: "srNo",
      header: "Sr No",
      cell: (_row, index) => <span className="font-medium">{index + 1}</span>,
    },
    {
      id: "pageName",
      header: "Page Name",
      cell: (row) => <span className="font-medium">{row.pageName}</span>,
    },
    {
      id: "title",
      header: "Title",
      cell: (row) => <span>{row.title}</span>,
    },
    {
      id: "url",
      header: "URL",
      cell: (row) => (
        <div className="space-y-2">
          <a
            href={row.seoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#0f5ed7] underline decoration-[1.5px] underline-offset-2"
          >
            {row.seoUrl}
          </a>
          <div className="text-[12px] font-medium text-muted-foreground">
            CANONICAL URL
          </div>
          <a
            href={row.canonicalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#0f5ed7] underline decoration-[1.5px] underline-offset-2"
          >
            {row.canonicalUrl}
          </a>
        </div>
      ),
    },
    {
      id: "slug",
      header: "slug",
      cell: (row) => <span>{row.slug}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <TableActions
          onView={() => openSeoPage("view")}
          onEdit={() => openSeoPage("edit")}
          onDelete={() => setIsDeleteDialogOpen(true)}
        />
      ),
    },
  ];

  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar />
      <main className="min-w-0 bg-[#f4f5f5] px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <ModuleHeader eyebrow="Search visibility" title="SEO Configuration">
          <div className="flex items-center gap-3 max-[680px]:mt-5">
            <AppButton
              variant="primary"
              className="gap-2"
              onClick={() => router.push("/settings/seo/create")}
            >
              <Plus size={16} /> Add SEO
            </AppButton>
          </div>
        </ModuleHeader>

        {/* <div className="mb-4 flex items-center justify-end">
          <AppButton variant="secondary" className="gap-2 whitespace-nowrap">
            <Download size={16} /> Export
          </AppButton>
        </div> */}

        <CommonTableFilters
          search
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          className="mb-4"
        />

        <GlobalTable
          data={filteredRows}
          columns={columns}
          totalCount={filteredRows.length}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          loading={isLoading}
        />
      </main>
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete SEO configuration"
        description="Are you sure you want to delete this SEO configuration?"
        onConfirm={() => {
          setIsDeleted(true);
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}
