import { SeoSettingsForm } from "./seo-settings-form";

type EditSeoProps = {
  onSuccess?: () => void;
};

export function EditSeo({ onSuccess }: EditSeoProps) {
  return <SeoSettingsForm mode="edit" hideHeader onSuccess={onSuccess} />;
}
