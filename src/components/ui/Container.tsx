import type { ReactNode } from "react";

/** Page gutter and max width. Every section uses this, nothing sets its own. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
