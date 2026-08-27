import { SeoSettingsForm } from "./seo-settings-form";

type DeleteSeoProps = {
  onDelete?: () => void;
};

export function DeleteSeo({ onDelete }: DeleteSeoProps) {
  return <SeoSettingsForm mode="delete" hideHeader onDelete={onDelete} />;
}
