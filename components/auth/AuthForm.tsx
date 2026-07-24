"use client";

import { useActionState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { login, signup, type AuthState } from "@/app/actions/auth";

interface AuthFormProps {
  mode: "login" | "signup";
}

const initialState: AuthState = {};

export default function AuthForm({ mode }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(
    mode === "login" ? login : signup,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {mode === "signup" && (
        <Input
          label="Full Name"
          name="name"
          type="text"
          required
          error={state.fieldErrors?.name?.[0]}
        />
      )}
      <Input
        label="Email Address"
        name="email"
        type="email"
        required
        error={state.fieldErrors?.email?.[0]}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        minLength={6}
        error={state.fieldErrors?.password?.[0]}
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

      {state.error && <p className="text-xs text-red-400">{state.error}</p>}

      <Button type="submit" className="w-full" isLoading={isPending}>
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
