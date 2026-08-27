"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardService } from "../services/dashboard.service";
import { StatCardItem, ActivityItem } from "../types/dashboard.types";
import { TablePageHeader } from "@/components/table/table-page-header";
import {
  BookOpen,
  Users,
  Mail,
  Globe,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  FileText,
  MessageSquare,
} from "lucide-react";

export function DashboardOverview() {
  const [stats, setStats] = useState<StatCardItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sData, aData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivity(),
      ]);
      setStats(sData);
      setActivities(aData);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "BookOpen":
        return <BookOpen className="h-5 w-5 text-primary" />;
      case "Users":
        return <Users className="h-5 w-5 text-primary" />;
      case "Mail":
        return <Mail className="h-5 w-5 text-primary" />;
      default:
        return <Globe className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <TablePageHeader
        title="Admin Dashboard"
        description="Overview of system metrics, content performance, and recent inquiries."
        breadcrumbs={[{ label: "Overview" }, { label: "Dashboard" }]}
      />

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {stat.title}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                {getIcon(stat.iconName)}
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-foreground">
                {stat.value}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Shortcuts & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Quick Management Actions */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-base font-bold text-foreground">Quick Feature Access</h3>
            <span className="text-xs text-muted-foreground">Module Shortcuts</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/blog/add"
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary">Add New Blog</span>
                  <p className="text-xs text-muted-foreground">Publish articles & news</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/seo/add"
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary">Add SEO Config</span>
                  <p className="text-xs text-muted-foreground">Meta tags & search indexing</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/hero"
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary">Hero Section</span>
                  <p className="text-xs text-muted-foreground">Main homepage banner</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/contact-us"
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary">Contact Requests</span>
                  <p className="text-xs text-muted-foreground">User messages & feedback</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Recent Activity Stream */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
            <span className="text-xs text-muted-foreground">Live Feed</span>
          </div>

          <div className="space-y-3">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-xs"
              >
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  •
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-foreground">{item.title}</span>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{item.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
