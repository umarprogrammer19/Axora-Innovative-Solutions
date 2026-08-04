"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reduced-motion handling for the whole page.
 *
 * Why this exists rather than `useReducedMotion()` branches inside components:
 * the hook reports false during server rendering and true on the client for a
 * visitor who has the preference set, so any component that branches its JSX on it
 * renders a different tree on each side and throws a hydration error. Every
 * reduced-motion visitor would hit it.
 *
 * `reducedMotion="user"` solves it at the animation layer instead. Motion snaps
 * transform and layout animations straight to their end value while still allowing
 * opacity to fade, so nothing is ever left invisible and the markup is identical on
 * both sides. Anything that genuinely must disappear under the preference (the hero
 * video) is handled with the CSS `motion-reduce:` variant, which has no render
 * branch at all.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
