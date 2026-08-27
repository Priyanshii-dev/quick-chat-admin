import { BlogPost, BlogCategory } from "../types/types";

// Mock data for Blog Posts & Categories
const mockCategories: BlogCategory[] = [
  { id: "1", name: "Technology", slug: "technology", description: "Tech news, AI, and code updates", blogCount: 12, createdAt: "2026-01-10" },
  { id: "2", name: "Tutorials", slug: "tutorials", description: "Step by step guides and tips", blogCount: 8, createdAt: "2026-01-15" },
  { id: "3", name: "Updates", slug: "updates", description: "Product release announcements", blogCount: 5, createdAt: "2026-02-01" },
];

const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "10 Tips for Scaling Real-Time Chat Infrastructure",
    slug: "10-tips-scaling-chat-infrastructure",
    description: "Learn how to optimize WebSockets and redispub/sub for millions of active users.",
    content: "Full content of the blog article regarding real-time chat infrastructure...",
    author: "Deepak Sharma",
    category: "Technology",
    categoryId: "1",
    status: "Published",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    updatedAt: "2026-08-25",
    createdAt: "2026-08-20",
    views: 1420,
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Introducing QuietChat Dark Yellow Theme & Customization Options",
    slug: "introducing-quietchat-dark-yellow-theme",
    description: "Explore our sleek new gold accent dark UI theme designed for modern web apps.",
    content: "Full announcement detailing theme tokens, custom variables, and accessibility...",
    author: "Priyanshi",
    category: "Updates",
    categoryId: "3",
    status: "Published",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    updatedAt: "2026-08-26",
    createdAt: "2026-08-26",
    views: 890,
    readTime: "3 min",
  },
  {
    id: "3",
    title: "Mastering Next.js 16 App Router & Modular Architecture",
    slug: "mastering-nextjs-16-app-router",
    description: "A complete guide to organizing features with Zod schemas, Zustand stores, and services.",
    content: "Detailed walkthrough of modular Next.js development practices...",
    author: "Admin",
    category: "Tutorials",
    categoryId: "2",
    status: "Draft",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    updatedAt: "2026-08-27",
    createdAt: "2026-08-27",
    views: 120,
    readTime: "8 min",
  },
];

export const blogService = {
  getBlogs: async (): Promise<BlogPost[]> => {
    return Promise.resolve(mockBlogs);
  },
  getBlogById: async (id: string): Promise<BlogPost | undefined> => {
    return Promise.resolve(mockBlogs.find((b) => b.id === id));
  },
  getCategories: async (): Promise<BlogCategory[]> => {
    return Promise.resolve(mockCategories);
  },
  createBlog: async (blog: Partial<BlogPost>): Promise<BlogPost> => {
    const newBlog: BlogPost = {
      id: String(Date.now()),
      title: blog.title || "",
      slug: blog.slug || "",
      description: blog.description || "",
      content: blog.content || "",
      author: blog.author || "Admin",
      category: blog.category || "General",
      categoryId: blog.categoryId || "1",
      status: blog.status || "Draft",
      imageUrl: blog.imageUrl || "",
      updatedAt: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
      views: 0,
      readTime: "4 min",
    };
    mockBlogs.unshift(newBlog);
    return Promise.resolve(newBlog);
  },
  deleteBlog: async (id: string): Promise<boolean> => {
    const idx = mockBlogs.findIndex((b) => b.id === id);
    if (idx !== -1) {
      mockBlogs.splice(idx, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
};
