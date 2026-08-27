import type { ModuleKind } from "@/components/shared/module-page";
import type { FormMode } from "@/components/shared/form-mode";

export type SettingsPageProps = {
  title: string;
  eyebrow: string;
  description: string;
  kind: ModuleKind;
  mode?: FormMode;
};
