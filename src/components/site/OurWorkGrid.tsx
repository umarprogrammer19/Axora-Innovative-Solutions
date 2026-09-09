"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { ourWork, services } from "@/lib/content";

type WorkItem = (typeof ourWork)[number];

/**
 * Layout family: filterable case-study wall, dark band. Chunks of five items
 * repeat full-width / two-up / two-up (mirrors the reference this was built
 * from), so the wall reads as varied rather than a uniform card grid.
 *
 * The desktop sidebar filter is `position: sticky`, not scroll-pinned via a
 * library: for a single-column list of buttons that unsticks at the bottom of
 * its own container, sticky positioning produces the same result as a
 * ScrollTrigger pin with far less code. Below `lg` the same filters render as
 * a horizontally scrollable pill row above the grid instead of disappearing.
 *
 * Category tags reuse the service catalogue (`services[].id`) rather than a
 * second taxonomy, so "AI Automation" style categories stay in one place.
 */

const tones: Record<string, string> = {
  azure: "border-azure/30 bg-azure/10 text-azure-soft",
  violet: "border-violet/30 bg-violet/10 text-violet-soft",
  magenta: "border-magenta/30 bg-magenta/10 text-magenta-soft",
};

const categoryTitles: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.id, s.title]),
);

const filters = [
  { id: "all", title: "All work" },
  ...services.map((s) => ({ id: s.id, title: s.title })),
];

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

/** Cursor-follow tilt on the image frame. A subtler, spring-eased read on the
 * reference's GSAP mousemove tilt, built on the motion values already used
 * for scroll reveals elsewhere rather than adding a second animation library. */
function TiltFrame({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 14);
        y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 14);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function WorkCard({ item, full = false }: { item: WorkItem; full?: boolean }) {
  return (
    <Reveal className={full ? "w-full" : "w-full md:flex-1"}>
      <article>
        <TiltFrame>
          <AssetSlot label={item.asset} className={full ? "aspect-[16/9]" : "aspect-[4/3]"} />
        </TiltFrame>
        <div className="mt-4 flex flex-col items-start gap-2">
          <span
            className={`inline-flex w-fit rounded-control border px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide uppercase ${tones[item.tone]}`}
          >
            {categoryTitles[item.category]}
          </span>
          <h3 className="text-[1.0625rem] font-semibold text-fg">{item.title}</h3>
          <p className="text-[0.8125rem] leading-relaxed text-fg-2">{item.body}</p>
          <p className="text-[0.75rem] font-medium text-fg-3">{item.client}</p>
        </div>
      </article>
    </Reveal>
  );
}

function FilterButton({
  label,
  active,
  onClick,
  className = "",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-control px-4 py-2 text-[0.8125rem] tracking-wide whitespace-nowrap transition-colors duration-200 ${
        active
          ? "bg-azure text-white"
          : "border border-line text-fg-2 hover:border-azure/50 hover:text-fg"
      } ${className}`}
    >
      {label}
    </button>
  );
}

export function OurWorkGrid() {
  const [selected, setSelected] = useState("all");

  const filtered = useMemo(
    () => ourWork.filter((item) => selected === "all" || item.category === selected),
    [selected],
  );
  const groups = useMemo(() => chunk(filtered, 5), [filtered]);

  return (
    <section className="relative bg-ink py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mb-10 lg:hidden">
          <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">
            Filter by category
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {filters.map((f) => (
              <FilterButton
                key={f.id}
                label={f.title}
                active={selected === f.id}
                onClick={() => setSelected(f.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
          <aside className="hidden lg:block lg:w-[22%] lg:shrink-0">
            <div className="sticky top-[104px]">
              <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">
                Filter by category
              </p>
              <div className="flex flex-col items-start gap-2">
                {filters.map((f) => (
                  <FilterButton
                    key={f.id}
                    label={f.title}
                    active={selected === f.id}
                    onClick={() => setSelected(f.id)}
                    className="w-full text-left"
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {groups.length === 0 && (
              <p className="text-[0.9375rem] text-fg-3">No work in this category yet.</p>
            )}
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
                        {row1.map((item) => (
                          <WorkCard key={item.id} item={item} />
                        ))}
                      </div>
                    )}
                    {row2.length > 0 && (
                      <div className="flex flex-col gap-10 md:flex-row md:gap-8">
                        {row2.map((item) => (
                          <WorkCard key={item.id} item={item} />
                        ))}
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
