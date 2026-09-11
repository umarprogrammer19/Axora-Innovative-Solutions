"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui/Container";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { Button } from "@/components/ui/Button";
import { ourWork, services } from "@/lib/content";
import { submitInquiry } from "@/app/actions";
import { initialInquiryState } from "@/lib/inquiry";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type WorkItem = (typeof ourWork)[number];

/**
 * Layout family: filterable case-study wall, dark band, same chunking
 * (full-width / two-up / two-up, repeating) and the same GSAP ScrollTrigger
 * entrance timeline and cursor-tilt image as xntric.ae/our-work, the
 * reference this was built from. Two deliberate departures: no per-card
 * cursor bubble, since these cards have nowhere to link yet (no per-project
 * pages exist), and the sidebar quick-form posts through the site's own
 * Google Sheets action instead of the reference's separate /api/ourform.
 *
 * The sidebar (filters + quick form) is `position: sticky`, not pinned via
 * ScrollTrigger: for a column that unsticks at the bottom of its own
 * container, sticky produces the same result with no extra JS. Below `lg`
 * it drops to a plain filter row above the grid; the quick form only makes
 * sense next to a sidebar that has room for it, so it's desktop-only.
 */

const tones: Record<string, string> = {
  azure: "border-azure/30 bg-azure/10 text-azure-soft",
  violet: "border-violet/30 bg-violet/10 text-violet-soft",
  magenta: "border-magenta/30 bg-magenta/10 text-magenta-soft",
};

const categoryTitles: Record<string, string> = Object.fromEntries(services.map((s) => [s.id, s.title]));
const filters = [{ id: "all", title: "All work" }, ...services.map((s) => ({ id: s.id, title: s.title }))];

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

function WorkCard({ item, full = false }: { item: WorkItem; full?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const cat = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const body = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 88%", toggleActions: "play none none reverse" },
        })
        .from(img.current, { opacity: 0, y: reduce ? 0 : 40, duration: 0.7, ease: "power2.out" })
        .from([cat.current, title.current, body.current], {
          opacity: 0,
          y: reduce ? 0 : 20,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.4");

      if (!reduce) {
        const onMove = (e: MouseEvent) => {
          const rect = img.current!.getBoundingClientRect();
          gsap.to(img.current, {
            x: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 16,
            y: ((e.clientY - rect.top - rect.height / 2) / rect.height) * 16,
            duration: 0.6,
            ease: "power3.out",
          });
        };
        const onLeave = () => gsap.to(img.current, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
        img.current?.addEventListener("mousemove", onMove);
        img.current?.addEventListener("mouseleave", onLeave);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={full ? "w-full" : "w-full md:flex-1"}>
      <div ref={img}>
        <AssetSlot label={item.asset} className={full ? "aspect-[16/9]" : "aspect-[4/3]"} />
      </div>
      <div className="mt-4 flex flex-col items-start gap-2">
        <span ref={cat} className={`inline-flex w-fit rounded-control border px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide uppercase ${tones[item.tone]}`}>
          {categoryTitles[item.category]}
        </span>
        <h3 ref={title} className="text-[1.0625rem] font-semibold text-fg">{item.title}</h3>
        <p ref={body} className="text-[0.8125rem] leading-relaxed text-fg-2">{item.body}</p>
        <p className="text-[0.75rem] font-medium text-fg-3">{item.client}</p>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick, className = "" }: { label: string; active: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-control px-4 py-2 text-[0.8125rem] tracking-wide whitespace-nowrap transition-colors duration-200 ${
        active ? "bg-azure text-white" : "border border-line text-fg-2 hover:border-azure/50 hover:text-fg"
      } ${className}`}
    >
      {label}
    </button>
  );
}

const fieldCls =
  "w-full rounded-control border border-line bg-ink/40 px-3.5 py-2.5 text-[0.875rem] text-fg placeholder:text-fg-3 outline-none transition-colors duration-200 focus:border-azure";

/** Compact version of the /contact form, positioned in the sidebar the way
 * the reference positions its own quick-start form next to the filters.
 * Posts through the same submitInquiry action as the full form below; company
 * and budget ride along as sensible hidden defaults since this form doesn't
 * ask for them. */
function QuickInquiry() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);

  if (state.status === "success") {
    return (
      <p className="rounded-panel border border-line bg-panel/60 p-5 text-center text-[0.875rem] text-azure-soft">
        Thanks - we will reply within one working day.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-panel border border-line bg-panel/60 p-5">
      <input type="hidden" name="company" value="Not specified" />
      <input type="hidden" name="budget" value="Not sure yet" />
      <input name="name" required placeholder="Your name" className={fieldCls} />
      <input name="email" type="email" required placeholder="Work email" className={fieldCls} />
      <input name="phone" placeholder="Phone (optional)" className={fieldCls} />
      <textarea name="bottleneck" required minLength={20} rows={3} placeholder="What are you looking to build?" className={`${fieldCls} resize-none`} />
      <Button type="submit" disabled={pending} className="w-full justify-center">
        {pending ? "Sending" : "Let's start"}
      </Button>
      {state.status === "error" && <p className="text-[0.75rem] text-[#ff9aa8]">{state.message}</p>}
    </form>
  );
}

export function OurWorkGrid() {
  const [selected, setSelected] = useState("all");
  const filtered = useMemo(() => ourWork.filter((item) => selected === "all" || item.category === selected), [selected]);
  const groups = useMemo(() => chunk(filtered, 5), [filtered]);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [selected]);

  return (
    <section className="relative bg-ink py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mb-10 lg:hidden">
          <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">Filter by category</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {filters.map((f) => (
              <FilterButton key={f.id} label={f.title} active={selected === f.id} onClick={() => setSelected(f.id)} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
          <aside className="hidden lg:block lg:w-[22%] lg:shrink-0">
            <div className="sticky top-[104px] flex flex-col gap-8">
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">Filter by category</p>
                <div className="flex flex-col items-start gap-2">
                  {filters.map((f) => (
                    <FilterButton key={f.id} label={f.title} active={selected === f.id} onClick={() => setSelected(f.id)} className="w-full text-left" />
                  ))}
                </div>
              </div>
              <QuickInquiry />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {groups.length === 0 && <p className="text-[0.9375rem] text-fg-3">No work in this category yet.</p>}
            <div className="flex flex-col gap-16">
              {groups.map((group, i) => {
                const [full, ...rest] = group;
                const row1 = rest.slice(0, 2);
                const row2 = rest.slice(2, 4);
                return (
                  <div key={i} className="flex flex-col gap-10">
                    {full && <WorkCard item={full} full />}
                    {row1.length > 0 && (
                      <div className="flex flex-col gap-10 md:flex-row md:gap-8">
                        {row1.map((item) => <WorkCard key={item.id} item={item} />)}
                      </div>
                    )}
                    {row2.length > 0 && (
                      <div className="flex flex-col gap-10 md:flex-row md:gap-8">
                        {row2.map((item) => <WorkCard key={item.id} item={item} />)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
