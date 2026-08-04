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
 * Layout family: form beside a supporting panel. Used once.
 *
 * Contrast, checked against --color-ink:
 *   labels     #a9b4cc on #05070f  = 8.7:1
 *   input text #eef2fb on #101a2e  = 15:1
 *   helper     #7986a3 on #101a2e  = 4.7:1
 *   errors     #ff9aa8 on #05070f  = 9.3:1
 *   focus ring #3d6ef7 border against the input fill clears the 3:1 non-text bar
 *
 * Labels sit above every control, helper text under it, error text below that.
 * There are no placeholders standing in for labels.
 *
 * Mobile (< 1024px): the panel moves below the form, field pairs go single column.
 */

const control =
  "w-full rounded-control border border-line-2 bg-panel-2 px-3.5 py-3 text-[0.9375rem] text-fg " +
  "outline-none transition-[border-color,box-shadow] duration-200 " +
  "focus:border-azure focus:ring-2 focus:ring-azure/25 " +
  "aria-[invalid=true]:border-alert/70 disabled:opacity-60";

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
      <label htmlFor={name} className="text-[0.8125rem] font-medium text-fg-2">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="text-[0.75rem] text-fg-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="text-[0.75rem] text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Inquiry() {
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
    <section id="inquiry" className="relative overflow-hidden bg-ink py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_20%_0%,rgb(120_98_190/0.16),transparent_70%)]"
      />

      <Container>
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">
                {inquiry.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
                {inquiry.heading}
              </h2>
              <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-fg-2">
                {inquiry.body}
              </p>
            </Reveal>

            <div className="mt-10">
              {state.status === "success" ? (
                <div className="glass rounded-panel p-8 sm:p-10">
                  <span className="grid size-10 place-items-center rounded-full bg-ok/15 text-ok ring-1 ring-ok/30">
                    <Check size={17} weight="bold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-[1.25rem] font-semibold text-fg">
                    Inquiry received
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-fg-2">
                    {state.message} If it is urgent, email us at{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-violet-soft underline decoration-violet/40 underline-offset-4 hover:decoration-violet"
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
                            <option key={band} value={band} className="bg-panel-2 text-fg">
                              {band}
                            </option>
                          ))}
                        </select>
                        <CaretDown
                          size={14}
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-3"
                        />
                      </div>
                    </Field>

                    <div className="sm:col-span-2">
                      <Field
                        name="bottleneck"
                        label="What is slowing you down?"
                        hint="Two or three sentences about the process is plenty."
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
                        state.status === "error" ? "text-alert" : "text-fg-3"
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
            <Reveal delay={0.1} className="glass-strong rounded-panel p-7 sm:p-9">
              <h3 className="text-[0.8125rem] font-medium text-fg-3">
                What happens after you send it
              </h3>

              <ol className="mt-6 space-y-6">
                {inquiry.next.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-[0.75rem] text-violet-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-fg">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-fg-2">
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-9 space-y-3.5 border-t border-white/[0.07] pt-7">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-[0.875rem] text-fg-2 transition-colors hover:text-fg"
                >
                  <EnvelopeSimple size={15} className="text-fg-3" aria-hidden="true" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-[0.875rem] text-fg-2 transition-colors hover:text-fg"
                >
                  <Phone size={15} className="text-fg-3" aria-hidden="true" />
                  {contact.phone}
                </a>
                <p className="flex items-center gap-3 text-[0.875rem] text-fg-2">
                  <MapPin size={15} className="text-fg-3" aria-hidden="true" />
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
