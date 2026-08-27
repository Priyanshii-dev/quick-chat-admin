export type ContentItem = {
  title: string;
  type: "Blog post" | "Page";
  status: "Published" | "Draft";
  updated: string | null;
  views: number;
};

export type QuickAction = { title: string; description: string; href: string };

export type DashboardSummary = {
  metrics: {
    organicSessions: number | null;
    organicSessionsChange: number | null;
    publishedContent: number;
    publishedContentChange: number | null;
    subscribers: number;
    subscribersChange: number | null;
    searchVisibility: number | null;
    searchVisibilityChange: number | null;
  };
  recentContent: ContentItem[];
  visibilityPulse: { values: number[]; from: string | null; to: string | null };
  health: Array<{ label: string; value: string; healthy: boolean }>;
  quickActions: QuickAction[];
};
