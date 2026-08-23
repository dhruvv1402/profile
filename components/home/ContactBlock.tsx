import { site } from "@/content/site";
import { resumeAvailable } from "@/lib/assets";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticLink } from "@/components/motion/MagneticLink";

/**
 * The back page: one oversized instruction and an email address set large
 * enough that nobody has to hunt for it.
 *
 * A mailto rather than a form, on purpose. A contact form on a personal site
 * needs a backend, a spam defence, and a delivery guarantee, and it gives the
 * sender no copy of what they wrote. The address is the honest option.
 */
export function ContactBlock({ index }: { index: string }) {
  return (
    <section id="contact" className="shell py-16 md:py-24">
      <SectionHead index={index} kicker="Correspondence" note="Letters welcome" />

      <div className="grid grid-cols-12 gap-x-6 gap-y-10 pt-10">
        <Reveal className="col-span-12 lg:col-span-8">
          <p className="display-xl">
            Get in
            <br />
            touch.
          </p>

          <p className="mt-8 max-w-xl text-lg leading-snug text-ink-mute">
            Open to internships, freelance builds, and any conversation that
            starts with someone describing a problem they cannot stop thinking
            about.
          </p>

          <MagneticLink
            href={`mailto:${site.email}`}
            className="display-lg link-rule mt-8 break-all"
            strength={10}
          >
            {site.email}
          </MagneticLink>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-4" delay={0.1}>
          <div className="lg:border-l lg:border-ink lg:pl-6">
            <p className="label text-ink-mute">Found elsewhere</p>
            <ul className="mt-4 space-y-3">
              {site.socials.map((social) => (
                <li
                  key={social.href}
                  className="flex items-baseline justify-between gap-4 border-b border-ink pb-2"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label link-rule font-bold"
                  >
                    {social.label}
                  </a>
                  <span className="label text-ink-mute">{social.handle}</span>
                </li>
              ))}
            </ul>

            {resumeAvailable(site.resumeHref) ? (
              <a
                href={site.resumeHref}
                className="label link-rule mt-6 inline-block font-bold text-accent"
              >
                Download the r&eacute;sum&eacute; &darr;
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
