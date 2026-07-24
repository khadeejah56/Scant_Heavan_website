"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    // Simulated auth request — replace with a real API call.
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    router.push("/account");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === "signup" && (
        <Input label="Full Name" name="name" type="text" required />
      )}
      <Input label="Email Address" name="email" type="email" required />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        minLength={6}
      />
      {mode === "login" && (
        <div className="flex justify-end">
          <Link
            href="#"
            className="text-xs uppercase tracking-luxe opacity-60 hover:opacity-100"
          >
            Forgot password?
          </Link>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <Button type="submit" className="w-full" isLoading={isLoading}>
        {mode === "login" ? "Sign In" : "Create Account"}
      </Button>

      <p className="text-center text-sm opacity-60">
        {mode === "login" ? (
          <>
            New to HUSSAIN?{" "}
            <Link href="/signup" className="text-champagne hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-champagne hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
