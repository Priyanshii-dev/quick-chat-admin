import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import instance from "../instance";

import type { ApiResponse, UpdateDataParams } from "../types/types";

const usePutData = <TPayload, TData>({
  url,
  enabled = true,
  useFormData = false,
  refetchQueries,
  mutationOptions = {},
}: {
  url: string;
  enabled?: boolean;
  useFormData?: boolean;
  refetchQueries?: string[];
  mutationOptions?: UseMutationOptions<
    TData,
    Error,
    UpdateDataParams<TPayload>
  >;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<TData, Error, UpdateDataParams<TPayload>>({
    mutationFn: async (params) => {
      const { id, payload, headers = {} } = params;

      const finalUrl = id ? `${url}/${id}` : url;

      let requestPayload: TPayload | FormData = payload;
      if (useFormData && !(payload instanceof FormData)) {
        const formData = new FormData();
        Object.entries(payload as Record<string, unknown>).forEach(
          ([key, value]) => {
            if (value instanceof File) formData.append(key, value);
          },
        );
        requestPayload = formData;
      }

      const response = await instance.put<ApiResponse<TData>>(
        finalUrl,
        requestPayload,
        {
          headers: {
            ...headers,
            ...(useFormData ? { "Content-Type": "multipart/form-data" } : {}),
          },
        },
      );

      if (response.data?.success) {
        toast.success(response.data?.message || "Updated successfully.");
        if (refetchQueries) {
          await Promise.all(
            refetchQueries.map((queryKey) =>
              queryClient.refetchQueries({ queryKey: [queryKey] }),
            ),
          );
        }
        return response.data?.data as TData;
      }

      throw new Error(response.data?.message || "Failed to update resource.");
    },
    ...mutationOptions,
    retry: false,
  });

  if (!enabled) {
    const disabledMutate = (() => {}) as typeof mutation.mutate;
    const disabledMutateAsync = (() =>
      Promise.reject(
        new Error("Mutation is disabled"),
      )) as typeof mutation.mutateAsync;

    return {
      ...mutation,
      mutate: disabledMutate,
      mutateAsync: disabledMutateAsync,
      isPending: false,
      isSuccess: false,
      isError: false,
      data: mutation.data,
      error: mutation.error,
      reset: mutation.reset,
      status: "idle",
    } as typeof mutation;
  }

  return mutation;
};

export default usePutData;
