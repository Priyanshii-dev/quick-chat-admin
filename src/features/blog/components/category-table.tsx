"use client";

import { useMemo, useState } from "react";
import { CommonTableFilters } from "@/components/shared/table/common-table-filters";
import { GlobalTable } from "@/components/shared/table/global-table";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/shared/app-button";
import { useBlogPosts } from "../hook/blog.hook";
import { getCategoryColumns, type BlogCategory } from "./category-columns";

const categories: BlogCategory[] = [
  {
    name: "Hair Care",
    slug: "hair-care",
    updatedAt: "19 Jun 2026",
    status: "Active",
  },
];

export function CategoryTable() {
  const { data, isLoading } = useBlogPosts();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletedSlugs, setDeletedSlugs] = useState<string[]>([]);
  const [editedCategories, setEditedCategories] = useState<
    Record<string, BlogCategory>
  >({});
  const [editTarget, setEditTarget] = useState<BlogCategory | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BlogCategory | null>(null);
  const rows = useMemo(() => {
    const source = data?.items?.length
      ? data.items.map((post) => ({
          name: post.category ?? "Uncategorized",
          slug:
            post.category?.toLowerCase().replace(/\s+/g, "-") ??
            "uncategorized",
          updatedAt: post.updatedAt,
          status: post.status === "Draft" ? "Inactive" : "Active",
        }))
      : categories;
    return source
      .map((category) => editedCategories[category.slug] ?? category)
      .filter(
        (category) =>
          !deletedSlugs.includes(category.slug) &&
          `${category.name} ${category.slug}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "all" || category.status.toLowerCase() === status),
      );
  }, [data, query, status, deletedSlugs, editedCategories]);
  const columns = getCategoryColumns({
    onEdit: (category) => {
      setEditTarget(category);
      setEditName(category.name);
    },
    onDelete: setDeleteTarget,
  });

  return (
    <section>
      <CommonTableFilters
        search
        searchValue={query}
        onSearchChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        status
        statusValue={status}
        statusOptions={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
        onStatusChange={(value) => {
          setStatus(value || "all");
          setPage(1);
        }}
        className="mb-4"
      />
      <GlobalTable
        data={rows}
        columns={columns}
        totalCount={rows.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        loading={isLoading}
      />
      <Dialog
        open={editTarget !== null}
        onOpenChange={(open) => !open && setEditTarget(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>
              Update the category name and save your changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <label htmlFor="category-name" className="text-sm font-semibold">
              Category name
            </label>
            <Input
              id="category-name"
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <AppButton variant="secondary" onClick={() => setEditTarget(null)}>
              Cancel
            </AppButton>
            <AppButton
              variant="primary"
              disabled={!editName.trim()}
              onClick={() => {
                if (!editTarget) return;
                const updated = {
                  ...editTarget,
                  name: editName.trim(),
                  slug: editName.trim().toLowerCase().replace(/\s+/g, "-"),
                };
                setEditedCategories((current) => ({
                  ...current,
                  [editTarget.slug]: updated,
                }));
                setEditTarget(null);
              }}
            >
              Save changes
            </AppButton>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete category"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"?`
            : undefined
        }
        onConfirm={() => {
          if (deleteTarget)
            setDeletedSlugs((current) => [...current, deleteTarget.slug]);
          setDeleteTarget(null);
        }}
      />
    </section>
  );
}
