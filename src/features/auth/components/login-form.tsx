"use client";

import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AppButton } from "@/components/shared/app-button";
import { FormInput } from "@/components/shared/custom-input-text";
import { loginSchema, type LoginInput } from "../schema/login.schema";
import { useLogin } from "../hook/auth.hook";
import { useAuthStore, type AuthState } from "../store/auth-store";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const setAuth = useAuthStore((state: AuthState) => state.setAuth);
  const { handleSubmit, control } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const submit = (values: LoginInput) =>
    login.mutate(values, {
      onSuccess: (user) => {
        setAuth(user);
        router.push("/");
      },
      onError: (error) => toast.error(error.message),
    });
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_right,#d9eee9,transparent_42%)] p-6">
      <section className="w-full max-w-[440px] rounded-lg border border-line bg-panel p-[42px] shadow-panel">
        <div className="grid size-[38px] place-items-center rounded-[11px] bg-yellow text-xl font-bold text-[#173735]">
          N
        </div>
        <div className="mt-[26px] text-[11px] font-bold tracking-[0.14em] text-teal uppercase">
          Northstar admin
        </div>
        <h1 className="mt-2 text-[clamp(28px,3vw,42px)] leading-[1.05] font-bold tracking-[-0.02em]">
          Welcome back
        </h1>
        <p className="text-sm leading-6 text-muted">
          Sign in to manage your site workspace.
        </p>
        <form
          noValidate
          onSubmit={handleSubmit(submit)}
          className="mt-7 grid gap-[18px]"
        >
          <FormInput
            name="email"
            placeholder="admin@example.com"
            label="Email"
            control={control}
            type="email"
            required
          />
          <FormInput
            name="password"
            placeholder="••••••••"
            label="Password"
            control={control}
            type="password"
            required
          />
          <AppButton variant="primary" type="submit" disabled={login.isPending}>
            {login.isPending ? "Signing in..." : "Sign in"}
          </AppButton>
        </form>
        <div className="mt-[22px] flex items-center justify-center gap-[7px] text-xs text-muted">
          <ShieldCheck size={15} /> Secure administrator access
        </div>
      </section>
    </main>
  );
}
