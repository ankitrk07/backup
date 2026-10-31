import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface VariantOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const BASE =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded font-display uppercase tracking-wider transition duration-200 ease-out-expo disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:shadow-glow-accent hover:brightness-105",
  secondary: "bg-violet text-white hover:shadow-glow-violet hover:brightness-110",
  outline: "border border-line bg-transparent text-fg hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-fg hover:bg-raised",
  danger: "bg-danger text-accent-fg hover:brightness-110",
};

// All sizes keep a 44px minimum touch target.
const SIZES: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
  icon: "size-11 p-0 text-base",
};

export function buttonVariants(
  { variant = "primary", size = "md", fullWidth = false }: VariantOptions = {},
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);
}

export interface ButtonProps extends ComponentProps<"button">, VariantOptions {
  loading?: boolean;
}

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, fullWidth }, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<ComponentProps<typeof Link>, "className">,
    VariantOptions {
  className?: string;
}

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  href,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonVariants({ variant, size, fullWidth }, className);

  if (typeof href === "string" && EXTERNAL.test(href)) {
    const isWeb = /^https?:/.test(href);
    return (
      <a href={href} className={classes} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}