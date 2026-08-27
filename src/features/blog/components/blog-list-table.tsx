"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { blogService } from "../services/blog.service";
import { BlogPost } from "../types/types";
import { getBlogColumns } from "./blog-columns";
import { GlobalTable } from "@/components/table/global-table";
import { useBlogStore } from "../store/blog.store";
import { toast } from "sonner";
import { BookOpen, Plus } from "lucide-react";

export function BlogListTable() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    searchQuery,
    selectedCategory,
    selectedStatus,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStatus,
  } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getBlogs();
      setBlogs(data);
    } catch (err) {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog post deleted successfully");
    } catch (err) {
      toast.error("Failed to delete blog post");
    }
  };

  const handleToggleStatus = async (blog: BlogPost) => {
    const newStatus = blog.status === "Published" ? "Draft" : "Published";
    setBlogs((prev) =>
      prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleEdit = (blog: BlogPost) => {
    router.push(`/blog/add?id=${blog.id}`);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || blog.category === selectedCategory;

    const matchesStatus = !selectedStatus || blog.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const columns = getBlogColumns(handleEdit, handleDelete, handleToggleStatus);

  const categoryOptions = [
    { label: "Technology", value: "Technology" },
    { label: "Tutorials", value: "Tutorials" },
    { label: "Updates", value: "Updates" },
  ];

  const statusOptions = [
    { label: "Published", value: "Published" },
    { label: "Draft", value: "Draft" },
  ];

  return (
    <GlobalTable
      icon={<BookOpen className="h-5 w-5" />}
      title="Blog List"
      description="Manage your blog posts and their visibility."
      breadcrumbs={[{ label: "Blog Management" }, { label: "Blog List" }]}
      showSearch={true}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search by name or slug..."
      showCategoryFilter={true}
      categoryValue={selectedCategory}
      onCategoryChange={setSelectedCategory}
      categoryOptions={categoryOptions}
      showStatusFilter={true}
      statusValue={selectedStatus}
      onStatusChange={setSelectedStatus}
      statusOptions={statusOptions}
      primaryAction={{
        label: "Add Blog",
        href: "/blog/add",
        icon: <Plus className="h-4 w-4" />,
      }}
      secondaryAction={{
        label: "Refresh",
        onClick: fetchBlogs,
      }}
      columns={columns}
      data={filteredBlogs}
      loading={loading}
      emptyMessage="No blog posts found."
    />
  );
}
