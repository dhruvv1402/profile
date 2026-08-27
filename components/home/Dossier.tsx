import { site } from "@/content/site";
import { publicFileMeta } from "@/lib/assets";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The dossier: the résumé, filed where a reader can open it or take a copy.
 *
 * Deliberately small — one drawn sheet, one filing line, two actions. The
 * nav and the contact block already point here-abouts; this is the section
 * a recruiter can land on and leave with the PDF in hand. It only renders
 * when the file exists (gated in page.tsx via resumeAvailable, same as the
 * nav link), so it can never offer a 404.
 */
export function Dossier({ index }: { index: string }) {
  const meta = publicFileMeta(site.resumeHref);
  const filed = meta
    ? new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric",
      }).format(meta.modified)
    : null;

  return (
    <section id="dossier" className="shell py-16 md:py-24">
      <SectionHead index={index} kicker="The dossier" note="For the record" />

      <Reveal className="grid grid-cols-12 items-center gap-x-6 gap-y-8 pt-10">
        {/* The sheet itself, drawn in the house hand. */}
        <div className="col-span-4 sm:col-span-3 lg:col-span-2">
          <a
            href={site.resumeHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open the résumé (PDF)"
            className="dossier-sheet block"
          >
            <span className="label">CV</span>
          </a>
        </div>

        <div className="col-span-8 sm:col-span-9 lg:col-span-10">
          <h3 className="display-lg">The r&eacute;sum&eacute;, as filed.</h3>
          <p className="label mt-2 text-ink-mute">
            One sheet &middot; PDF
            {meta ? <> &middot; {meta.kilobytes} KB</> : null}
            {filed ? <> &middot; filed {filed}</> : null}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
            <a
              href={site.resumeHref}
              target="_blank"
              rel="noreferrer noopener"
              className="label link-rule tap font-bold"
            >
              Read it in the browser &rarr;
            </a>
            <a
              href={site.resumeHref}
              download={`${site.fullName.replace(/\s+/g, "-")}-Resume.pdf`}
              className="label link-rule tap font-bold text-accent"
            >
              Download the PDF &darr;
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
