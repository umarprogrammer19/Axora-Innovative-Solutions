import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

/**
 * Contrast notes, checked against the page tokens:
 *   primary  white on --color-azure-deep  = 5.7:1
 *   ghost    --color-fg on glass over ink = 13:1 or better
 * Radius is always rounded-control (10px) per the two-radius rule.
 */
const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control " +
  "text-[0.9375rem] font-medium leading-none transition-[transform,background-color,border-color,box-shadow] " +
  "duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  // Tinted, tight shadow plus a 1px inner highlight. Deliberately not an outer
  // glow: a coloured halo around a button is the clearest tell of a generated page.
  primary:
    "bg-azure-deep px-5 py-3.5 text-white " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_6px_16px_-10px_rgb(5_7_15/0.9)] " +
    "hover:bg-azure",
  ghost: "glass px-5 py-3.5 text-fg hover:border-white/20 hover:bg-white/[0.07]",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  onClick,
  ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick as ComponentProps<"a">["onClick"]}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
