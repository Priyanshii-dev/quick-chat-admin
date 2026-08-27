import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin Panel | QuietChat & SEO Management",
  description:
    "Manage blog content, SEO metrics, subscribers, contact requests, and hero banners with dynamic themes and module architecture.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground font-sans font-medium">
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-quietchat"
          enableSystem={false}
          themes={["theme-quietchat", "dark", "theme-light"]}
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
