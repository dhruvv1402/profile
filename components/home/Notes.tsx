import { notes } from "@/content/site";
import { padIndex } from "@/lib/utils";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/** "2026-04-12" -> "12 APR 2026", to match the dateline voice. */
function formatNoteDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

/**
 * Notes: short write-ups, set as a headline list.
 *
 * Renders nothing when the array is empty, which is the whole point of the
 * design. A writing section with no writing in it is worse than no writing
 * section — it advertises abandonment, and "Coming soon" is the most common
 * dead link on a student portfolio.
 */
export function Notes({ index }: { index: string }) {
  if (notes.length === 0) return null;

  return (
    <section id="notes" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="Notes from the desk"
        note={`${notes.length} ${notes.length === 1 ? "entry" : "entries"}`}
      />

      <ul>
        {notes.map((note, i) => {
          const external = !note.href.startsWith("/");

          return (
            <Reveal as="li" key={note.href} delay={i * 0.06}>
              <a
                href={note.href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-ink py-6 transition-colors duration-300 hover:bg-paper-sub"
              >
                <span className="label col-span-2 text-accent md:col-span-1">
                  {padIndex(i + 1)}
                </span>

                <h3 className="display-lg col-span-10 md:col-span-8">
                  {note.title}
                </h3>

                <span className="label col-span-12 col-start-3 text-ink-mute md:col-span-3 md:col-start-auto md:text-right">
                  {formatNoteDate(note.date)}
                  <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    {external ? "↗" : "→"}
                  </span>
                </span>

                {/* mt-3, not the grid's gap-y-2. Note titles wrap to two or
                    three lines at display-lg's 0.92 leading, and the descenders
                    of the last line land almost on top of the summary. */}
                <p className="col-span-12 mt-3 max-w-2xl text-sm text-ink-mute md:col-span-8 md:col-start-2">
                  {note.summary}
                </p>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
