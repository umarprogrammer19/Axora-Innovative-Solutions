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
    <div className={`mx-auto w-[95%] 2xl:max-w-360 px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
