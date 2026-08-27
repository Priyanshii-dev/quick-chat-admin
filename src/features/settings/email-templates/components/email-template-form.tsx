"use client";

import { ArrowLeft, Mail, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AppButton } from "@/components/shared/app-button";
import { FormInput } from "@/components/shared/custom-input-text";
import { CustomFormField } from "@/components/shared/custom-form-field";
import type { FormMode } from "@/components/shared/form-mode";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  emailTemplateSchema,
  type EmailTemplateInput,
} from "../schema/email-template.schema";
import { useCreateEmailTemplate } from "../hook/email-templates.hook";
import { toast } from "sonner";

type EmailTemplateFormProps = {
  mode?: Extract<FormMode, "edit" | "view">;
};

export function EmailTemplateForm({ mode = "edit" }: EmailTemplateFormProps) {
  const router = useRouter();
  const isReadOnly = mode === "view";
  const { mutateAsync: createTemplate, isPending } = useCreateEmailTemplate();
  const { control, handleSubmit } = useForm<EmailTemplateInput>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      name: "Welcome Email",
      from: "no-reply@yourapp.com",
      subject: "Welcome to Our Platform",
      status: "Active",
      content: "<p>Write your email content...</p>",
    },
    mode: "onBlur",
  });
  const values = useWatch({ control });

  const goBack = () => router.push("/settings/email-templates");

  const submit = async (values: EmailTemplateInput) => {
    try {
      await createTemplate(values);
      goBack();
    } catch (error) {
      toast.error("Could not save email template", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <div className="grid gap-4">
      <header className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3">
        <div className="flex items-start gap-2.5">
          <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div>
            <h1 className="text-sm font-bold text-foreground">
              {mode === "edit"
                ? "Create New Email Template"
                : "View Email Template"}
            </h1>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Prime text editor aur shared form components ke saath email
              template manage karein.
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goBack}
          className="h-8 gap-1.5 px-3 text-xs font-semibold"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Button>
      </header>

      <form
        id="email-template-form"
        className="grid items-stretch gap-4 lg:grid-cols-2"
        onSubmit={handleSubmit(submit)}
      >
        <section className="grid content-start gap-4 rounded-lg border border-border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-bold text-foreground">
            Create New Email Template
          </h2>
          <div className="grid gap-4">
            <FormInput
              name="name"
              label="Template Name"
              control={control}
              placeholder="Welcome Email"
              readOnly={isReadOnly}
              required
            />
            <FormInput
              name="from"
              label="From Email"
              control={control}
              placeholder="no-reply@yourapp.com"
              type="email"
              readOnly={isReadOnly}
              required
            />
            <FormInput
              name="subject"
              label="Subject"
              control={control}
              placeholder="Welcome to Our Platform"
              readOnly={isReadOnly}
              required
            />
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <CustomFormField
                  id="template-status"
                  label="Status"
                  error={fieldState.error?.message}
                >
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger
                      id="template-status"
                      className="h-8 w-full rounded-md bg-background px-2.5 text-xs"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </CustomFormField>
              )}
            />
            <FormInput
              name="content"
              label="Email Content (HTML)"
              control={control}
              textarea
              rows={12}
              placeholder="<p>Write your email content...</p>"
              readOnly={isReadOnly}
              required
              className="min-h-[260px] resize-y font-mono text-[11px]"
            />
            <p className="-mt-2 text-[10px] text-muted-foreground">
              Paste your raw HTML code here. Use inline CSS for best results in
              email clients.
            </p>
          </div>
          {!isReadOnly ? (
            <div>
              <AppButton
                variant="primary"
                type="submit"
                isLoading={isPending}
                aria-label="Save email template"
                className="bg-[#eab308] text-black hover:bg-[#eab308] hover:text-black hover:shadow-none"
              >
                <Save size={14} /> Save Email Template
              </AppButton>
            </div>
          ) : null}
        </section>

        <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-bold text-foreground">Email Preview</h2>
          <div className="mt-4 flex min-h-[430px] justify-center rounded-md bg-background p-4">
            <div className="flex h-fit min-h-[320px] w-full max-w-[444px] flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <div className="border-b border-border px-3 py-2.5 text-[10px] text-slate-700">
                <p>From: {values.from || "no-reply@yourapp.com"}</p>
                <p className="mt-1">
                  Subject: {values.subject || "Welcome to Our Platform"}
                </p>
              </div>
              <iframe
                title="Email preview"
                srcDoc={values.content || "<p>Write your email content...</p>"}
                sandbox=""
                className="min-h-[270px] w-full border-0 bg-white"
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
