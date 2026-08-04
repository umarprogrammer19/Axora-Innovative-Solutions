import { EnvelopeSimple, LinkedinLogo, MapPin, Phone, XLogo } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { contact, footer } from "@/lib/content";

const socials = [
  { label: "Axora on LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedinLogo },
  { label: "Axora on X", href: "https://x.com/", Icon: XLogo },
];

/**
 * Layout family: multi-column footer. Used once.
 * Mobile (< 640px): every column stacks, the legal row wraps under the copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-2">
      <div aria-hidden="true" className="h-px w-full rule-fade" />

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <a href="#top" className="inline-block" aria-label="Axora Innovative Solutions, home">
              <Wordmark />
            </a>
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-fg-2">
              We design, build, and run the automation that takes manual work out of
              your operation.
            </p>

            <ul className="mt-7 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-control border border-line text-fg-2 transition-colors duration-200 hover:border-line-2 hover:text-fg"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="text-[0.8125rem] font-medium text-fg">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.875rem] text-fg-2 transition-colors duration-200 hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-[0.8125rem] font-medium text-fg">Get in touch</h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-[0.875rem] text-fg-2 transition-colors duration-200 hover:text-fg"
                >
                  <EnvelopeSimple size={15} className="mt-0.5 shrink-0 text-fg-3" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-[0.875rem] text-fg-2 transition-colors duration-200 hover:text-fg"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-fg-3" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.875rem] text-fg-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-fg-3" aria-hidden="true" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-fg-3">
            &copy; {year} Axora Innovative Solutions. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.8125rem] text-fg-3 transition-colors duration-200 hover:text-fg-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
