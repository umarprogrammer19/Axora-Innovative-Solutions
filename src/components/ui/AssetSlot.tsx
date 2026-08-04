/**
 * Structured placeholder for a graphic that has not been produced yet.
 *
 * Swapping it out is a one-line change: replace <AssetSlot /> with
 * <Image src="..." alt="..." fill className="object-cover" /> inside the same
 * wrapper. The frame keeps its own aspect ratio so nothing shifts when the real
 * asset lands.
 */
export function AssetSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`asset-slot relative flex items-center justify-center overflow-hidden rounded-panel ${className}`}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <div className="pointer-events-none absolute inset-2.5 rounded-[8px] border border-paper-line" />
      <p className="relative max-w-[24ch] px-6 text-center font-mono text-[0.6875rem] leading-relaxed text-onlight-3">
        {label}
      </p>
    </div>
  );
}
