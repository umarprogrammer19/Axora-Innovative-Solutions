import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactPage } from "@/lib/content";

/**
 * Layout family: three channels in one unified row, separated by hairlines
 * rather than three bordered cards (three identical boxes side by side is
 * the generic default this page is deliberately avoiding). White band.
 *
 * Mobile (< 640px): channels stack, hairline moves from vertical to
 * horizontal between them.
 */
export function ContactChannels() {
  return (
    <section className="relative bg-panel-light py-20 sm:py-24">
      <Container>
        <Reveal className="grid grid-cols-1 divide-y divide-paper-line border-y border-paper-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {contactPage.channels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              className="group flex flex-col gap-3 px-0 py-8 transition-colors duration-200 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <h3 className="text-[1.0625rem] font-semibold text-onlight">{channel.title}</h3>
              <p className="max-w-[30ch] text-[0.875rem] leading-relaxed text-onlight-3">
                {channel.body}
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-azure transition-colors duration-200 group-hover:text-azure-deep">
                {channel.action}
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 text-center text-[0.8125rem] text-onlight-3">{contactPage.hours}</p>
        </Reveal>
      </Container>
    </section>
  );
}
