"use client";

import { Edit3, Eye, Mail, Send, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/shared/app-button";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import { FormModeActions, type FormMode } from "@/components/shared/form-mode";
import { RequiredAsterisk } from "@/components/shared/required-assert-risk";
import { useSmtpSettingsForm } from "../hook/use-smtp-settings-form";

type SmtpSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function SmtpSettingsForm({
  mode = "edit",
  onDelete,
}: SmtpSettingsFormProps) {
  const router = useRouter();
  const {
    control,
    register,
    handleSave,
    handleSendTestEmail,
    isReadOnly,
    isSendingTest,
  } = useSmtpSettingsForm(mode);

  return (
    <>
      <ModuleHeader eyebrow="Email" title="SMTP Settings">
        <div className="flex items-center gap-2">
          {isReadOnly ? (
            <AppButton
              variant="primary"
              type="button"
              onClick={() => router.push("/settings/smtp-settings")}
            >
              <Edit3 size={15} /> Edit
            </AppButton>
          ) : null}
        </div>
      </ModuleHeader>

      <form noValidate className="grid gap-[18px]" onSubmit={handleSave}>
        <fieldset
          disabled={isReadOnly}
          className="grid gap-[18px] border-0 p-0"
        >
          <section className="rounded-lg border border-line bg-panel p-[22px] shadow-panel [&_h2]:mb-6 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 [&_h2]:text-sm [&_h2]:font-bold">
            <h2>
              <Settings size={18} /> SMTP Configuration
            </h2>
            <div className="grid grid-cols-4 items-end gap-x-[22px] gap-y-[18px] max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
              <FormInput
                name="host"
                label="SMTP Host"
                control={control}
                required
              />
              <FormInput
                name="port"
                label="SMTP Port"
                control={control}
                type="number"
                required
              />
              <FormInput
                name="username"
                label="SMTP Username"
                control={control}
                required
              />
              <FormInput
                name="password"
                label="SMTP Password"
                control={control}
                type="password"
              />
              <label className="grid">
                <span className="text-sm leading-6 text-muted">
                  Encryption
                  <RequiredAsterisk />
                </span>
                <select
                  className="mt-2 block w-full rounded-md border border-line bg-[#fbfcfc] p-3 text-sm text-ink outline-none focus:border-teal focus:ring-3 focus:ring-teal-soft"
                  {...register("encryption")}
                >
                  <option value="SSL">SSL</option>
                  <option value="TLS">TLS</option>
                  <option value="None">None</option>
                </select>
              </label>
              <FormInput
                name="fromEmail"
                label="From Email"
                control={control}
                required
              />
              <FormInput
                name="fromName"
                label="From Name"
                control={control}
                required
              />
              <FormInput
                name="fromCc"
                label="From CC"
                control={control}
                placeholder="From CC"
              />
              <FormInput
                name="fromBcc"
                label="From BCC"
                control={control}
                placeholder="From BCC"
              />
              <label className="grid gap-2">
                <span className="flex items-center gap-2 text-[13px] [&>input]:h-[14px] [&>input]:w-[22px] [&>input]:accent-teal">
                  <span>No</span>
                  <input type="checkbox" {...register("enabled")} />
                  <span>Yes</span>
                </span>
                <span className="text-sm leading-6 text-muted">
                  Enable to start using SMTP for sending emails
                </span>
              </label>
            </div>
          </section>

          <section className="grid grid-cols-[215px_minmax(0,1fr)] gap-[18px] rounded-lg border border-line bg-panel p-[22px] shadow-panel max-[1000px]:grid-cols-1 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 [&_h2]:text-sm [&_h2]:font-bold">
            <div className="grid content-start gap-[18px] rounded-[7px] border border-line p-4">
              <h2>
                <Mail size={18} /> Test Email
              </h2>
              <FormInput
                name="testEmail"
                label="Test Email Address"
                control={control}
                type="email"
                placeholder="test@example.com"
              />
              <FormInput
                name="content"
                label="Content"
                control={control}
                textarea
                rows={6}
                placeholder="Enter email content"
              />
              <AppButton
                variant="primary"
                type="button"
                onClick={handleSendTestEmail}
                disabled={isSendingTest}
              >
                <Send size={15} />{" "}
                {isSendingTest ? "Sending..." : "Send Test Email"}
              </AppButton>
            </div>
            <div className="rounded-[7px] border border-line p-4">
              <h2>
                <Eye size={18} /> Email Previews
              </h2>
              <div className="grid min-h-[240px] grid-cols-3 gap-5 pt-3 text-xs text-muted max-[680px]:min-h-0 max-[680px]:grid-cols-1 max-[680px]:gap-4">
                <span>Send a test email to see the preview</span>
                <span>Send a test email to see the preview</span>
                <span>Send a test email to see the preview</span>
              </div>
            </div>
          </section>
        </fieldset>

        <div className="flex justify-end">
          <FormModeActions
            mode={mode}
            onDelete={onDelete}
            saveLabel="Save Settings"
            className="min-w-[180px]"
          />
        </div>
      </form>
    </>
  );
}
