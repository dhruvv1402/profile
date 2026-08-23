import Link from "next/link";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { formatDateline } from "@/lib/utils";
import { PressImage } from "@/components/layout/PressImage";
import { SplitText } from "@/components/motion/SplitText";

/**
 * The front page.
 *
 * Laid out as a broadsheet: a dateline strip across the top, the name set as
 * large as the sheet allows, the roles running vertically up the right-hand
 * gutter, and a teaser column down the left — the same arrangement as the
 * reference.
 *
 * The date is resolved when the page is built, not when it is viewed, which
 * is exactly how a printed edition works.
 */
export function Masthead() {
  const edition = formatDateline(new Date());
  const latest = projects[0];

  return (
    <section className="shell pb-6">
      {/* ── Dateline strip ─────────────────────────────────────────────── */}
      <div className="rule-b flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2">
        <span className="label">Vol. I &mdash; No. 1</span>
        <span className="label text-ink-mute hidden sm:block">{edition}</span>
        <span className="label">
          <span className="text-accent">&#9679;</span> {site.location}
        </span>
      </div>

      {/* ── The name, with the roles running up the right gutter ───────── */}
      <div className="grid grid-cols-12">
        {/* --masthead-chars drives the type size, so the name fills the
            measure whether it is four characters or fourteen. */}
        <h1
          className="masthead col-span-12 pt-4 lg:col-span-10 lg:pt-6"
          style={{ "--masthead-chars": site.name.length } as React.CSSProperties}
        >
          <SplitText text={site.name} />
        </h1>

        {/* Desktop: vertical, reading bottom-to-top, as in the reference.
            `flex-col` is load-bearing. In vertical writing mode the inline
            axis runs down the page, so a default row flex stacks the roles
            end-to-end into one ~900px column and drags the whole grid row
            down with it. Column direction lays them out side by side, which
            is the arrangement the reference actually shows. */}
        <div className="col-span-2 hidden justify-end pt-6 lg:flex">
          <ul className="vertical-up label flex flex-col gap-4">
            {site.roles.map((role) => (
              <li key={role} className="whitespace-nowrap">
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile: the same roles, set horizontally under the name. */}
      <ul className="label mt-4 flex flex-wrap gap-x-3 gap-y-1 lg:hidden">
        {site.roles.map((role, i) => (
          <li key={role} className="flex items-center gap-3">
            {i > 0 ? <span className="text-accent">&#9679;</span> : null}
            {role}
          </li>
        ))}
      </ul>

      <hr className="rule-double mt-4" />

      {/* ── Below the fold line: teaser, deck, portrait ─────────────────── */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-6">
        {/* Left teaser column, ruled off like a newspaper sidebar. */}
        <aside className="col-span-12 sm:col-span-6 lg:col-span-3">
          <p className="label text-accent">All work!</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-mute">
            {site.tagline}
          </p>
          <hr className="rule my-4" />
          <p className="label text-ink-mute">Latest filing</p>
          <Link
            href={`/work/${latest.slug}`}
            className="link-rule display-lg mt-1 block"
          >
            {latest.title}
          </Link>
          <p className="label mt-2 text-ink-mute">
            {latest.discipline} &mdash; {latest.year}
          </p>
        </aside>

        {/* The deck: the standfirst a newspaper runs under a headline. */}
        <div className="col-span-12 flex flex-col justify-between sm:col-span-6 lg:col-span-5">
          <div>
            <hr className="rule mb-3 lg:hidden" />
            <p className="text-lg leading-snug">
              Currently an undergraduate, permanently a builder. This is the
              record of what I have made, why I made it that way, and what it
              cost to find out.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/work" className="label link-rule font-bold">
              Read the work &rarr;
            </Link>
            <a href={`mailto:${site.email}`} className="label link-rule">
              {site.email}
            </a>
          </div>
        </div>

        {/* The portrait, framed and captioned like a press photograph. */}
        <div className="col-span-12 lg:col-span-4">
          <PressImage
            src={site.portrait.src}
            alt={site.portrait.alt}
            caption={site.portrait.caption}
            ratio="4/5"
            priority
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
