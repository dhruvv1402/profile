import Link from "next/link";
import { featuredProjects, projectLabel } from "@/content/projects";
import { publicFileExists } from "@/lib/assets";
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
 */
export function SelectedWork({ index }: { index: string }) {
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
    </section>
  );
}
