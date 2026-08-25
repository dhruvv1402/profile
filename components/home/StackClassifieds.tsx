import { stack } from "@/content/site";
import { padIndex } from "@/lib/utils";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { TypeDrum } from "./TypeDrum";

/**
 * The classifieds page: the stack broken into small ruled ad-blocks, with a
 * rotating type drum carrying the same list around a cylinder beside them.
 *
 * The drum is the ornament and the blocks are the content, and that division
 * is deliberate. This is the section a recruiter skims and an applicant
 * tracking system parses, so every technology stays plain, selectable text —
 * no icon fonts, no logo sprites, nothing a parser comes away from
 * empty-handed. The drum is aria-hidden and carries nothing that is not
 * already readable beside it.
 *
 * Rules are drawn with border utilities rather than the `.rule-*` classes,
 * because these need responsive and nth-child variants and the component
 * classes in globals.css do not accept them.
 */
export function StackClassifieds({ index }: { index: string }) {
  const total = stack.reduce((n, group) => n + group.items.length, 0);
  const everything = stack.flatMap((group) => group.items);

  return (
    <section id="stack" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="Classifieds &mdash; tools of the trade"
        note={`${total} entries`}
      />

      <div className="grid grid-cols-12 gap-x-8">
        {/* Hidden below lg: at tablet width the drum would either crowd the
            blocks or shrink until it is unreadable, and the blocks are the
            part that matters.

            Deliberately not wrapped in Reveal. A display:none element has no
            box, so the observer never reports it as intersecting and it stays
            stuck in the hidden pre-reveal state forever — invisible here only
            because it is already hidden, which is exactly the kind of latent
            trap that bites the next person to drop the `hidden`. It is also
            an ornament that animates on its own; it does not need a fade. */}
        <div className="col-span-4 hidden items-center lg:flex">
          <TypeDrum items={everything} />
        </div>

        <div className="col-span-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-8">
          {stack.map((group, i) => (
            <Reveal
              key={group.heading}
              delay={i * 0.05}
              // A left rule on every cell that is not first in its row, so the
              // blocks read as columns of a table rather than as loose cards.
              // Each breakpoint range owns its rule outright: setting one and
              // cancelling it with border-l-0 at the next puts two conflicting
              // border-left-width utilities in the same layer, and which one
              // wins comes down to Tailwind's sort order.
              className="border-b border-ink py-6 sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:pl-8"
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
      </div>
    </section>
  );
}
