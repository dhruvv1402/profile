import { stopPress } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The stop press: the boxed late item a paper jams onto the front page
 * after the plates are made. One line on what is being built right now,
 * edited in content/site.ts — the box carries the classic double border
 * and sits a fraction off true, the way a late insert always does.
 *
 * Not a numbered section; it is an insert, so it takes no folio and the
 * running order ignores it. Null copy takes it off the page.
 */
export function StopPress() {
  if (!stopPress) return null;

  return (
    <aside aria-label="Stop press" className="shell pt-12">
      <Reveal>
        <div className="max-w-2xl -rotate-[0.4deg] border-[3px] border-ink p-1">
          <div className="border border-ink px-5 py-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="label font-bold text-accent">
                &#9632; Stop press
              </p>
              <p className="label text-ink-mute">This edition</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{stopPress}</p>
          </div>
        </div>
      </Reveal>
    </aside>
  );
}
