import { useFetchData } from "../../../api/hooks/use-fetch-data";
import type { BlogListResponse } from "../types/types";
export function useBlogPosts() {
  return useFetchData<BlogListResponse>({ url: "/blog" });
}
