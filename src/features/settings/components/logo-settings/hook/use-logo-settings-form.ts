"use client";

import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { toast } from "sonner";

import {
  type LogoKey,
  useLogoSettings,
  useUpdateLogoSettings,
} from "../action/logo-settings.action";
import type { FormMode } from "@/components/shared/form-mode";

const fallbackPreviews: Partial<Record<LogoKey, string>> = {
  websiteFavicon: "/favicon.svg",
  metaFavicon: "/favicon.svg",
  appFavicon: "/favicon.svg",
};

export function useLogoSettingsForm(mode: FormMode) {
  const { data: savedLogos, isLoading: isLogosLoading } = useLogoSettings();
  const { mutateAsync: updateLogos, isPending: isSubmitting } =
    useUpdateLogoSettings();

  const [previews, setPreviews] =
    useState<Partial<Record<LogoKey, string>>>(fallbackPreviews);
  const [pendingFiles, setPendingFiles] = useState<
    Partial<Record<LogoKey, File>>
  >({});

  // Track which preview URLs we created, so we only revoke ones we own
  // (not the server-provided URLs from savedLogos).
  const objectUrls = useRef<Set<string>>(new Set());

  // Seed previews from fetched data once it arrives; don't stomp local edits.
  useEffect(() => {
    if (savedLogos) {
      startTransition(() => {
        setPreviews((current) => ({
          ...fallbackPreviews,
          ...savedLogos,
          ...current,
        }));
      });
    }
  }, [savedLogos]);

  // Revoke any blob URLs we created on unmount.
  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const selectFile = (key: LogoKey, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previous = previews[key];
    if (previous && objectUrls.current.has(previous)) {
      URL.revokeObjectURL(previous);
      objectUrls.current.delete(previous);
    }

    const preview = URL.createObjectURL(file);
    objectUrls.current.add(preview);

    setPreviews((current) => ({ ...current, [key]: preview }));
    setPendingFiles((current) => ({ ...current, [key]: file }));
  };

  const isDirty = Object.keys(pendingFiles).length > 0;
  const isReadOnly = mode !== "edit";

  const saveSettings = async () => {
    if (!isDirty) return;
    try {
      const saved = await updateLogos({ payload: pendingFiles });
      toast.success("Logo settings saved");
      setPendingFiles({});
      if (saved) {
        setPreviews((current) => ({ ...current, ...saved }));
      }
    } catch (err) {
      toast.error("Couldn't save logo settings", {
        description: "Please try again.",
      });
    }
  };

  return {
    previews,
    selectFile,
    saveSettings,
    isReadOnly,
    isDirty,
    isSubmitting,
    isLogosLoading,
  };
}
