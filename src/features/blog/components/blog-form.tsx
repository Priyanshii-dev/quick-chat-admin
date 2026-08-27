"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema, BlogPostFormValues } from "../schema/blog.schema";
import { blogService } from "../services/blog.service";
import { FormCardLayout } from "@/components/shared/form-card-layout";
import { ImageUploadDropzone } from "@/components/shared/image-upload-dropzone";
import { CKEditorField } from "@/components/shared/ck-editor-field";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

const blockOptions = [
  "Product Card",
  "Kit Card",
  "Add Stage Tracker",
  "Add CTA Banner",
  "Add Free Hair Test",
  "Add Fact Check",
];
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
const doctorOptions = [
  { label: "Dr. Sarah Wilson", value: "sarah-wilson" },
  { label: "Dr. Michael Chen", value: "michael-chen" },
  { label: "Dr. Emily Davis", value: "emily-davis" },
];
const tagOptions = [
  { label: "Featured", value: "featured" },
  { label: "Hair Care", value: "hair-care" },
  { label: "Wellness", value: "wellness" },
];

export function BlogForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dynamicBlocks, setDynamicBlocks] = useState<string[]>([]);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const {
    register,
    control,
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
      authorProfileUrl: "",
      author: "Admin",
      doctorId: "",
      tag: "",
      engagement: 0,
      date: new Date().toISOString().split("T")[0],
      publishedAt: "",
      dynamicBlocks: [],
      faqs: [{ question: "", answer: "" }],
    },
  });
  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: "faqs",
  });
  const title = watch("title");
  const status = watch("status");
  const generateSlug = () =>
    setValue(
      "slug",
      (title || "")
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      { shouldValidate: true },
    );
  const addBlock = (block: string) => {
    const next = [...dynamicBlocks, block];
    setDynamicBlocks(next);
    setValue("dynamicBlocks", next);
  };
  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      setSubmitting(true);
      await blogService.createBlog(data);
      toast.success("Blog article created successfully!");
      router.push("/blog");
    } catch {
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
            className="h-10 px-4 text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="h-10 gap-2 bg-primary px-6 font-bold text-primary-foreground"
          >
            <Save className="h-4 w-4" />
            {submitting ? "Saving..." : "Create Blog Post"}
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_375px]">
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                {...register("title")}
                placeholder="Enter blog title"
                className="h-10 text-xs"
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold">
                Slug <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  {...register("slug")}
                  placeholder="blog-title-slug"
                  className="h-10 flex-1 font-mono text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateSlug}
                  title="Generate slug"
                  className="h-10 px-3"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
              {errors.slug && (
                <p className="text-xs text-destructive">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold">Summary (Optional)</label>
            <Textarea
              {...register("description")}
              placeholder="Brief summary of the blog post to show at the top..."
              rows={3}
              className="text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold">
              Content <span className="text-destructive">*</span>
            </label>
            <CKEditorField
              value={watch("content")}
              onChange={(value) =>
                setValue("content", value, { shouldValidate: true })
              }
            />
            {errors.content && (
              <p className="text-xs text-destructive">
                {errors.content.message}
              </p>
            )}
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-bold">Dynamic Blog Blocks</p>
            <p className="mb-3 text-xs text-muted-foreground">
              Add product, kit, stage tracker, CTA, and hair test blocks.
            </p>
            <div className="flex flex-wrap gap-2">
              {blockOptions.map((block) => (
                <Button
                  key={block}
                  type="button"
                  variant="outline"
                  onClick={() => addBlock(block)}
                  className="h-8 text-xs"
                >
                  + {block}
                </Button>
              ))}
            </div>
            {dynamicBlocks.length > 0 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Added: {dynamicBlocks.join(", ")}
              </p>
            )}
          </div>
          <section className="space-y-4">
            <h2 className="text-lg font-bold">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-3">
              {faqFields.map((field, index) => {
                const isOpen = openFaqs.includes(index);
                return (
                  <div
                    key={field.id}
                    className="overflow-hidden rounded-lg border border-border bg-background"
                  >
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqs((current) =>
                            isOpen
                              ? current.filter((item) => item !== index)
                              : [...current, index],
                          )
                        }
                        className="flex min-w-0 flex-1 items-center gap-3 text-left text-sm font-semibold"
                      >
                        <span className="truncate">
                          {watch(`faqs.${index}.question`) ||
                            `New FAQ ${index + 1}`}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          removeFaq(index);
                          setOpenFaqs((current) =>
                            current.filter((item) => item !== index),
                          );
                        }}
                        title="Delete FAQ"
                        className="h-8 w-8 shrink-0 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {isOpen && (
                      <div className="space-y-4 border-t border-border px-4 pb-5 pt-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold">
                            Question <span className="text-destructive">*</span>
                          </label>
                          <Input
                            {...register(`faqs.${index}.question`)}
                            placeholder="Enter question"
                            className="h-12 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold">
                            Answer <span className="text-destructive">*</span>
                          </label>
                          <Textarea
                            {...register(`faqs.${index}.answer`)}
                            placeholder="Enter answer"
                            rows={5}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                appendFaq({ question: "", answer: "" });
                setOpenFaqs((current) => [...current, faqFields.length]);
              }}
              className="h-11 w-full gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              Add FAQ
            </Button>
          </section>
        </div>
        <aside className="space-y-5">
          <ImageUploadDropzone
            label="Author Profile"
            value={watch("authorProfileUrl")}
            onChange={(url) => setValue("authorProfileUrl", url)}
            acceptText="Upload profile image"
            className="mx-auto max-w-[180px]"
          />
          <ImageUploadDropzone
            label="Featured Image"
            required
            value={watch("imageUrl")}
            onChange={(url) => setValue("imageUrl", url)}
            acceptText="Upload Header Image"
          />
          <div className="space-y-1.5">
            <label className="text-xs font-bold">
              Author <span className="text-destructive">*</span>
            </label>
            <Input
              {...register("author")}
              placeholder="Enter author name"
              className="h-10 text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold">
                Category <span className="text-destructive">*</span>
              </label>
              <SearchableSelect
                options={categoryOptions}
                value={watch("categoryId")}
                onChange={(value) =>
                  setValue("categoryId", value, { shouldValidate: true })
                }
                placeholder="Select Category"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold">Doctor</label>
              <SearchableSelect
                options={doctorOptions}
                value={watch("doctorId")}
                onChange={(value) => setValue("doctorId", value)}
                placeholder="Select Doctor"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold">Tag</label>
            <SearchableSelect
              options={tagOptions}
              value={watch("tag")}
              onChange={(value) => setValue("tag", value)}
              placeholder="Select Tag"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold">Published Status</label>
            <SearchableSelect
              options={statusOptions}
              value={status || "Draft"}
              onChange={(value) =>
                setValue("status", value as BlogPostFormValues["status"])
              }
              placeholder="Select status"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold">Published At</label>
            <Input
              {...register("publishedAt")}
              type="datetime-local"
              className="h-10 text-xs"
            />
          </div>
        </aside>
      </div>
    </FormCardLayout>
  );
}
