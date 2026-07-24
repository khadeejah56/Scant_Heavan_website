import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-xs uppercase tracking-luxe opacity-70"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          suppressHydrationWarning
          className={cn(
            "w-full bg-transparent border-b border-current/20 py-2.5 text-sm outline-none focus:border-champagne transition-colors placeholder:opacity-40",
            error && "border-red-400",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
