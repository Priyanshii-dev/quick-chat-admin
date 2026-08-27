export type BlogStatus = "Published" | "Draft" | "Archived";

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  blogCount?: number;
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  author?: string;
  category?: string;
  categoryId?: string;
  status: BlogStatus;
  imageUrl?: string;
  updatedAt: string;
  createdAt?: string;
  views: number;
  readTime?: string;
}

export interface BlogListResponse {
  items: BlogPost[];
  total: number;
}

export interface BlogCategoryListResponse {
  items: BlogCategory[];
  total: number;
}
