import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import PageWrapper from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your HUSSAIN account.",
};

export default function LoginPage() {
  return (
    <PageWrapper className="max-w-md mx-auto px-6 pt-40 pb-24">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
          Welcome Back
        </p>
        <h1 className="font-display text-4xl">Sign In</h1>
      </div>
      <AuthForm mode="login" />
    </PageWrapper>
  );
}
