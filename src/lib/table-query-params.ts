export type TableQueryValues = {
  search?: string;
  status?: string;
  type?: string;
  page?: number;
  pageSize?: number;
};

export function readTableQueryValue(
  params: URLSearchParams,
  key: keyof TableQueryValues,
  fallback = "",
) {
  return params.get(key) ?? fallback;
}

export function readTableQueryNumber(
  params: URLSearchParams,
  key: "page" | "pageSize",
  fallback: number,
) {
  const value = Number(params.get(key));
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

export function createTableQueryUrl(
  pathname: string,
  currentParams: URLSearchParams,
  values: TableQueryValues,
) {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
