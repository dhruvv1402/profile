import Link from "next/link";
import { featuredProjects, projectLabel } from "@/content/projects";
import { site } from "@/content/site";
import { publicFileExists } from "@/lib/assets";
import type { Repo } from "@/lib/github";
import { padIndex } from "@/lib/utils";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import {
  ProjectHoverImage,
  type HoverSlide,
} from "@/components/work/ProjectHoverImage";

/**
 * Selected work, set as a ruled index: number, title, discipline, year.
 *
 * The whole row is the link target, not just the title — a large hit area
 * matters more than a tidy underline. Hovering a row surfaces its cover image
 * under the pointer, which is handled by a single shared component rather than
 * one per row.
 *
 * Beneath the index runs the wire: recently-pushed public repositories,
 * live from the GitHub API and revalidated hourly, so the section proves
 * ongoing activity rather than asserting it. The repos are fetched by the
 * page and passed down; an empty list just means the wire block does not
 * print, and the curated index stands on its own.
 */
export function SelectedWork({
  index,
  repos = [],
}: {
  index: string;
  repos?: Repo[];
}) {
  // File existence is a server-side question, so it is resolved here and
  // handed to the client component as data.
  const slides: HoverSlide[] = featuredProjects.map((p) => ({
    slug: p.slug,
    src: p.cover.src,
    alt: p.cover.alt,
    exists: publicFileExists(p.cover.src),
  }));

  return (
    <section id="work" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="Selected work"
        note={`${featuredProjects.length} of ${featuredProjects.length} featured`}
      />

      <ProjectHoverImage slides={slides} />

      <ul>
        {featuredProjects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.06}>
            <Link
              href={`/work/${project.slug}`}
              data-hover-slug={project.slug}
              className="rule-b group grid grid-cols-12 items-baseline gap-x-4 py-6 transition-colors duration-300 hover:bg-paper-sub md:py-8"
            >
              <span className="label col-span-2 text-accent md:col-span-1">
                {padIndex(i + 1)}
              </span>

              <span className="display-lg col-span-10 md:col-span-6">
                {projectLabel(project)}
              </span>

              <span className="label col-span-7 col-start-3 mt-2 text-ink-mute md:col-span-3 md:col-start-auto md:mt-0">
                {project.discipline}
              </span>

              <span className="label col-span-3 mt-2 text-right md:col-span-2 md:mt-0">
                {project.year ?? ""}
                <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>

              {/* The summary is the reason to click. Given its own line so it
                  is not competing with the title for width. */}
              <span className="col-span-12 mt-3 max-w-2xl text-sm text-ink-mute md:col-span-9 md:col-start-2">
                {project.summary}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="pt-6">
        <Link href="/work" className="label link-rule font-bold">
          The complete index &rarr;
        </Link>
      </div>

      {/* ── Live from the wire ─────────────────────────────────────────── */}
      {repos.length > 0 ? (
        <div className="pt-14">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
              <h3 className="label">
                Live from the wire &mdash; recently pushed
              </h3>
              <span className="label text-ink-mute">Updated hourly</span>
            </div>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <caption className="label pb-4 pt-3 text-left text-ink-mute">
                Public repositories, straight from the GitHub API.
              </caption>

              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="label py-2 pr-4 font-bold">
                    Repository
                  </th>
                  <th scope="col" className="label py-2 pr-4 font-bold">
                    Description
                  </th>
                  <th scope="col" className="label py-2 pr-4 font-bold">
                    Language
                  </th>
                  <th scope="col" className="label py-2 text-right font-bold">
                    Stars
                  </th>
                </tr>
              </thead>

              <tbody>
                {repos.map((repo) => (
                  <tr
                    key={repo.name}
                    className="border-b border-ink transition-colors hover:bg-paper-sub"
                  >
                    <td className="py-3 pr-4 align-top">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-rule font-mono text-sm font-bold"
                      >
                        {repo.name}
                      </a>
                    </td>
                    <td className="max-w-md py-3 pr-4 align-top text-sm text-ink-mute">
                      {repo.description ?? (
                        <span aria-hidden="true">&mdash;</span>
                      )}
                    </td>
                    <td className="label py-3 pr-4 align-top">
                      {repo.language ?? <span aria-hidden="true">&mdash;</span>}
                    </td>
                    <td className="label py-3 text-right align-top">
                      {repo.stars > 0 ? (
                        <span className="text-accent">{repo.stars}</span>
                      ) : (
                        <span aria-hidden="true">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-6">
            <a
              href={`https://github.com/${site.github}`}
              target="_blank"
              rel="noreferrer noopener"
              className="label link-rule font-bold"
            >
              Full archive on GitHub &rarr;
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
