"use client";

import { useActionState, useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { submitInquiry } from "@/app/actions";
import { initialInquiryState } from "@/lib/inquiry";
import { services } from "@/lib/content";

/**
 * Same-to-same port of the reference's ContactForm: a single "name and
 * company" field (not two), a real phone field instead of a budget dropdown,
 * one message textarea, then a 3-column "I'm interested in" chip grid before
 * the submit button. Dark, on purpose - the reference runs this same dark
 * throughout /our-work, and breaking that just for this one form's band
 * would read as a mismatch rather than fidelity.
 *
 * Posts through the shared submitInquiry action. Company doesn't have its
 * own field here, so it rides a hidden input synced from the name field.
 */

const fieldCls =
  "w-full rounded-control border border-line bg-panel/50 px-4 py-3 text-[0.875rem] text-fg placeholder:text-fg-3 outline-none transition-colors duration-200 focus:border-azure";

export function OurWorkContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
  const [nameCompany, setNameCompany] = useState("");

  return (
    <section id="our-work-form" className="relative scroll-mt-28 bg-ink py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-[52rem]">
          <Reveal className="mb-12 text-center">
            <p className="text-[0.9375rem] text-fg-2">Let&apos;s get started</p>
            <h2 className="mt-3 text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold text-fg">
              Start your{" "}
              <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">next system</span>{" "}
              with us
            </h2>
          </Reveal>

          {state.status === "success" ? (
            <Reveal className="mx-auto max-w-[40ch] rounded-panel border border-line bg-panel/60 p-8 text-center text-[0.9375rem] text-fg-2">
              {state.message}
            </Reveal>
          ) : (
            <Reveal as="div">
              <form action={formAction} className="space-y-8">
                <input type="hidden" name="company" value={nameCompany || "Not specified"} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    value={nameCompany}
                    onChange={(e) => setNameCompany(e.target.value)}
                    placeholder="Name & company"
                    className={fieldCls}
                  />
                  <input name="phone" type="tel" placeholder="Phone number" className={fieldCls} />
                </div>
                <input name="email" type="email" required placeholder="Your email" className={fieldCls} />
                <textarea name="bottleneck" required minLength={20} rows={5} placeholder="Your message" className={`${fieldCls} resize-y`} />

                <div className="rounded-panel border border-line bg-panel/50 px-6 py-5">
                  <p className="text-[0.9375rem] font-medium text-fg">I&apos;m interested in</p>
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {services.map((service) => (
                      <label key={service.id} className="flex cursor-pointer items-center gap-2.5 rounded-control p-2">
                        <input type="checkbox" name="interests" value={service.title} className="peer sr-only" />
                        <span className="size-5 shrink-0 rounded-[6px] border border-line-2 transition-colors duration-150 peer-checked:border-azure peer-checked:bg-azure" />
                        <span className="text-[0.8125rem] text-fg-2">{service.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {state.status === "error" && (
                  <p className="text-center text-[0.8125rem] text-[#ff9aa8]">{state.message}</p>
                )}

                <div className="flex justify-center">
                  <Button type="submit" disabled={pending}>
                    {pending ? "Sending" : (
                      <>
                        Submit Your Request
                        <PaperPlaneTilt size={15} aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
