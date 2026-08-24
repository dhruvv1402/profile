import Link from "next/link";
import { site } from "@/content/site";
import { formatDateline } from "@/lib/utils";
import { PressImage } from "@/components/layout/PressImage";
import { Sticker } from "@/components/layout/Sticker";
import { SplitText } from "@/components/motion/SplitText";

/**
 * The front page.
 *
 * A dateline strip, the name set as large as the sheet allows, the roles
 * running up the right-hand gutter, and beneath the fold rule three columns:
 * teaser rail, standfirst, portrait.
 *
 * It carried more than that for a while — a contents list, jump links, project
 * thumbnails, a "latest filing" pointer — and every one of them repeated
 * something the reader meets a screen later in Selected Work. Density is not
 * the same as substance; a front page earns its authority by being certain
 * about what matters, not by getting everything above the fold. What is left
 * appears exactly once.
 *
 * The date resolves when the page is built, not when it is viewed, which is
 * how a printed edition works.
 */
export function Masthead() {
  const edition = formatDateline(new Date());

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
            end-to-end into one ~900px column and drags the grid row down with
            it. Column direction lays them side by side. */}
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

      {/* ── Below the fold line ─────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-6">
        {/* Left rail. Two things: what this is, and what he is after. */}
        <aside className="col-span-12 flex flex-col sm:col-span-6 lg:col-span-3">
          <p className="label text-accent">All work!</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-mute">
            {site.tagline}
          </p>

          {/* `mt-auto` pins the shout to the foot of the rail so it sits on
              the portrait's baseline rather than floating mid-column. */}
          <p className="display-lg mt-auto pt-10">{site.statement}</p>
        </aside>

        {/* The standfirst a newspaper runs under a headline. */}
        <div className="col-span-12 flex flex-col justify-between sm:col-span-6 lg:col-span-5">
          <div>
            <hr className="rule mb-3 lg:hidden" />
            <p className="text-lg leading-snug">{site.deck}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/work" className="label link-rule tap font-bold">
              Read the work &rarr;
            </Link>
            <a href={`mailto:${site.email}`} className="label link-rule tap">
              {site.email}
            </a>
          </div>
        </div>

        {/* The portrait, framed and captioned like a press photograph. */}
        <div className="relative col-span-12 lg:col-span-4">
          <PressImage
            src={site.portrait.src}
            alt={site.portrait.alt}
            caption={site.portrait.caption}
            ratio="4/5"
            priority
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          {site.sticker ? (
            /* Sits inside the frame on small screens. Hung off the corner it
               would run past the left edge of the viewport, and overflow to
               the left is clipped rather than scrollable, so it would be
               sliced in half with nothing to indicate why. */
            <Sticker className="left-2 top-2 -rotate-12 lg:-left-6 lg:-top-6">
              {site.sticker}
            </Sticker>
          ) : null}
        </div>
      </div>
    </section>
  );
}
