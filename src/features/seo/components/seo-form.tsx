"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seoSchema, SeoFormValues } from "../schema/seo.schema";
import { seoService } from "../services/seo.service";
import { FormCardLayout } from "@/components/shared/form-card-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Globe, Save } from "lucide-react";

export function SeoForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      metaTags: "",
      keywords: "",
      canonicalUrl: "",
      ogUrl: "",
      metadata: "",
    },
  });

  const onSubmit = async (data: SeoFormValues) => {
    try {
      setSubmitting(true);
      await seoService.createSeo(data);
      toast.success("SEO details saved successfully!");
      router.push("/seo");
    } catch {
      toast.error("Failed to save SEO record");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormCardLayout
      icon={<Globe className="h-5 w-5" />}
      title="Add SEO Configuration"
      description="Configure search engine meta tags and search indexing for your pages."
      breadcrumbs={[
        { label: "SEO Management", href: "/seo" },
        { label: "Add SEO" },
      ]}
      backHref="/seo"
      onSubmit={handleSubmit(onSubmit)}
      footerActions={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/seo")}
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
            {submitting ? "Saving..." : "Save SEO Record"}
          </Button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {/* SEO Title */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            SEO TITLE <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("metaTitle")}
            placeholder="e.g. QuietChat - Anonymous 1-on-1 Live Chat"
            aria-invalid={Boolean(errors.metaTitle)}
            className="bg-background text-xs h-10 rounded-md"
          />
          {errors.metaTitle && (
            <p className="text-xs text-destructive font-medium">
              {errors.metaTitle.message}
            </p>
          )}
        </div>

        {/* SEO Description */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            SEO DESCRIPTION <span className="text-destructive">*</span>
          </label>
          <Textarea
            {...register("metaDescription")}
            placeholder="Provide a compelling 150-character summary for Google search results..."
            aria-invalid={Boolean(errors.metaDescription)}
            rows={3}
            className="bg-background text-xs rounded-md"
          />
          {errors.metaDescription && (
            <p className="text-xs text-destructive font-medium">
              {errors.metaDescription.message}
            </p>
          )}
        </div>

        {/* Meta Tags */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            SEO META TAGS
          </label>
          <Input
            {...register("metaTags")}
            placeholder="keywords, tag1, tag2"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
        </div>

        {/* Keywords */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            SEO KEYWORDS
          </label>
          <Input
            {...register("keywords")}
            placeholder="e.g. live chat, private messaging, anonymous app"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">
            CANONICAL URL
          </label>
          <Input
            {...register("canonicalUrl")}
            placeholder="https://example.com/blog/slug"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">OG URL</label>
          <Input
            {...register("ogUrl")}
            placeholder="https://example.com/og-image.png"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">METADATA</label>
          <Textarea
            {...register("metadata")}
            placeholder={
              'Optional JSON (example): {"canonical":"https://...","og_title":"..."}'
            }
            rows={3}
            className="bg-background text-xs rounded-md border-border"
          />
        </div>

      </div>
    </FormCardLayout>
  );
}
