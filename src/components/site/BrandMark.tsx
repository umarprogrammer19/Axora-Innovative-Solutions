import { simpleIcon } from "@/lib/simpleIcon";

/**
 * Shared brand marks for partner/certification rows (TrustBadges,
 * PartnerEcosystem). Real simple-icons SVGs where the library has them;
 * hand-drawn or text wordmarks where it does not (Microsoft, AWS,
 * ServiceNow, and LinkedIn were pulled from the installed simple-icons build
 * after trademark takedown requests, confirmed by checking the package
 * directly rather than assuming).
 */
export function MicrosoftMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
      <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

export function SimpleIconMark({
  slug,
  label,
  className = "size-6",
}: {
  slug: string;
  label: string;
  className?: string;
}) {
  const icon = simpleIcon(slug);
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={label} className={className} fill={`#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}
