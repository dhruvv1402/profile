import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  getProjectNeighbours,
  projectLabel,
  projects,
} from "@/content/projects";
import { padIndex } from "@/lib/utils";
import { PressImage } from "@/components/layout/PressImage";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/** Every case study is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

/**
 * A case study, set as a feature article.
 *
 * The running order is deliberate: problem, approach, outcome, reflection. It
 * is the order an engineer reading this actually wants — what was wrong, what
 * you did, whether it worked, and whether you know why. The reflection is last
 * and it is not optional; being able to say what you would change is the part
 * that separates a project from an exercise.
 */
export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(slug);

  // Only the passages that actually have a body. `outcome` and `reflection`
  // ship empty rather than fabricated, so most studies are partial for now.
  const passages = (
    [
      ["The problem", project.study.problem],
      ["The approach", project.study.approach],
      ["The outcome", project.study.outcome],
      ["In hindsight", project.study.reflection],
    ] as const
  ).filter(([, body]) => body.trim());
  const hasStudy = passages.length > 0;

  return (
    <article className="shell pb-16 pt-10 md:pb-24">
      {/* ── Headline block ──────────────────────────────────────────────── */}
      <header>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-2">
          <span className="label text-accent">{project.discipline}</span>
          {project.year ? (
            <span className="label text-ink-mute">{project.year}</span>
          ) : null}
        </div>

        <h1 className="display-xl pt-6">{project.title}</h1>

        <p className="mt-6 max-w-3xl text-xl leading-snug">{project.summary}</p>

        {/* Only the facts the content file actually carries. The résumé does
            not state a role or a team size for every project, and an empty
            "Role —" row is worse than no row. */}
        {project.award || project.role || project.context || project.stack.length > 0 ? (
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink pt-6 md:grid-cols-4">
            {project.award ? (
              <div className="col-span-2">
                <dt className="label text-ink-mute">Award</dt>
                <dd className="mt-1 text-sm text-accent">{project.award}</dd>
              </div>
            ) : null}
            {project.role ? (
              <div>
                <dt className="label text-ink-mute">Role</dt>
                <dd className="mt-1 text-sm">{project.role}</dd>
              </div>
            ) : null}
            {project.context ? (
              <div>
                <dt className="label text-ink-mute">Context</dt>
                <dd className="mt-1 text-sm">{project.context}</dd>
              </div>
            ) : null}
            {project.stack.length > 0 ? (
              <div className="col-span-2">
                <dt className="label text-ink-mute">Stack</dt>
                <dd className="mt-1 text-sm">{project.stack.join(" · ")}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {project.links.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink pt-6">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-rule font-bold"
                >
                  {/* Literal glyph, not &nearr; — that entity is not in the
                      JSX text entity table and renders as raw source. */}
                  {link.label} &#8599;
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {/* ── Cover ───────────────────────────────────────────────────────── */}
      <Reveal className="pt-12">
        <PressImage
          src={project.cover.src}
          alt={project.cover.alt}
          caption={project.cover.caption}
          ratio="16/9"
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
      </Reveal>

      {/* ── The account ─────────────────────────────────────────────────── */}
      {/* The layout depends on whether a study has been written. With
          passages, the account takes eight columns and the highlights sit in
          a ruled rail beside it. Without them, that rail would be stranded
          next to eight columns of nothing, so the highlights spread across
          the full measure instead. */}
      {hasStudy ? (
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 pt-16">
          <div className="col-span-12 space-y-12 lg:col-span-8">
            {passages.map(([heading, body], i) => (
              <Passage
                key={heading}
                index={padIndex(i + 1)}
                heading={heading}
                body={body}
              />
            ))}
          </div>

          {project.highlights.length > 0 ? (
            <Reveal className="col-span-12 lg:col-span-4" delay={0.1}>
              <div className="lg:border-l lg:border-ink lg:pl-8">
                <SectionHead kicker="Of note" />
                <ul className="mt-4 space-y-4">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 border-b border-ink pb-4 text-sm leading-relaxed"
                    >
                      <span className="text-accent" aria-hidden="true">
                        &#9679;
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>
      ) : project.highlights.length > 0 ? (
        <Reveal className="pt-16">
          <SectionHead kicker="Of note" />
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 border-b border-ink py-4 text-sm leading-relaxed"
              >
                <span className="text-accent" aria-hidden="true">
                  &#9679;
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {/* ── Gallery, if the project has one ─────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 ? (
        <div className="pt-16">
          <SectionHead kicker="Plates" note={`${project.gallery.length} figures`} />
          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
            {project.gallery.map((plate) => (
              <Reveal key={plate.src}>
                <PressImage
                  src={plate.src}
                  alt={plate.alt}
                  caption={plate.caption}
                  ratio="4/3"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── Continue reading ────────────────────────────────────────────── */}
      <nav className="mt-20 border-t border-ink pt-6" aria-label="More work">
        <div className="grid grid-cols-2 gap-6">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group">
              <span className="label text-ink-mute">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                  &larr;
                </span>{" "}
                Previous
              </span>
              <span className="display-lg link-rule mt-2 block">
                {projectLabel(prev)}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/work/${next.slug}`} className="group text-right">
              <span className="label text-ink-mute">
                Next{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
              <span className="display-lg link-rule mt-2 block">
                {projectLabel(next)}
              </span>
            </Link>
          ) : null}
        </div>

        <Link href="/work" className="label link-rule mt-10 inline-block">
          Back to the index
        </Link>
      </nav>
    </article>
  );
}

/**
 * One numbered passage of the case study.
 *
 * An empty body renders nothing at all. `outcome` and `reflection` ship empty
 * rather than fabricated, and a heading standing over blank space would look
 * like a bug — or worse, like something failed to load.
 */
function Passage({
  index,
  heading,
  body,
}: {
  index: string;
  heading: string;
  body: string;
}) {
  if (!body.trim()) return null;

  return (
    <Reveal as="section">
      <div className="flex items-baseline gap-4 border-b border-ink pb-2">
        <span className="label text-accent">{index}</span>
        <h2 className="label font-bold">{heading}</h2>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
        {body}
      </p>
    </Reveal>
  );
}
