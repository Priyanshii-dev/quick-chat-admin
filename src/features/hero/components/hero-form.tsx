"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSchema, HeroFormValues } from "../schema/hero.schema";
import { heroService } from "../services/hero.service";
import { HeroBanner } from "../types/hero.types";
import { TablePageHeader } from "@/components/table/table-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Sparkles, Smartphone } from "lucide-react";

export function HeroForm() {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      badgeText: "⚡ 1-on-1 Private Live Chat & Messaging",
      heading: "Never Feel Lonely. Find Your Perfect Chat Companion.",
      subheading:
        "Jump into 100% private, anonymous 1-on-1 conversations with verified partners 24/7. QuietChat is your ultimate judgment-free escape.",
      primaryCtaText: "GET IT ON Google Play",
      primaryCtaLink: "https://play.google.com",
      secondaryCtaText: "DOWNLOAD FOR iOS / Web App",
      secondaryCtaLink: "https://quietchat.in",
      imageUrl: "",
      isActive: true,
    },
  });

  const formValues = watch();

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      setLoading(true);
      const banners = await heroService.getHeroBanners();
      if (banners.length > 0) {
        reset(banners[0]);
      }
    } catch (err) {
      toast.error("Failed to load hero banner configuration");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: HeroFormValues) => {
    try {
      setSubmitting(true);
      await heroService.saveHeroBanner(data);
      toast.success("Hero section updated successfully!");
    } catch (err) {
      toast.error("Failed to update Hero section");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <TablePageHeader
        title="Hero Section Settings"
        description="Customize the main landing page hero headline, subtext, badges, and store CTA buttons."
        breadcrumbs={[{ label: "Website Settings" }, { label: "Hero Section" }]}
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form Fields */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-7 rounded-xl border border-border bg-card p-6 shadow-sm space-y-5"
        >
          <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
            Content & Calls to Action
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Eyebrow Badge Text
              </label>
              <Input
                {...register("badgeText")}
                placeholder="e.g. ⚡ 1-on-1 Private Live Chat"
                className="bg-background text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Main Headline <span className="text-destructive">*</span>
              </label>
              <Input
                {...register("heading")}
                placeholder="Enter hero headline..."
                aria-invalid={Boolean(errors.heading)}
                className="bg-background text-sm font-bold"
              />
              {errors.heading && (
                <p className="text-xs text-destructive font-medium">
                  {errors.heading.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Subheading Description{" "}
                <span className="text-destructive">*</span>
              </label>
              <Textarea
                {...register("subheading")}
                rows={3}
                placeholder="Enter detailed hero description..."
                aria-invalid={Boolean(errors.subheading)}
                className="bg-background text-sm"
              />
              {errors.subheading && (
                <p className="text-xs text-destructive">
                  {errors.subheading.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Primary Button Text{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("primaryCtaText")}
                  placeholder="GET IT ON Google Play"
                  className="bg-background text-sm font-semibold text-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Primary Button Link{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("primaryCtaLink")}
                  placeholder="https://..."
                  className="bg-background text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Secondary Button Text
                </label>
                <Input
                  {...register("secondaryCtaText")}
                  placeholder="DOWNLOAD FOR iOS / Web"
                  className="bg-background text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Secondary Button Link
                </label>
                <Input
                  {...register("secondaryCtaLink")}
                  placeholder="https://..."
                  className="bg-background text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                {...register("isActive")}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label
                htmlFor="isActive"
                className="text-xs font-semibold text-foreground cursor-pointer"
              >
                Publish Hero Section live on website
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2 bg-primary text-primary-foreground font-bold hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              {submitting ? "Saving..." : "Save Hero Changes"}
            </Button>
          </div>
        </form>

        {/* Live QuietChat Style Hero Preview */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-[#09090b] p-6 text-white shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/50 pb-3 mb-6">
              <span className="flex items-center gap-1.5 font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> QuietChat Live Preview
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                QuietChat Gold Theme
              </span>
            </div>

            {formValues.badgeText && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                {formValues.badgeText}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              {formValues.heading || "Hero Headline Here"}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              {formValues.subheading || "Hero subheading description text..."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2.5 text-xs font-extrabold text-black shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Smartphone className="h-4 w-4" />
                {formValues.primaryCtaText || "Primary CTA"}
              </button>

              {formValues.secondaryCtaText && (
                <button
                  type="button"
                  className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-xs font-bold text-white hover:bg-zinc-700 transition-all"
                >
                  {formValues.secondaryCtaText}
                </button>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-[11px] text-zinc-400 mt-6">
            💡 Changes saved here reflect instantly on the QuietChat landing
            page.
          </div>
        </div>
      </div>
    </div>
  );
}
