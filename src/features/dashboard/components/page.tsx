"use client";

import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleHelp,
} from "lucide-react";
import { toast } from "sonner";
import { AppButton } from "@/components/shared/app-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboardSummary } from "../hook/dashboard.hook";

type MetricProps = {
  label: string;
  value: number | null;
  change: number | null;
  suffix?: string;
};

function Metric({ label, value, change, suffix = "" }: MetricProps) {
  return (
    <section className="col-span-3 min-h-[132px] rounded-lg border border-line bg-panel p-5 shadow-panel max-[1000px]:col-span-6 max-[680px]:col-span-12 max-[680px]:min-h-[110px]">
      <div className="text-[11px] font-bold tracking-[0.1em] text-muted uppercase">
        {label}
      </div>
      <div className="mt-4 text-[30px] font-bold max-[680px]:mt-2.5">
        {value === null ? "—" : `${value.toLocaleString()}${suffix}`}{" "}
        {change !== null && (
          <span className="float-right mt-5 text-xs font-bold text-teal">
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
    </section>
  );
}

export function Dashboard() {
  const { data, isLoading, isError } = useDashboardSummary();
  if (isLoading)
    return (
      <div className="rounded-lg border border-line bg-panel px-6 py-7 text-sm text-muted shadow-panel">
        Loading dashboard data...
      </div>
    );
  if (isError || !data)
    return (
      <div className="rounded-lg border border-line bg-panel px-6 py-7 text-sm text-muted shadow-panel">
        Unable to load dashboard data from the backend.
      </div>
    );

  return (
    <div className="grid grid-cols-12 gap-[18px]">
      <Metric
        label="Organic sessions"
        value={data.metrics.organicSessions}
        change={data.metrics.organicSessionsChange}
      />
      <Metric
        label="Published content"
        value={data.metrics.publishedContent}
        change={data.metrics.publishedContentChange}
      />
      <Metric
        label="Subscribers"
        value={data.metrics.subscribers}
        change={data.metrics.subscribersChange}
      />
      <Metric
        label="Search visibility"
        value={data.metrics.searchVisibility}
        change={data.metrics.searchVisibilityChange}
        suffix=" / 100"
      />
      <section className="col-span-8 rounded-lg border border-line bg-panel p-6 shadow-panel max-[1000px]:col-span-12">
        <div className="mb-[18px] flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[21px] font-bold">Recent content</h2>
            <span className="text-sm leading-6 text-muted">
              Latest records from the backend
            </span>
          </div>
          <AppButton
            variant="link"
            onClick={() => toast.info("Content library is ready")}
          >
            View all <ArrowUpRight size={14} />
          </AppButton>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.recentContent.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No content records found.</TableCell>
              </TableRow>
            ) : (
              data.recentContent.map((item) => (
                <TableRow key={`${item.title}-${item.updated}`}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2 py-1.5 text-[11px] font-bold text-teal before:size-1.5 before:rounded-full before:bg-current">
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.updated
                      ? new Date(item.updated).toLocaleString()
                      : "—"}
                  </TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
      <section className="col-span-4 rounded-lg border border-line bg-panel p-6 shadow-panel max-[1000px]:col-span-12">
        <div className="mb-[18px] flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[21px] font-bold">Quick actions</h2>
            <span className="text-sm leading-6 text-muted">
              Configured by the backend
            </span>
          </div>
          <CircleHelp size={18} color="var(--ink)" />
        </div>
        <div className="grid gap-2.5">
          {data.quickActions.length === 0 ? (
            <div className="text-sm leading-6 text-muted">
              No quick actions configured.
            </div>
          ) : (
            data.quickActions.map((action) => (
              <a
                className="flex items-center justify-between rounded-[7px] border border-line bg-white p-3.5 text-left no-underline hover:border-teal hover:bg-[#f6fbfa]"
                href={action.href}
                key={action.href}
              >
                <span>
                  <strong className="block text-sm font-bold">
                    {action.title}
                  </strong>
                  <span className="mt-1 block text-xs text-muted">
                    {action.description}
                  </span>
                </span>
                <ChevronRight size={17} color="var(--teal)" />
              </a>
            ))
          )}
        </div>
      </section>
      <section className="col-span-7 rounded-lg border border-line bg-panel p-6 shadow-panel max-[1000px]:col-span-12">
        <div className="mb-[18px] flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[21px] font-bold">Visibility pulse</h2>
            <span className="text-sm leading-6 text-muted">
              Analytics snapshot from the backend
            </span>
          </div>
          <BarChart3 size={20} color="var(--teal)" />
        </div>
        {data.visibilityPulse.values.length === 0 ? (
          <div className="py-7 text-sm text-muted">
            No analytics snapshot available.
          </div>
        ) : (
          <>
            <div className="flex h-[130px] items-end gap-[9px] px-[5px] pt-3">
              {data.visibilityPulse.values.map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className="min-h-1 flex-1 rounded-t bg-teal"
                  style={{ height }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex justify-between text-sm leading-6 text-muted">
              <span>
                {data.visibilityPulse.from
                  ? new Date(data.visibilityPulse.from).toLocaleDateString()
                  : "—"}
              </span>
              <span>
                {data.visibilityPulse.to
                  ? new Date(data.visibilityPulse.to).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </>
        )}
      </section>
      <section className="col-span-5 rounded-lg border border-line bg-panel p-6 shadow-panel max-[1000px]:col-span-12">
        <div className="mb-[18px] flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[21px] font-bold">System health</h2>
            <span className="text-sm leading-6 text-muted">
              Live backend checks
            </span>
          </div>
          <Check size={20} color="var(--teal)" />
        </div>
        {data.health.length === 0 ? (
          <div className="py-7 text-sm text-muted">
            No health checks available.
          </div>
        ) : (
          data.health.map((item) => (
            <div
              className="flex justify-between border-b border-line py-[13px] text-sm last:border-b-0"
              key={item.label}
            >
              <span>{item.label}</span>
              <span
                className={
                  item.healthy ? "font-bold text-teal" : "font-bold text-coral"
                }
              >
                {item.value}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
