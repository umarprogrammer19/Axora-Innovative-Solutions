"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import {
  CaretDown,
  Check,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  Phone,
} from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { submitInquiry } from "@/app/actions";
import { initialInquiryState } from "@/lib/inquiry";
import { contact, cta, inquiry } from "@/lib/content";

/**
 * Layout family: form beside a supporting panel. Used once, on /contact.
 * This is the real destination behind every "Contact Us" / "Book an
 * Executive Briefing" / "Start Your Transformation" link on the site (see
 * cta.contactHref in content.ts).
 *
 * White band. Ran dark for a pass; against a page that opens with a dark
 * PageHero, a second dark band directly under it read heavier than the form
 * needed, so this is the one white surface on /contact.
 *
 * Error red does not reuse --color-alert: that token (#ff9aa8) is tuned for
 * 9:1+ contrast on the dark surfaces it was built for and fails badly on
 * white, so this uses a separate accessible red for on-light error text and
 * invalid borders.
 *
 * Labels sit above every control, helper text under it, error text below that.
 * There are no placeholders standing in for labels.
 *
 * Mobile (< 1024px): the panel moves below the form, field pairs go single column.
 */

const errorColor = "text-[#b91c1c]";

const control =
  "w-full rounded-control border border-paper-line-2 bg-paper px-3.5 py-3 text-[0.9375rem] text-onlight " +
  "outline-none transition-[border-color,box-shadow] duration-200 " +
  "focus:border-azure focus:ring-2 focus:ring-azure/25 " +
  "aria-[invalid=true]:border-[#b91c1c]/60 disabled:opacity-60";

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[0.8125rem] font-medium text-onlight-2">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="text-[0.75rem] text-onlight-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className={`text-[0.75rem] ${errorColor}`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function Inquiry({ showHeading = true }: { showHeading?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialInquiryState,
  );

  const err = state.fieldErrors;
  const val = state.values;

  const describedBy = (name: string, hasHint: boolean) =>
    err[name as keyof typeof err]
      ? `${name}-error`
      : hasHint
        ? `${name}-hint`
        : undefined;

  return (
    <section id="inquiry" className="relative overflow-hidden bg-panel-light py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(55%_100%_at_15%_0%,rgb(2_96_253/0.07),transparent_70%),radial-gradient(45%_80%_at_85%_0%,rgb(123_92_250/0.06),transparent_70%)]"
      />

      <Container>
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {showHeading && (
              <Reveal>
                <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
                  {inquiry.heading}
                </h2>
                <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-onlight-3">
                  {inquiry.body}
                </p>
              </Reveal>
            )}

            <div className={showHeading ? "mt-10" : ""}>
              {state.status === "success" ? (
                <div className="rounded-panel border border-paper-line bg-paper p-8 sm:p-10">
                  <span className="grid size-10 place-items-center rounded-full bg-ok/15 text-ok ring-1 ring-ok/30">
                    <Check size={17} weight="bold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-[1.25rem] font-semibold text-onlight">
                    Inquiry received
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-onlight-3">
                    {state.message} If it is urgent, email us at{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-azure underline decoration-azure/40 underline-offset-4 hover:decoration-azure"
                    >
                      {contact.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form action={formAction} noValidate>
                  {/* Honeypot. Hidden from people, visible to naive bots. */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="referrer_url">Referrer</label>
                    <input id="referrer_url" name="referrer_url" tabIndex={-1} autoComplete="off" />
                  </div>

                  <fieldset disabled={isPending} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <legend className="sr-only">Project inquiry</legend>

                    <Field name="name" label="Your name" error={err.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        defaultValue={val.name}
                        aria-invalid={Boolean(err.name)}
                        aria-describedby={describedBy("name", false)}
                        className={control}
                      />
                    </Field>

                    <Field name="email" label="Work email" error={err.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        defaultValue={val.email}
                        aria-invalid={Boolean(err.email)}
                        aria-describedby={describedBy("email", false)}
                        className={control}
                      />
                    </Field>

                    <Field name="company" label="Company" error={err.company}>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        required
                        defaultValue={val.company}
                        aria-invalid={Boolean(err.company)}
                        aria-describedby={describedBy("company", false)}
                        className={control}
                      />
                    </Field>

                    <Field
                      name="budget"
                      label="Budget range"
                      hint="A rough band is fine. It shapes what we propose."
                      error={err.budget}
                    >
                      <div className="relative">
                        <select
                          id="budget"
                          name="budget"
                          defaultValue={val.budget ?? inquiry.budgets[0]}
                          aria-describedby={describedBy("budget", true)}
                          className={`${control} appearance-none pr-11`}
                        >
                          {inquiry.budgets.map((band) => (
                            <option key={band} value={band} className="bg-panel-light text-onlight">
                              {band}
                            </option>
                          ))}
                        </select>
                        <CaretDown
                          size={14}
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-onlight-3"
                        />
                      </div>
                    </Field>

                    <div className="sm:col-span-2">
                      <Field
                        name="bottleneck"
                        label="Explain your business workflows"
                        hint="Two or three sentences is plenty."
                        error={err.bottleneck}
                      >
                        <textarea
                          id="bottleneck"
                          name="bottleneck"
                          rows={5}
                          required
                          defaultValue={val.bottleneck}
                          aria-invalid={Boolean(err.bottleneck)}
                          aria-describedby={describedBy("bottleneck", true)}
                          className={`${control} resize-y`}
                        />
                      </Field>
                    </div>
                  </fieldset>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        "Sending"
                      ) : (
                        <>
                          {cta.submit}
                          <PaperPlaneTilt
                            size={15}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </Button>

                    {/* Announced to assistive tech whether it succeeds or fails. */}
                    <p
                      aria-live="polite"
                      className={`text-[0.8125rem] ${
                        state.status === "error" ? errorColor : "text-onlight-3"
                      }`}
                    >
                      {isPending
                        ? "Sending your inquiry."
                        : state.status === "error"
                          ? state.message
                          : "We reply within one working day."}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.1} className="rounded-panel border border-paper-line bg-paper p-7 sm:p-9">
              <h3 className="text-[0.8125rem] font-medium text-onlight-3">
                What happens after you send it
              </h3>

              <ol className="mt-6 space-y-6">
                {inquiry.next.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-[0.75rem] text-azure">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-onlight">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-onlight-3">
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-9 space-y-3.5 border-t border-paper-line pt-7">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-[0.875rem] text-onlight-3 transition-colors hover:text-onlight"
                >
                  <EnvelopeSimple size={15} className="text-onlight-3" aria-hidden="true" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-[0.875rem] text-onlight-3 transition-colors hover:text-onlight"
                >
                  <Phone size={15} className="text-onlight-3" aria-hidden="true" />
                  {contact.phone}
                </a>
                <p className="flex items-center gap-3 text-[0.875rem] text-onlight-3">
                  <MapPin size={15} className="text-onlight-3" aria-hidden="true" />
                  {contact.location}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}
