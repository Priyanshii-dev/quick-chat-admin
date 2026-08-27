"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  blogCategorySchema,
  BlogCategoryFormValues,
} from "../schema/blog.schema";
import { blogService } from "../services/blog.service";
import { BlogCategory } from "../types/types";
import { getCategoryColumns } from "./category-columns";
import { GlobalTable } from "@/components/table/global-table";
import { DateRangeValue } from "@/components/table/date-range";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploadDropzone } from "@/components/shared/image-upload-dropzone";
import { toast } from "sonner";
import { Folder, Plus, X } from "lucide-react";

export function CategoryTable() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(blogCategorySchema),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await blogService.getCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cat?: BlogCategory) => {
    if (cat) {
      setEditingCategory(cat);
      reset({
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        iconUrl: cat.iconUrl || "",
        imageUrl: cat.imageUrl || "",
      });
    } else {
      setEditingCategory(null);
      reset({ name: "", slug: "", description: "", iconUrl: "", imageUrl: "" });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data: BlogCategoryFormValues) => {
    try {
      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? {
                  ...c,
                  ...data,
                  updatedAt: new Date().toISOString().split("T")[0],
                }
              : c,
          ),
        );
        toast.success("Category updated!");
      } else {
        const newCat: BlogCategory = {
          id: String(Date.now()),
          ...data,
          blogCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
          status: "Active",
        };
        setCategories((prev) => [newCat, ...prev]);
        toast.success("Category added!");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to save category");
    }
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category removed!");
  };

  const filteredCategories = categories.filter((c) => {
    const normalizedSearch = searchQuery.toLowerCase();
    const updatedDate = c.updatedAt || c.createdAt || "";
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(normalizedSearch) ||
      c.slug.toLowerCase().includes(normalizedSearch);
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesFromDate = !dateRange.from || updatedDate >= dateRange.from;
    const matchesToDate = !dateRange.to || updatedDate <= dateRange.to;

    return matchesSearch && matchesStatus && matchesFromDate && matchesToDate;
  });

  const columns = getCategoryColumns(handleOpenModal, handleDelete);

  return (
    <div className="space-y-4">
      <GlobalTable
        icon={<Folder className="h-5 w-5" />}
        title="Blog Categories"
        description="Organize blog posts into structured topics and tags."
        breadcrumbs={[{ label: "Blog Management" }, { label: "Categories" }]}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search category name..."
        showStatusFilter={true}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={[
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ]}
        showDateRange={true}
        dateRangeValue={dateRange}
        onDateRangeChange={setDateRange}
        primaryAction={{
          label: "Add Category",
          onClick: () => handleOpenModal(),
          icon: <Plus className="h-4 w-4" />,
        }}
        secondaryAction={{
          label: "Refresh",
          onClick: fetchCategories,
        }}
        columns={columns}
        data={filteredCategories}
        loading={loading}
        emptyMessage="No categories found."
      />

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-bold text-foreground">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-foreground">
                  Category Name <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("name")}
                  placeholder="e.g. Artificial Intelligence"
                  onChange={(e) => {
                    register("name").onChange(e);
                    const slug = e.target.value
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/[\s_-]+/g, "-");
                    setValue("slug", slug, { shouldValidate: true });
                  }}
                  className="bg-background text-xs h-10 rounded-md border-border"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ImageUploadDropzone
                  label="Category Icon"
                  acceptText="Upload Icon (PNG, SVG)"
                  value={watch("iconUrl")}
                  onChange={(url) => setValue("iconUrl", url)}
                />
                <ImageUploadDropzone
                  label="Category Image"
                  acceptText="Upload Image (JPG, PNG)"
                  value={watch("imageUrl")}
                  onChange={(url) => setValue("imageUrl", url)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-foreground">
                  Slug <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("slug")}
                  placeholder="e.g. artificial-intelligence"
                  className="bg-background font-mono text-xs h-10 rounded-md border-border"
                />
                {errors.slug && (
                  <p className="text-xs text-destructive">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-foreground">
                  Description
                </label>
                <Input
                  {...register("description")}
                  placeholder="Short description of topics covered"
                  className="bg-background text-xs h-10 rounded-md border-border"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground font-semibold"
                >
                  {editingCategory ? "Update" : "Create"} Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
