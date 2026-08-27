import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import instance from "../instance";

import { ApiError, ApiResponse, UsePostDataProps } from "../types/types";

const usePostData = <TData, TVariables>({
  useFormData = false,
  showToast = true,
  url,
  mutationOptions,
  headers = {},
  refetchQueries,
  onSuccess = () => {},
}: UsePostDataProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      const finalHeaders: Record<string, string> = {
        ...headers,
        ...(useFormData ? { "Content-Type": "multipart/form-data" } : {}),
      };

      let finalUrl = url;
      // Handle cases where ID might be passed in variables for a POST (less common but in reference)
      if (
        typeof variables === "object" &&
        variables !== null &&
        "id" in variables
      ) {
        const id = (variables as { id: string | number }).id;
        finalUrl = `${url}${encodeURIComponent(id)}`;
      }

      const response = await instance.post<ApiResponse<TData>>(
        finalUrl,
        variables,
        {
          headers: finalHeaders,
        },
      );

      if (response.data?.success) {
        const { code, message, data } = response.data;

        if (code === 200 || code === 201) {
          if (showToast) {
            toast.success(message || "Data posted successfully");
          }
          return data;
        }
      }

      throw new Error(response.data?.message || "Request failed.");
    },

    onSuccess: async (data: TData) => {
      if (refetchQueries) {
        await Promise.all(
          refetchQueries.map((queryKey) =>
            queryClient.refetchQueries({ queryKey: [queryKey] }),
          ),
        );
      }
      onSuccess(data);
    },
    ...mutationOptions,
  });
};

export default usePostData;
