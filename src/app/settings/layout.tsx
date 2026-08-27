"use client";

import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
