import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import PageWrapper from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a HUSSAIN account for faster checkout and order tracking.",
};

export default function SignupPage() {
  return (
    <PageWrapper className="max-w-md mx-auto px-6 pt-40 pb-24">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
          Join HUSSAIN
        </p>
        <h1 className="font-display text-4xl">Create Account</h1>
      </div>
      <AuthForm mode="signup" />
    </PageWrapper>
  );
}
