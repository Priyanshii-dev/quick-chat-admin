"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Mail,
  Send,
  Image as ImageIcon,
  Share2,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { GeneralSettingsForm } from "./general-settings/components/general-settings-form";
import { SmtpSettingsForm } from "./smtp/components/smtp-settings-form";
import { LogoSettingsForm } from "./logo-settings/components/LogoSettingsForm";
import { SocialMediaSettingsForm } from "./social-media/components/social-media-settings-form";
import { SettingsPageProps } from "./types/types";

const settingsCards = [
  {
    title: "General Settings",
    description:
      "Manage website identity, email address, contact numbers, address, and bank details",
    href: "/settings/general-settings",
    icon: Settings,
    badge: "Core",
  },
  {
    title: "Email Templates",
    description:
      "Manage automated email notifications, newsletter layouts, and message designs",
    href: "/settings/email-templates",
    icon: Mail,
    badge: "Communication",
  },
  {
    title: "SMTP Configuration",
    description:
      "Setup outgoing mail server host, SMTP port, credentials, and send test mail",
    href: "/settings/smtp-settings",
    icon: Send,
    badge: "Mail Server",
  },
  {
    title: "Logo & Favicon",
    description:
      "Upload website main logo, dark mode branding, and browser favicon assets",
    href: "/settings/logo-settings",
    icon: ImageIcon,
    badge: "Branding",
  },
  {
    title: "Social Media Links",
    description:
      "Connect Instagram, Facebook, X / Twitter, YouTube, and LinkedIn profile URLs",
    href: "/settings/social-media",
    icon: Share2,
    badge: "Social",
  },
  {
    title: "Login History",
    description:
      "Review recent administrator login access, IP addresses, and security audit logs",
    href: "/settings/login-history",
    icon: ShieldCheck,
    badge: "Security",
  },
];

export function SettingsOverview() {
  const [search, setSearch] = useState("");

  const filteredCards = settingsCards.filter(
    (card) =>
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full space-y-7">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="h-3.5 w-3.5 opacity-50" />
        <span className="font-extrabold text-foreground">System Settings</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <SlidersHorizontal className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
              System Settings & Configuration
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Select a configuration module below to manage your website
              settings.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search settings by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-11 text-sm bg-card border-border rounded-xl font-medium shadow-xs"
          />
        </div>
      </div>

      {/* Settings Grid Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-primary hover:shadow-md no-underline"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 shadow-xs">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-extrabold text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary transition-colors">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm font-medium text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-sm font-extrabold text-primary">
                <span>Configure Settings</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsPage({ kind, mode = "edit" }: SettingsPageProps) {
  return (
    <div className="w-full">
      {kind === "general" ? <GeneralSettingsForm mode={mode} /> : null}
      {kind === "smtp" ? <SmtpSettingsForm mode={mode} /> : null}
      {kind === "branding" ? <LogoSettingsForm mode={mode} /> : null}
      {kind === "social" ? <SocialMediaSettingsForm mode={mode} /> : null}
    </div>
  );
}
