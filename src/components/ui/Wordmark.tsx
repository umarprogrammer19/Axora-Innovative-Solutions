import Image from "next/image";

/**
 * Icon mark + type lockup.
 *
 * The mark is a real crop of public/logo.png (public/logo-mark.png), the blue
 * to charcoal "AX" from the actual logo. The wordmark text stays coded rather
 * than the logo's own raster text: the logo's "Axora" is set in the brand's
 * dark charcoal for a white background, and this page's nav and footer are
 * both dark, so that text would sit near-invisible (1.4:1) against them.
 * Coding it in --color-fg keeps the mark authentic while the words stay legible.
 *
 * Both lines share the page's one sans family (Geist). "Innovative Solutions"
 * used to be set in the mono family, which read as two mismatched logos
 * stitched together - the weight and tracking differ instead, and the color
 * is the brand blue, matching the logo's own blue subtitle.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <Image
        src="/logo-mark.png"
        alt=""
        width={293}
        height={242}
        className="h-[30px] w-auto shrink-0"
        priority
      />
      <span className="inline-block">
        <span className="block text-[1.0625rem] font-semibold tracking-[-0.035em] text-fg">
          Axora
        </span>
        <span className="mt-[3px] block text-[0.5625rem] font-medium tracking-[0.16em] text-azure-soft uppercase">
          Innovative Solutions
        </span>
      </span>
    </span>
  );
}
