import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import instance from "../instance";

import type { ApiError, ApiResponse, QueryParams } from "../types/types";

/**
 * **Build Query String Helper**
 */

const EMPTY_PARAMS: QueryParams = {};

function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
}

/**
 * **useFetchData Hook**
 */
export function useFetchData<
  TData,
  TParams extends QueryParams = QueryParams,
  TQueryFnData = TData,
>({
  url,
  params,
  queryOptions = {},
  enabled = true,
  returnType = "data",
}: {
  url: string;
  params?: TParams;
  queryOptions?: Omit<
    UseQueryOptions<TQueryFnData, ApiError, TData>,
    "queryKey" | "queryFn"
  >;
  enabled?: boolean;
  returnType?: "data" | "full";
}) {
  const stableParams = (params ?? EMPTY_PARAMS) as TParams;

  return useQuery<TQueryFnData, ApiError, TData>({
    queryKey: [url, stableParams],
    queryFn: async (): Promise<TQueryFnData> => {
      const queryString = buildQueryString(stableParams);
      const fullUrl = `${url}${queryString}`;

      if (returnType === "full") {
        const response = await instance.get<TQueryFnData>(fullUrl);
        return response.data;
      }

      const response = await instance.get<ApiResponse<TData>>(fullUrl);
      return response.data.data as TData & TQueryFnData;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: enabled,
    staleTime: 0,
    ...queryOptions,
  });
}
