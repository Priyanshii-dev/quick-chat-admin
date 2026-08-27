export interface StatCardItem {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  iconName: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: "blog" | "subscriber" | "seo" | "contact";
}
