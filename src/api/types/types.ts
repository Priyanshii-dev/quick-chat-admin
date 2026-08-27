import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  totalCount: number;
  page: number | string;
  limit: number | string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  response?: {
    status?: number;
    data?: {
      message?: string;
      error?: {
        message?: string;
      };
    };
  };
}

export interface UsePostDataProps<TData, TVariables> {
  url: string;
  useFormData?: boolean;
  showToast?: boolean;
  mutationOptions?: UseMutationOptions<TData, ApiError, TVariables>;
  headers?: Record<string, string>;
  refetchQueries?: string[];
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
  customCompanyId?: string;
  customGroupId?: string;
  sendPayloadInQueryParam?: boolean;
  useCompanyAsToken?: string;
}

export interface UseFetchDetailsProps<T> {
  url: string;
  id?: string | number;
  queryOptions?: Omit<UseQueryOptions<T, ApiError, T>, "queryKey" | "queryFn">;
  enabled?: boolean;
}

export interface UpdateDataParams<TPayload> {
  id?: string | number;
  payload: TPayload;
  headers?: Record<string, string>;
}

export interface VariablesWithId {
  id?: string | number;
}

export type QueryParamValue = string | number | boolean | null;
export type QueryParams = Partial<Record<string, QueryParamValue>>;
