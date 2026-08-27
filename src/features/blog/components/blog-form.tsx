"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema, BlogPostFormValues } from "../schema/blog.schema";
import { blogService } from "../services/blog.service";
import { FormCardLayout } from "@/components/shared/form-card-layout";
import { ImageUploadDropzone } from "@/components/shared/image-upload-dropzone";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText, Save, Sparkles } from "lucide-react";

export function BlogForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      categoryId: "1",
      description: "",
      content: "",
      status: "Draft",
      imageUrl: "",
      author: "Admin",
    },
  });

  const titleValue = watch("title");
  const categoryIdValue = watch("categoryId");
  const statusValue = watch("status");
  const imageUrlValue = watch("imageUrl");

  const generateSlug = () => {
    if (!titleValue) return;
    const slugified = titleValue
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", slugified, { shouldValidate: true });
  };

  const categoryOptions = [
    { label: "Technology", value: "1" },
    { label: "Tutorials", value: "2" },
    { label: "Updates", value: "3" },
    { label: "General & Product", value: "4" },
  ];

  const statusOptions = [
    { label: "Draft", value: "Draft" },
    { label: "Published", value: "Published" },
    { label: "Archived", value: "Archived" },
  ];

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setSubmitting(true);
      await blogService.createBlog(data);
      toast.success("Blog article created successfully!");
      router.push("/blog");
    } catch (err) {
      toast.error("Failed to create blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormCardLayout
      icon={<FileText className="h-5 w-5" />}
      title="Create New Blog Post"
      description="Fill in the details below to publish a new article for QuietChat."
      breadcrumbs={[
        { label: "Blog Management", href: "/blog" },
        { label: "Add Blog" },
      ]}
      backHref="/blog"
      onSubmit={handleSubmit(onSubmit)}
      footerActions={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/blog")}
            className="border-border text-xs font-semibold h-10 px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="gap-2 bg-primary text-primary-foreground font-bold px-6 h-10 hover:opacity-90 shadow-md"
          >
            <Save className="h-4 w-4" />
            {submitting ? "Saving..." : "Create Blog Post"}
          </Button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {/* Title Field */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            BLOG TITLE <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              {...register("title")}
              placeholder="Enter an engaging blog title..."
              className="bg-background text-xs h-10 rounded-md border-border"
            />
            <Button
              type="button"
              variant="outline"
              onClick={generateSlug}
              className="gap-1.5 whitespace-nowrap text-xs h-10 px-3.5 rounded-md border-border font-bold"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Auto Slug
            </Button>
          </div>
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Slug Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">
            URL SLUG <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("slug")}
            placeholder="e.g. 10-tips-for-scaling"
            className="bg-background text-xs font-mono h-10 rounded-md border-border"
          />
          {errors.slug && (
            <p className="text-xs text-destructive">{errors.slug.message}</p>
          )}
        </div>

        {/* Category Searchable Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">
            CATEGORY <span className="text-destructive">*</span>
          </label>
          <SearchableSelect
            options={categoryOptions}
            value={categoryIdValue}
            onChange={(val) => setValue("categoryId", val, { shouldValidate: true })}
            placeholder="Select blog category..."
          />
          {errors.categoryId && (
            <p className="text-xs text-destructive">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Author */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">AUTHOR</label>
          <Input
            {...register("author")}
            placeholder="Admin"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
        </div>

        {/* Status Searchable Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">PUBLISH STATUS</label>
          <SearchableSelect
            options={statusOptions}
            value={statusValue || "Draft"}
            onChange={(val) => setValue("status", val as any)}
            placeholder="Select status..."
          />
        </div>

        {/* Image Upload Dropzone Card */}
        <div className="md:col-span-2">
          <ImageUploadDropzone
            label="COVER IMAGE"
            acceptText="Upload Cover Image (JPG, PNG)"
            value={imageUrlValue}
            onChange={(url) => setValue("imageUrl", url)}
          />
        </div>

        {/* Short Summary */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">SHORT SUMMARY</label>
          <Textarea
            {...register("description")}
            placeholder="Provide a brief summary for blog listings..."
            rows={2}
            className="bg-background text-xs rounded-md border-border"
          />
        </div>

        {/* Full Content */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            FULL CONTENT <span className="text-destructive">*</span>
          </label>
          <Textarea
            {...register("content")}
            placeholder="Write your article content here..."
            rows={6}
            className="bg-background text-xs rounded-md border-border font-sans"
          />
          {errors.content && (
            <p className="text-xs text-destructive">{errors.content.message}</p>
          )}
        </div>
      </div>
    </FormCardLayout>
  );
}
