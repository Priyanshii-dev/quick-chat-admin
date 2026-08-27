export type BlogPost = {
  title: string;
  slug: string;
  description?: string;
  author?: string;
  category?: string;
  status: "Published" | "Draft";
  updatedAt: string;
  views: number;
};
export type BlogListResponse = {
  items: BlogPost[];
  total: number;
};
