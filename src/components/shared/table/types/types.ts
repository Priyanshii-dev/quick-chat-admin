export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface BaseFilter {
  key: string;
  label: string;
}

export interface SearchFilter extends BaseFilter {
  type: "search";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export interface SelectFilter extends BaseFilter {
  type: "select";
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string | null) => void;
  key: string;
  placeholder?: string;
}

export interface DateRangeFilter extends BaseFilter {
  type: "dateRange";
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
  placeholder?: string;
}

export interface MultiSelectFilter extends BaseFilter {
  type: "multiSelect";
  options: { label: string; value: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export type FilterConfig =
  SearchFilter | SelectFilter | DateRangeFilter | MultiSelectFilter;

export interface GlobalTableProps<TData> {
  data: TData[];
  columns: TableColumn<TData>[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  filters?: FilterConfig[];
  isPaginationEnabled?: boolean;
  loading?: boolean;
}

export interface TableColumn<TData> {
  id?: string;
  accessorKey?: keyof TData;
  header: React.ReactNode;
  cell?: (row: TData, index: number) => React.ReactNode;
}

export type FilterType = "search" | "select" | "date"; // etc

export interface Option {
  label: string;
  value: string;
}

export interface DataTableToolbarProps {
  filters?: FilterConfig[];
  className?: string;
}

export type FilterOption = { label: string; value: string };

export type CommonTableFiltersProps = {
  search?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  select?: boolean;
  selectValue?: string;
  selectOptions?: FilterOption[];
  onSelectChange?: (value: string) => void;
  selectLabel?: string;
  includeAllOption?: boolean;
  multiple?: boolean;
  multipleValue?: string[];
  multipleOptions?: FilterOption[];
  onMultipleChange?: (value: string[]) => void;
  date?: boolean;
  dateValue?: string;
  onDateChange?: (value: string) => void;
  status?: boolean;
  statusValue?: string;
  statusOptions?: FilterOption[];
  onStatusChange?: (value: string) => void;
  className?: string;
};
