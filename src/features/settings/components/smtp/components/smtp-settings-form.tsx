"use client";

import React from "react";
import { Edit3, Mail, Send, Settings, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import { useSmtpSettingsForm } from "../hook/use-smtp-settings-form";
import { FormMode } from "@/components/shared/form-mode";

type SmtpSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function SmtpSettingsForm({ mode = "edit" }: SmtpSettingsFormProps) {
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
    <div className="w-full space-y-6">
      <ModuleHeader
        eyebrow="Email Configuration"
        title="SMTP Settings"
        description="Configure your outgoing email delivery server, port, credentials, and test delivery."
      >
        {isReadOnly && (
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/settings/smtp-settings")}
            className="gap-2 border-border text-xs font-semibold"
          >
            <Edit3 size={15} /> Edit Settings
          </Button>
        )}
      </ModuleHeader>

      <form noValidate onSubmit={handleSave} className="space-y-6">
        <fieldset disabled={isReadOnly} className="space-y-6 border-0 p-0">
          {/* SMTP Configuration Card */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Settings className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                SMTP Server Configuration
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <FormInput
                name="host"
                label="SMTP Host"
                control={control}
                placeholder="e.g. smtp.gmail.com"
                required
              />
              <FormInput
                name="port"
                label="SMTP Port"
                control={control}
                type="number"
                placeholder="587"
                required
              />
              <FormInput
                name="username"
                label="SMTP Username"
                control={control}
                placeholder="user@example.com"
                required
              />
              <FormInput
                name="password"
                label="SMTP Password"
                control={control}
                type="password"
                placeholder="••••••••••••"
              />

              {/* Encryption Select Field */}
              <div className="grid gap-1.5 self-start">
                <label className="text-xs font-bold text-foreground">
                  ENCRYPTION <span className="text-destructive">*</span>
                </label>
                <select
                  {...register("encryption")}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="SSL">SSL</option>
                  <option value="TLS">TLS</option>
                  <option value="None">None</option>
                </select>
              </div>

              <FormInput
                name="fromEmail"
                label="From Email"
                control={control}
                placeholder="noreply@domain.com"
                required
              />
              <FormInput
                name="fromName"
                label="From Name"
                control={control}
                placeholder="QuietChat Admin"
                required
              />
              <FormInput
                name="fromCc"
                label="From CC"
                control={control}
                placeholder="cc@domain.com"
              />
              <FormInput
                name="fromBcc"
                label="From BCC"
                control={control}
                placeholder="bcc@domain.com"
              />

              {/* Enable Switch Box */}
              <div className="sm:col-span-2 lg:col-span-4 flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="smtp-enabled"
                  {...register("enabled")}
                  className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                />
                <label
                  htmlFor="smtp-enabled"
                  className="text-xs font-bold text-foreground cursor-pointer select-none"
                >
                  Enable SMTP for sending all outgoing email notifications
                </label>
              </div>
            </div>
          </section>

          {/* Test Email Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-base font-extrabold text-foreground">
                  Send Test Email
                </h3>
              </div>

              <FormInput
                name="testEmail"
                label="Test Recipient Email"
                control={control}
                type="email"
                placeholder="test@example.com"
              />
              <FormInput
                name="content"
                label="Sample Content"
                control={control}
                textarea
                rows={4}
                placeholder="Enter test message content..."
              />
              <Button
                type="button"
                onClick={handleSendTestEmail}
                disabled={isSendingTest}
                className="w-full gap-2 bg-primary text-primary-foreground font-bold h-10 hover:opacity-90 shadow-sm"
              >
                <Send className="h-4 w-4" />
                {isSendingTest ? "Sending Test Email..." : "Send Test Email"}
              </Button>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="text-base font-extrabold text-foreground">
                  Email Preview
                </h3>
              </div>
              <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-border/60 bg-muted/20 p-6 text-center text-xs text-muted-foreground">
                <p>
                  Click &quot;Send Test Email&quot; to verify your SMTP
                  configuration.
                </p>
              </div>
            </div>
          </section>
        </fieldset>

        {/* Action Button */}
        {!isReadOnly && (
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="gap-2 bg-primary text-primary-foreground font-bold h-10 px-8 hover:opacity-90 shadow-md"
            >
              Save SMTP Configuration
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
