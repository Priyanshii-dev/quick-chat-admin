"use client";

import { Mail, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppButton } from "@/components/shared/app-button";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import type { FormMode } from "@/components/shared/form-mode";
import {
  emailTemplateSchema,
  type EmailTemplateInput,
} from "../schema/email-template.schema";

type EmailTemplateFormProps = {
  mode?: Extract<FormMode, "edit" | "view">;
};

export function EmailTemplateForm({ mode = "edit" }: EmailTemplateFormProps) {
  const router = useRouter();
  const isReadOnly = mode === "view";
  const { control, handleSubmit } = useForm<EmailTemplateInput>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      name: "",
      from: "",
      subject: "",
      content: "",
    },
    mode: "onBlur",
  });

  const goBack = () => router.push("/settings/email-templates");

  return (
    <div className="grid gap-5">
      <ModuleHeader
        eyebrow="Communication"
        title={
          mode === "edit" ? "Create email template" : "View email template"
        }
        description="Create and manage reusable email messages."
      >
        <div className="flex gap-2">
          {!isReadOnly ? (
            <AppButton
              variant="primary"
              type="submit"
              form="email-template-form"
            >
              <Save size={15} /> Save Template
            </AppButton>
          ) : null}
        </div>
      </ModuleHeader>
      <form
        id="email-template-form"
        className="grid gap-5 rounded-lg border border-line bg-panel p-6 shadow-panel"
        onSubmit={handleSubmit(goBack)}
      >
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Mail size={18} /> Template Details
        </h2>
        <div className="grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
          <FormInput
            name="name"
            label="Template name"
            control={control}
            placeholder="Welcome Email"
            readOnly={isReadOnly}
            required
          />
          <FormInput
            name="from"
            label="From email"
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
            className="col-span-2 max-[680px]:col-span-1"
          />
        </div>
        <FormInput
          name="content"
          label="Email content"
          control={control}
          textarea
          rows={10}
          placeholder="Write your email content..."
          readOnly={isReadOnly}
          required
        />
        {!isReadOnly ? (
          <div className="flex justify-end">
            <AppButton variant="primary" type="submit">
              <Save size={15} /> Save Template
            </AppButton>
          </div>
        ) : null}
      </form>
    </div>
  );
}
