import type { TableColumn } from "@/components/shared/table/types/types";
import { TableActions } from "@/components/shared/table/table-actions";
import type { SeoRow } from "../types/types";

type SeoColumnActions = {
  onView: () => void;
  onEdit: () => void;
};

export function getSeoColumns({
  onView,
  onEdit,
}: SeoColumnActions): TableColumn<SeoRow>[] {
  return [
    {
      id: "srNo",
      header: "Sr No",
      cell: (_row, index) => <span className="font-medium">{index + 1}</span>,
    },
    {
      id: "pageName",
      header: "Page Name",
      cell: (row) => <span className="font-medium">{row.pageName}</span>,
    },
    {
      id: "title",
      header: "Title",
      cell: (row) => <span>{row.title}</span>,
    },
    {
      id: "url",
      header: "URL",
      cell: (row) => (
        <div className="space-y-2">
          <a
            href={row.seoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#0f5ed7] underline decoration-[1.5px] underline-offset-2"
          >
            {row.seoUrl}
          </a>
        </div>
      ),
    },
    {
      id: "slug",
      header: "slug",
      cell: (row) => <span>{row.slug}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => <TableActions onView={onView} onEdit={onEdit} />,
    },
  ];
}
