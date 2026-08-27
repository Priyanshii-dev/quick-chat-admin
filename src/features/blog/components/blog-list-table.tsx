"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalTable } from "@/components/shared/table/global-table";
import { CommonTableFilters } from "@/components/shared/table/common-table-filters";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlogPosts } from "../hook/blog.hook";
import type { BlogPost } from "../types/types";
import { getBlogColumns } from "./blog-columns";

const samplePosts: BlogPost[] = [
  {
    title: "7 Simple Habits for a Healthier Everyday Life",
    slug: "healthier-everyday-life-habits",
    description: "Discover 7 simple, practical habits for a healthier routine.",
    author: "Hisgro Wellness Editorial Team",
    category: "Hair Care",
    status: "Published",
    updatedAt: "12 Aug 2026",
    views: 7,
  },
  {
    title: "Hair Fall vs Hair Loss: Understanding the Difference",
    slug: "hair-fall-vs-hair-loss",
    description: "Understand the real difference and what your hair may need.",
    author: "HisGro Team",
    category: "Hair Growth",
    status: "Published",
    updatedAt: "6 Aug 2026",
    views: 171,
  },
  {
    title: "Best Daily Routine to Stop Hair Fall Naturally",
    slug: "best-daily-routine",
    description: "Discover the best daily routine for stronger-looking hair.",
    author: "HisGro Team",
    category: "Hair Supplements",
    status: "Published",
    updatedAt: "14 Aug 2026",
    views: 209,
  },
  {
    title: "Do Hair Fall Products Actually Work?",
    slug: "do-hair-fall-products-work",
    description: "Discover the truth about hair fall products.",
    author: "HisGro Hair Specialist",
    category: "Hair Growth",
    status: "Draft",
    updatedAt: "12 Aug 2026",
    views: 126,
  },
];

export function BlogTable() {
  const router = useRouter();
  const { data, isLoading } = useBlogPosts();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletedSlugs, setDeletedSlugs] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const posts = data?.items?.length ? data.items : samplePosts;
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (deletedSlugs.includes(post.slug)) return false;
        const matchesQuery = `${post.title} ${post.category} ${post.author}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesQuery &&
          (status === "all" || post.status.toLowerCase() === status)
        );
      }),
    [posts, query, status, deletedSlugs],
  );
  const columns = getBlogColumns({
    onView: setSelectedPost,
    onEdit: (post) =>
      router.push(`/blog/new?edit=${encodeURIComponent(post.slug)}`),
    onDelete: setDeleteTarget,
  });

  return (
    <section className="max-[680px]:p-0">
      <CommonTableFilters
        search
        searchValue={query}
        onSearchChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        status
        statusValue={status}
        statusOptions={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ]}
        onStatusChange={(value) => {
          setStatus(value || "all");
          setPage(1);
        }}
        className="mb-4"
      />
      <GlobalTable
        data={filteredPosts}
        totalCount={filteredPosts.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        loading={isLoading}
        columns={columns}
      />
      <Dialog
        open={selectedPost !== null}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              {selectedPost?.description ?? "No description available."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Author:</strong>{" "}
              {selectedPost?.author ?? "N/A"}
            </p>
            <p>
              <strong className="text-foreground">Category:</strong>{" "}
              {selectedPost?.category ?? "Uncategorized"}
            </p>
            <p>
              <strong className="text-foreground">Updated:</strong>{" "}
              {selectedPost?.updatedAt}
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete blog post"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"?`
            : undefined
        }
        onConfirm={() => {
          if (deleteTarget)
            setDeletedSlugs((current) => [...current, deleteTarget.slug]);
          setDeleteTarget(null);
        }}
      />
    </section>
  );
}
