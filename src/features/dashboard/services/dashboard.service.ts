import { StatCardItem, ActivityItem } from "../types/dashboard.types";

export const dashboardService = {
  getStats: async (): Promise<StatCardItem[]> => {
    return Promise.resolve([
      { title: "Total Blog Posts", value: "24", change: "+12.5%", trend: "up", iconName: "BookOpen" },
      { title: "Active Subscribers", value: "1,420", change: "+8.4%", trend: "up", iconName: "Users" },
      { title: "Contact Inquiries", value: "18", change: "+4.2%", trend: "up", iconName: "Mail" },
      { title: "SEO Pages Indexed", value: "98.2%", change: "+1.1%", trend: "up", iconName: "Globe" },
    ]);
  },
  getRecentActivity: async (): Promise<ActivityItem[]> => {
    return Promise.resolve([
      { id: "1", title: "New blog published: 'Introducing QuietChat Dark Yellow Theme'", timestamp: "10 minutes ago", type: "blog" },
      { id: "2", title: "New subscriber: priya.sharma@gmail.com joined newsletter", timestamp: "45 minutes ago", type: "subscriber" },
      { id: "3", title: "Contact inquiry received: 'Business Partnership & Ad Inquiry'", timestamp: "2 hours ago", type: "contact" },
      { id: "4", title: "SEO updated for path '/about-us'", timestamp: "1 day ago", type: "seo" },
    ]);
  },
};
