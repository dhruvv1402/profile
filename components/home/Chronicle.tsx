import { chronicle, collegeEvents } from "@/content/site";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Disclosure } from "@/components/motion/Disclosure";
import { PressImage } from "@/components/layout/PressImage";

/**
 * A record of proceedings: education and experience, dated, newest first.
 *
 * Set deliberately dry — no cards, no logos, no icons. A newspaper's record
 * columns are plain because the facts are the point, and a timeline that tries
 * to be exciting reads as though the entries could not carry themselves.
 *
 * Rendered as a description list: each entry is genuinely a term (the period)
 * and its details, so the markup says what the layout is showing.
 *
 * The college calendar — events staged at university, with photographs —
 * folds out of the Bennett education entry on request, keeping the landing
 * page to a single line about it. Without JavaScript the drawer stands
 * open. Empty the collegeEvents array in content/site.ts and the control
 * disappears entirely.
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
        {chronicle.map((entry, i) => {
          const carriesCalendar =
            entry.kind === "education" && collegeEvents.length > 0;

          return (
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

                {carriesCalendar ? (
                  <Disclosure
                    className="mt-5"
                    closedLabel={`+ Open the college calendar — ${collegeEvents.length} events staged`}
                    openLabel="− Close the college calendar"
                  >
                    <ul className="grid grid-cols-12 gap-x-6 gap-y-12 pb-2 pt-8">
                      {collegeEvents.map((event) => (
                        <li
                          key={event.title}
                          className="col-span-12 sm:col-span-6 lg:col-span-4"
                        >
                          <PressImage
                            src={event.photo.src}
                            alt={event.photo.alt}
                            ratio="3/2"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                            caption={`Fig. — ${event.title}, ${event.date}.`}
                          />

                          <div className="mt-4 flex items-baseline justify-between gap-4">
                            <span className="label text-accent">
                              {event.role}
                            </span>
                            <span className="label text-ink-mute">
                              {event.date}
                            </span>
                          </div>

                          <h4 className="display-lg mt-2">{event.title}</h4>
                          <p className="label mt-1 text-ink-mute">
                            {event.org}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                            {event.detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Disclosure>
                ) : null}
              </dd>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}
