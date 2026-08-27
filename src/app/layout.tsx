import type { Metadata } from "next";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northstar Admin | SEO workspace",
  description:
    "Manage your site content, discovery, subscribers, and delivery settings.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-ui">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
