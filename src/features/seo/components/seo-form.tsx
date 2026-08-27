"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seoSchema, SeoFormValues } from "../schema/seo.schema";
import { seoService } from "../services/seo.service";
import { FormCardLayout } from "@/components/shared/form-card-layout";
import { SearchableSelect } from "@/components/ui/searchable-select";
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      pageUrl: "/",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      robots: "index, follow",
      status: "Active",
    },
  });

  const robotsValue = watch("robots");
  const statusValue = watch("status");

  const robotsOptions = [
    { label: "index, follow (Recommended)", value: "index, follow" },
    { label: "noindex, follow", value: "noindex, follow" },
    { label: "noindex, nofollow", value: "noindex, nofollow" },
  ];

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Pending", value: "Pending" },
    { label: "Draft", value: "Draft" },
  ];

  const onSubmit = async (data: SeoFormValues) => {
    try {
      setSubmitting(true);
      await seoService.createSeo(data);
      toast.success("SEO details saved successfully!");
      router.push("/seo");
    } catch (err) {
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
        {/* Page URL */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            PAGE ROUTE / PATH <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("pageUrl")}
            placeholder="e.g. /about-us or /blog/my-article"
            className="bg-background font-mono text-xs h-10 rounded-md border-border"
          />
          {errors.pageUrl && (
            <p className="text-xs text-destructive">{errors.pageUrl.message}</p>
          )}
        </div>

        {/* Meta Title */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            META TITLE TAG <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("metaTitle")}
            placeholder="e.g. QuietChat - Anonymous 1-on-1 Live Chat"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
          {errors.metaTitle && (
            <p className="text-xs text-destructive">{errors.metaTitle.message}</p>
          )}
        </div>

        {/* Meta Description */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            META DESCRIPTION <span className="text-destructive">*</span>
          </label>
          <Textarea
            {...register("metaDescription")}
            placeholder="Provide a compelling 150-character summary for Google search results..."
            rows={3}
            className="bg-background text-xs rounded-md border-border"
          />
          {errors.metaDescription && (
            <p className="text-xs text-destructive">
              {errors.metaDescription.message}
            </p>
          )}
        </div>

        {/* Keywords */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-foreground">
            FOCUS KEYWORDS (COMMA SEPARATED)
          </label>
          <Input
            {...register("keywords")}
            placeholder="e.g. live chat, private messaging, anonymous app"
            className="bg-background text-xs h-10 rounded-md border-border"
          />
        </div>

        {/* Robots Searchable Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">ROBOTS DIRECTIVES</label>
          <SearchableSelect
            options={robotsOptions}
            value={robotsValue || "index, follow"}
            onChange={(val) => setValue("robots", val)}
            placeholder="Select robots policy..."
          />
        </div>

        {/* Status Searchable Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">RECORD STATUS</label>
          <SearchableSelect
            options={statusOptions}
            value={statusValue || "Active"}
            onChange={(val) => setValue("status", val as any)}
            placeholder="Select status..."
          />
        </div>
      </div>
    </FormCardLayout>
  );
}
