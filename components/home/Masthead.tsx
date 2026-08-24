import Link from "next/link";
import { site } from "@/content/site";
import { featuredProjects, projectLabel, projects } from "@/content/projects";
import { formatDateline, padIndex } from "@/lib/utils";
import { PressImage } from "@/components/layout/PressImage";
import { Sticker } from "@/components/layout/Sticker";
import { SplitText } from "@/components/motion/SplitText";

/**
 * The front page.
 *
 * Laid out as a broadsheet: a dateline strip across the top, the name set as
 * large as the sheet allows, the roles running vertically up the right-hand
 * gutter, and beneath the fold rule a three-column arrangement — teaser rail,
 * standfirst, portrait — matching the reference.
 *
 * The composition is deliberately dense. An editorial front page earns its
 * white space by having somewhere to put it; a large void between sparse
 * columns reads as an unfinished layout rather than as air, so the rail
 * carries thumbnails, the centre column carries a contents block, and the
 * statement anchors the bottom-left corner.
 *
 * The date is resolved when the page is built, not when it is viewed, which is
 * exactly how a printed edition works.
 */
export function Masthead() {
  const edition = formatDateline(new Date());
  const latest = projects[0];
  // The rail thumbnails skip whatever is already called out as latest filing.
  const railProjects = featuredProjects
    .filter((project) => project.slug !== latest.slug)
    .slice(0, 2);

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

      {/* ── Below the fold line ─────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-6">
        {/* Left rail, ruled off like a newspaper sidebar. */}
        <aside className="col-span-12 flex flex-col sm:col-span-6 lg:col-span-3">
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
            {projectLabel(latest)}
          </Link>
          <p className="label mt-2 text-ink-mute">
            {latest.discipline}
            {latest.year ? ` — ${latest.year}` : ""}
          </p>

          {/* Thumbnails, each with a red index badge, as in the reference. */}
          {railProjects.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-4">
              {railProjects.map((project, i) => (
                <li key={project.slug}>
                  <Link href={`/work/${project.slug}`} className="group block">
                    <div className="relative">
                      <PressImage
                        src={project.cover.src}
                        alt={project.cover.alt}
                        ratio="1/1"
                        compact
                        sizes="(max-width: 1024px) 40vw, 12vw"
                        className="transition-opacity duration-300 group-hover:opacity-75"
                      />
                      <span className="label absolute left-0 top-0 bg-accent px-1.5 py-0.5 text-paper">
                        {padIndex(i + 2)}
                      </span>
                    </div>
                    <p className="label link-rule mt-2 block truncate">
                      {projectLabel(project)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {/* The shout, anchoring the bottom-left corner. `mt-auto` pins it to
              the foot of the rail so it sits on the portrait's baseline rather
              than floating mid-column. */}
          <p className="display-lg mt-auto pt-8">{site.statement}</p>
        </aside>

        {/* The deck: the standfirst a newspaper runs under a headline. */}
        <div className="col-span-12 flex flex-col justify-between sm:col-span-6 lg:col-span-5">
          <div>
            <hr className="rule mb-3 lg:hidden" />
            <p className="text-lg leading-snug">{site.deck}</p>

            {/* A contents block, the way a front page indexes its inside
                pages. It also gives this column something to hold. */}
            <div className="mt-8">
              <hr className="rule-thick" />
              <p className="label py-2">In this issue</p>
              <hr className="rule" />
              {/* Every project, not just the featured three — this is the
                  index, and a contents block that omits half the paper is not
                  doing its job. Numbered independently of the section folios
                  in page.tsx, so the two can never drift. */}
              <ol className="mt-3 space-y-2">
                {projects.map((project, i) => (
                  <li key={project.slug}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group flex items-baseline gap-3 py-1"
                    >
                      <span className="label text-accent">
                        {padIndex(i + 1)}
                      </span>
                      <span className="link-rule text-sm">
                        {projectLabel(project)}
                      </span>
                      <span className="label ml-auto text-ink-faint">
                        {project.year ?? ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              {/* Jump links to the rest of the page. Only the sections that
                  always render are listed; the conditional ones would leave a
                  dead anchor on a build where they are absent. */}
              <hr className="rule mt-4" />
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="label text-ink-faint">Also inside</span>
                {/* Separated by dots. Four mono uppercase phrases with only a
                    space between them read as one continuous string. */}
                {[
                  { label: "The author", href: "#about" },
                  { label: "Classifieds", href: "#stack" },
                  { label: "The chronicle", href: "#chronicle" },
                  { label: "Correspondence", href: "#contact" },
                ].map((item, i) => (
                  <span key={item.href} className="label flex items-baseline gap-2">
                    <span className="text-accent" aria-hidden="true">
                      {i === 0 ? "—" : "·"}
                    </span>
                    <a href={item.href} className="link-rule tap">
                      {item.label}
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
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
               the left is clipped rather than scrollable, so it would simply
               be sliced in half with nothing to indicate why. */
            <Sticker className="left-2 top-2 -rotate-12 lg:-left-6 lg:-top-6">
              {site.sticker}
            </Sticker>
          ) : null}
        </div>
      </div>
    </section>
  );
}
