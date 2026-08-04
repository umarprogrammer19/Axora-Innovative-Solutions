import * as simpleIcons from "simple-icons";

/** Looks up a simple-icons brand icon by its lowercase slug (e.g. "quickbooks" -> siQuickbooks). */
export function simpleIcon(slug: string) {
  const key = `si${slug[0].toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  return simpleIcons[key] as { path: string; hex: string; title: string };
}
