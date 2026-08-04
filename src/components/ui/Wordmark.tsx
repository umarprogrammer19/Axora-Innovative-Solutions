/**
 * Type lockup standing in for the vector logo.
 * Swap the two spans for <Image src="/brand/axora.svg" ... /> when it is ready.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block leading-none ${className}`}>
      <span className="block text-[1.0625rem] font-semibold tracking-[-0.035em] text-fg">
        Axora
      </span>
      <span className="mt-[3px] block font-mono text-[0.5rem] tracking-[0.26em] text-fg-3 uppercase">
        Innovative Solutions
      </span>
    </span>
  );
}
