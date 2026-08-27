import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import instance from "../instance";

import type { ApiResponse, UpdateDataParams } from "../types/types";

const usePatchData = <TPayload, TData>({
  url,
  enabled = true,
  mutationOptions = {},
  showToast = true,
}: {
  url: string;
  enabled?: boolean;
  mutationOptions?: UseMutationOptions<
    TData,
    Error,
    TPayload | UpdateDataParams<TPayload>
  >;
  showToast?: boolean;
}) => {
  const mutation = useMutation<
    TData,
    Error,
    TPayload | UpdateDataParams<TPayload>
  >({
    mutationFn: async (variables) => {
      // Check if variables has the UpdateDataParams structure (with id, payload, headers)
      const isUpdateDataParams =
        typeof variables === "object" &&
        variables !== null &&
        "id" in variables &&
        "payload" in variables;

      let finalUrl = url;
      let finalPayload: TPayload;
      let finalHeaders: Record<string, string> = {};

      if (isUpdateDataParams) {
        const { id, payload, headers } =
          variables as UpdateDataParams<TPayload>;
        finalUrl = `${url}${String(id)}`;
        finalPayload = payload;
        finalHeaders = headers ?? {};
      } else {
        // Direct payload without id
        finalPayload = variables as TPayload;
      }

      const response = await instance.patch<ApiResponse<TData>>(
        finalUrl,
        finalPayload,
        {
          headers: finalHeaders,
        },
      );

      if (response.data?.success) {
        if (showToast) {
          toast.success(response.data?.message || "Updated successfully.");
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

export default usePatchData;
