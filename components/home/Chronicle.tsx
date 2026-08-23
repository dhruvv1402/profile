import { chronicle } from "@/content/site";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A record of proceedings: education and experience, dated, newest first.
 *
 * Set deliberately dry — no cards, no logos, no icons. A newspaper's record
 * columns are plain because the facts are the point, and a timeline that tries
 * to be exciting reads as though the entries could not carry themselves.
 *
 * Rendered as a description list: each entry is genuinely a term (the period)
 * and its details, so the markup says what the layout is showing.
 */
export function Chronicle({ index }: { index: string }) {
  return (
    <section id="chronicle" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="The chronicle"
        note="Record of proceedings"
      />

      <dl className="pt-2">
        {chronicle.map((entry, i) => (
          <Reveal
            key={`${entry.period}-${entry.title}`}
            delay={i * 0.05}
            className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-ink py-6"
          >
            <dt className="label col-span-12 md:col-span-2">
              {entry.period}
              <span className="mt-1 block text-ink-faint">
                {entry.kind === "education" ? "Education" : "Experience"}
              </span>
            </dt>

            <dd className="col-span-12 md:col-span-10">
              <h3 className="display-lg">{entry.title}</h3>
              <p className="label mt-1 text-accent">{entry.org}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-mute">
                {entry.detail}
              </p>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
