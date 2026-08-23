import { stack } from "@/content/site";
import { padIndex } from "@/lib/utils";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The classifieds page: the stack broken into small ruled ad-blocks.
 *
 * This is the least glamorous section on the site and one of the most useful.
 * Recruiters and keyword scanners both read it literally, so every technology
 * is plain text — no icon fonts, no logo sprites, nothing a parser would come
 * away from empty-handed.
 *
 * The rules are drawn with border utilities rather than the `.rule-*` classes,
 * because these need responsive and nth-child variants and the component
 * classes in globals.css do not accept them.
 */
export function StackClassifieds({ index }: { index: string }) {
  const total = stack.reduce((n, group) => n + group.items.length, 0);

  return (
    <section id="stack" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="Classifieds &mdash; tools of the trade"
        note={`${total} entries`}
      />

      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <Reveal
            key={group.heading}
            delay={i * 0.05}
            // A left rule on every cell that is not first in its row, so the
            // blocks read as columns of a table rather than as loose cards.
            //
            // Each breakpoint range owns its rule outright — `sm:max-lg:` for
            // the two-up grid, `lg:` for the three-up. The obvious alternative,
            // setting the two-up rule and then cancelling it with border-l-0 at
            // lg, puts two conflicting border-left-width utilities in the same
            // cascade layer at the same breakpoint, and which one wins comes
            // down to Tailwind's internal sort order. That produced rules on
            // some rows and not others.
            className="border-b border-ink py-6 sm:max-lg:[&:nth-child(2n)]:border-l sm:max-lg:[&:nth-child(2n)]:pl-8 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:nth-child(3n+1))]:pl-8"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="label font-bold">{group.heading}</h3>
              <span className="label text-ink-faint">{padIndex(i + 1)}</span>
            </div>

            <ul className="mt-3 space-y-1">
              {group.items.map((item) => (
                <li key={item} className="flex items-baseline gap-2 text-sm">
                  <span className="text-accent" aria-hidden="true">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
