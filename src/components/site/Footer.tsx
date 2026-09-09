import Link from "next/link";
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { contact, footer } from "@/lib/content";

const socials = [
  { label: "Axora on LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedinLogo },
  { label: "Axora on X", href: "https://x.com/", Icon: XLogo },
  { label: "Axora on YouTube", href: "https://youtube.com/", Icon: YoutubeLogo },
  { label: "Axora on Instagram", href: "https://instagram.com/", Icon: InstagramLogo },
  { label: "Axora on Facebook", href: "https://facebook.com/", Icon: FacebookLogo },
];

/**
 * Layout family: multi-column footer. Used once.
 * bg-ink, not bg-ink-2: the footer is the one surface on the page that should
 * read as unambiguously black.
 * Mobile (< 1024px): every column stacks, the legal row wraps under the copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block" aria-label="Axora Innovative Solutions, home">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-[32ch] text-[0.875rem] leading-relaxed text-fg-2">
              {footer.blurb}
            </p>

            <ul className="mt-7 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-full border border-line text-fg-2 transition-colors duration-200 hover:border-line-2 hover:text-fg"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="text-[0.8125rem] font-semibold text-fg">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.8125rem] text-fg-2 transition-colors duration-200 hover:text-azure-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-[0.8125rem] font-semibold text-fg">{footer.getInTouch.heading}</h2>
            <p className="mt-5 text-[0.8125rem] text-fg-2">{footer.getInTouch.blurb}</p>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-[0.8125rem] text-fg-2 transition-colors duration-200 hover:text-azure-soft"
                >
                  <EnvelopeSimple size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-[0.8125rem] text-fg-2 transition-colors duration-200 hover:text-azure-soft"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.8125rem] text-fg-2">
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-fg-3">
            &copy; {year} Axora Innovative Solutions. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[0.8125rem] text-fg-3 transition-colors duration-200 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
