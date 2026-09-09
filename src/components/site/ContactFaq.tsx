import { Plus } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactPage } from "@/lib/content";

/**
 * Layout family: native disclosure list, three questions. Light band,
 * closes the page before the footer. `<details>` rather than a JS
 * accordion: three items do not need client state, and this keeps the page
 * usable with JavaScript disabled.
 */
export function ContactFaq() {
  return (
    <section className="relative bg-paper py-20 sm:py-24">
      <Container className="max-w-[46rem]">
        <Reveal className="divide-y divide-paper-line border-t border-paper-line">
          {contactPage.faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.9375rem] font-medium text-onlight marker:content-none">
                {faq.q}
                <Plus
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-onlight-3 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-[58ch] text-[0.875rem] leading-relaxed text-onlight-3">
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
