"use client";

import { ImagePlus, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AppButton } from "@/components/shared/app-button";
import { FormInput } from "@/components/shared/custom-input-text";
import { blogSchema, type BlogFormValues } from "../schema/blog.schema";

export function NewBlogForm({
  onCanSaveChange,
}: {
  onCanSaveChange?: (canSave: boolean) => void;
}) {
  const { control, handleSubmit } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      author: "",
      category: "",
      publishDate: "",
      seoTitle: "",
      seoMetaTags: "",
      canonicalUrl: "",
      seoDescription: "",
    },
    mode: "onBlur",
  });
  const values = useWatch({ control });
  const hasValue = Object.values(values).some(
    (value) => String(value ?? "").trim().length > 0,
  );

  useEffect(() => {
    onCanSaveChange?.(hasValue);
  }, [hasValue, onCanSaveChange]);

  const saveDraft = (values: BlogFormValues) => {
    console.log("Blog draft submitted", values);
  };

  return (
    <form
      id="new-blog-form"
      className="space-y-5"
      onSubmit={handleSubmit(saveDraft)}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-xl border border-line bg-panel p-5 shadow-panel">
          <h2 className="mb-4 font-semibold text-ink">Content information</h2>
          <div className="grid gap-4">
            <FormInput
              name="title"
              label="Title"
              control={control}
              placeholder="Enter blog title"
              required
            />
            <FormInput
              name="slug"
              label="Slug"
              control={control}
              placeholder="blog-title-slug"
              required
            />
            <FormInput
              name="summary"
              label="Summary"
              control={control}
              textarea
              className="min-h-24"
              placeholder="Briefly summarize the blog post..."
            />
            <FormInput
              name="content"
              label="Content"
              control={control}
              textarea
              className="min-h-[300px]"
              placeholder="Write your blog content here..."
              required
            />
          </div>
          <div className="mt-5 border-t border-line pt-4">
            <h3 className="text-sm font-semibold text-ink">
              Dynamic blog blocks
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <AppButton variant="secondary" type="button" size="sm">
                <Plus size={14} /> Product card
              </AppButton>
              <AppButton variant="secondary" type="button" size="sm">
                <Plus size={14} /> CTA banner
              </AppButton>
              <AppButton variant="secondary" type="button" size="sm">
                <Plus size={14} /> FAQ block
              </AppButton>
            </div>
          </div>
        </section>
        <section className="rounded-xl border border-line bg-panel p-5 shadow-panel">
          <h2 className="mb-4 font-semibold text-ink">Publishing & details</h2>
          <button
            type="button"
            className="mb-5 grid min-h-40 w-full place-items-center rounded-lg border border-dashed border-line bg-paper text-sm text-muted-foreground hover:border-teal hover:text-teal"
          >
            <ImagePlus size={24} />
            <span>Upload header image</span>
          </button>
          <div className="grid gap-4">
            <FormInput
              name="author"
              label="Author"
              control={control}
              placeholder="Enter author name"
              required
            />
            <FormInput
              name="category"
              label="Category"
              control={control}
              placeholder="Select category"
              required
            />
            <FormInput
              name="publishDate"
              label="Publish date"
              control={control}
              type="date"
            />
          </div>
        </section>
      </div>
      <section className="rounded-xl border border-line bg-panel p-5 shadow-panel">
        <h2 className="mb-4 font-semibold text-ink">SEO settings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            name="seoTitle"
            label="SEO title"
            control={control}
            className="md:col-span-2"
            placeholder="SEO title"
          />
          <FormInput
            name="seoMetaTags"
            label="SEO meta tags"
            control={control}
            placeholder="keywords, tag1, tag2"
          />
          <FormInput
            name="canonicalUrl"
            label="Canonical URL"
            control={control}
            placeholder="https://example.com/blog/slug"
          />
          <FormInput
            name="seoDescription"
            label="SEO description"
            control={control}
            textarea
            className="md:col-span-2"
            placeholder="Brief description for search results..."
          />
        </div>
      </section>
    </form>
  );
}
