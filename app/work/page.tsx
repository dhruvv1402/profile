import type { Metadata } from "next";
import Link from "next/link";
import { projects, projectLabel } from "@/content/projects";
import { site } from "@/content/site";
import { publicFileExists } from "@/lib/assets";
import { padIndex } from "@/lib/utils";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import {
  ProjectHoverImage,
  type HoverSlide,
} from "@/components/work/ProjectHoverImage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The complete index of projects, with a written account of the problem, the approach, and the outcome for each.",
  alternates: { canonical: "/work" },
};

/**
 * The complete index: every project, not just the featured ones, set as a
 * table of contents with the stack spelled out in full.
 *
 * The home page teases; this page is for someone who has decided to read.
 */
export default function WorkIndexPage() {
  const slides: HoverSlide[] = projects.map((p) => ({
    slug: p.slug,
    src: p.cover.src,
    alt: p.cover.alt,
    exists: publicFileExists(p.cover.src),
  }));

  return (
    <div className="shell pb-16 pt-10 md:pb-24">
      <header className="pb-10">
        <p className="label text-accent">The index</p>
        <h1 className="display-xl mt-2">Selected work</h1>
        <p className="mt-6 max-w-2xl text-lg leading-snug text-ink-mute">
          {site.workIntro}
        </p>
      </header>

      <SectionHead kicker="All filings" note={`${projects.length} entries`} />

      <ProjectHoverImage slides={slides} />

      <ul>
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05}>
            <Link
              href={`/work/${project.slug}`}
              data-hover-slug={project.slug}
              className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-ink py-6 transition-colors duration-300 hover:bg-paper-sub md:py-8"
            >
              <span className="label col-span-2 text-accent md:col-span-1">
                {padIndex(i + 1)}
              </span>

              <span className="display-lg col-span-10 md:col-span-5">
                {projectLabel(project)}
              </span>

              <span className="label col-span-7 col-start-3 text-ink-mute md:col-span-4 md:col-start-auto">
                {project.discipline}
              </span>

              {/* Three columns, not one. At 375px a single column is ~29px and
                  the year plus its arrow overflow the page. */}
              <span className="label col-span-3 text-right md:col-span-2">
                {project.year ?? ""}
                <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>

              <p className="col-span-12 mt-2 max-w-2xl text-sm text-ink-mute md:col-span-8 md:col-start-2">
                {project.summary}
              </p>

              {project.stack.length > 0 ? (
                <ul className="col-span-12 mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 md:col-span-8 md:col-start-2">
                  {project.stack.map((tech, t) => (
                    <li
                      key={tech}
                      className="label flex items-baseline gap-2 text-ink-faint"
                    >
                      {t > 0 ? <span aria-hidden="true">&middot;</span> : null}
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
