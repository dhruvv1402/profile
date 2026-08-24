import Link from "next/link";
import { bio, pullQuote, site } from "@/content/site";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The leader column: justified multi-column body text with a drop cap and a
 * pull quote, which is the most recognisably newspaper thing on the page.
 *
 * Columns are single on mobile and two from `md` up. Three columns at this
 * measure would drop below about 45 characters a line, which stops being
 * readable and starts being decoration.
 */
export function AboutColumn({ index }: { index: string }) {
  return (
    <section id="about" className="shell py-16 md:py-24">
      <SectionHead index={index} kicker="The author" note="Continued from front" />

      <div className="grid grid-cols-12 gap-x-6 gap-y-10 pt-8">
        <Reveal className="col-span-12 lg:col-span-8">
          <div className="columns-news dropcap md:columns-2">
            {bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {/* The pull quote, ruled off in its own column like a boxed aside. */}
        <Reveal className="col-span-12 lg:col-span-4" delay={0.1}>
          <div className="lg:rule-l lg:pl-6">
            <hr className="rule-thick mb-4" />
            {pullQuote ? (
              <>
                <blockquote className="display-lg">
                  &ldquo;{pullQuote}&rdquo;
                </blockquote>
                <hr className="rule mt-4" />
              </>
            ) : null}

            <dl className="mt-6 space-y-3">
              <div className="flex justify-between gap-4">
                <dt className="label text-ink-mute">Based in</dt>
                <dd className="label">{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label text-ink-mute">Status</dt>
                <dd className="label text-accent">Open to internships</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label text-ink-mute">Full account</dt>
                <dd className="label">
                  <Link href="/about" className="link-rule">
                    Read on &rarr;
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
