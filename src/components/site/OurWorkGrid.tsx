"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui/Container";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { cta, ourWork, services } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type WorkItem = (typeof ourWork)[number];

/**
 * Layout family: filterable case-study wall, dark band. Same-to-same port of
 * xntric.ae/our-work's grid, just re-themed: the full-width/two-up/two-up
 * chunking, the GSAP ScrollTrigger entrance timeline (title+category, then
 * description, then the image sliding in from alternating sides so a 2-up
 * row converges toward its centre), the per-image cursor tilt (identical
 * formula: 15px sensitivity, a sine "zigzag" on the vertical axis), and the
 * cursor-follow "View" bubble on hover. One adaptation: the reference links
 * each card to its own case-study page; Axora doesn't have those yet, so
 * cards link to /contact instead of a dead route.
 *
 * The sidebar is `position: sticky`, not pinned via ScrollTrigger - for a
 * column that unsticks at the bottom of its own container, sticky produces
 * the same result with no extra JS. Below `lg` the filters drop to a plain
 * wrapping row above the grid. Sidebar has no embedded form: a "Let's Start"
 * button scrolls to the one real contact form at the bottom of the page
 * instead of duplicating it, so there's a single form actually wired to the
 * Google Sheet rather than two.
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

/** Cursor-follow "View" bubble, shown only while hovering this card's image. */
function ViewCursor({ active }: { active: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [active]);

  if (!active) return null;
  return (
    <motion.div
      className="pointer-events-none fixed z-50 grid size-20 place-items-center rounded-full bg-azure text-white shadow-lg"
      style={{ left: pos.x, top: pos.y, translateX: "-50%", translateY: "-50%" }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.15 }}
    >
      <span className="text-[0.8125rem] font-semibold uppercase">View</span>
    </motion.div>
  );
}

function WorkCard({ item, full = false, enterFrom = "right" }: { item: WorkItem; full?: boolean; enterFrom?: "left" | "right" }) {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const cat = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const body = useRef<HTMLParagraphElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startX = enterFrom === "left" ? -60 : 60;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 88%", toggleActions: "play none none reverse" },
        })
        .from([cat.current, title.current], { opacity: 0, y: reduce ? 0 : 20, duration: 0.6, ease: "power3.out" })
        .from(body.current, { opacity: 0, y: reduce ? 0 : 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(
          img.current,
          { opacity: 0, x: reduce ? 0 : startX },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.45",
        );

      if (!reduce) {
        const onMove = (e: MouseEvent) => {
          const rect = img.current!.getBoundingClientRect();
          const mouseX = e.clientX - (rect.left + rect.width / 2);
          const mouseY = e.clientY - (rect.top + rect.height / 2);
          const sensitivity = 15;
          const zigzag = Math.sin(mouseY / 30) * (sensitivity / 2);
          gsap.to(img.current, {
            y: (mouseY / rect.height) * sensitivity,
            x: (mouseX / rect.width) * (sensitivity / 3) + zigzag,
            duration: 0.8,
            ease: "power3.out",
          });
        };
        const onLeave = () => gsap.to(img.current, { x: 0, y: 0, duration: 0.9, ease: "power3.out" });
        img.current?.addEventListener("mousemove", onMove);
        img.current?.addEventListener("mouseleave", onLeave);
      }
    }, root);

    return () => ctx.revert();
  }, [enterFrom]);

  return (
    <div ref={root} className={full ? "w-full md:w-[90%] xl:w-[80%] mx-auto" : "w-full md:flex-1"}>
      <ViewCursor active={hovering} />
      <div ref={img} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <Link href={cta.contactHref}>
          <AssetSlot label={item.asset} className={full ? "aspect-[16/9]" : "aspect-[4/3]"} />
        </Link>
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
      className={`shrink-0 rounded-full px-4 py-1.5 text-sm tracking-wide whitespace-nowrap transition-colors duration-200 ${
        active ? "bg-azure text-white" : "border border-azure-soft text-azure-soft hover:bg-azure-soft/10"
      } ${className}`}
    >
      {label}
    </button>
  );
}

/** Scrolls to the real contact form below instead of duplicating it in the
 * sidebar - one working form beats two, and this one visibly saves to the
 * same sheet as everywhere else on the site. */
function StartCta() {
  return (
    <Link
      href="#our-work-form"
      className="group flex items-center justify-center gap-2.5 rounded-control bg-gradient-to-r from-azure to-azure-deep py-3 text-[0.9375rem] font-medium tracking-wide text-white transition-all duration-300 hover:brightness-110"
    >
      Let&apos;s Start
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
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
          <aside className="hidden lg:block lg:w-1/4 lg:shrink-0">
            <div className="sticky top-[104px] flex flex-col gap-6">
              <div>
                <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">Filter by category</p>
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <FilterButton key={f.id} label={f.title} active={selected === f.id} onClick={() => setSelected(f.id)} />
                  ))}
                </div>
              </div>
              <StartCta />
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
                      <div className="flex flex-col gap-10 md:flex-row md:gap-20 xl:gap-40 2xl:gap-48">
                        {row1.map((item, idx) => <WorkCard key={item.id} item={item} enterFrom={idx === 0 ? "left" : "right"} />)}
                      </div>
                    )}
                    {row2.length > 0 && (
                      <div className="flex flex-col gap-10 md:flex-row md:gap-20 xl:gap-40 2xl:gap-48">
                        {row2.map((item, idx) => <WorkCard key={item.id} item={item} enterFrom={idx === 0 ? "left" : "right"} />)}
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
