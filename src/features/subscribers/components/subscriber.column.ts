import { formatDateTime } from "@/lib/common-function";
import type { TableColumn } from "../../../components/shared/table/types/types";
import type { Subscriber } from "../types/types";

export const subscriberColumns: TableColumn<Subscriber>[] = [
  {
    id: "no",
    header: "Sr. No",
    cell: (_subscriber, index) => index + 1,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "subscribedAt",
    header: "Subscribed On",
    cell: (subscriber) => formatDateTime(subscriber.subscribedAt),
  },
];
