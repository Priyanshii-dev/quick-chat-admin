export type BlogStatus = "Published" | "Draft" | "Archived";

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  blogCount?: number;
  createdAt?: string;
  updatedAt?: string;
  iconUrl?: string;
  imageUrl?: string;
  status?: "Active" | "Inactive";
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
  authorProfileUrl?: string;
  doctorId?: string;
  tag?: string;
  publishedAt?: string;
  dynamicBlocks?: string[];
  faqs?: BlogFAQ[];
  updatedAt: string;
  createdAt?: string;
  views: number;
  engagement?: number;
  date?: string;
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
