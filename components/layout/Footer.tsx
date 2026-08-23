import Link from "next/link";
import { site } from "@/content/site";

/**
 * The colophon. Printed books name their typefaces and their press at the
 * back; this does the same, which is both a nod to the form and a quiet
 * statement of how the thing was made.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell no-print pb-10">
      <hr className="rule-double mb-4" />

      <div className="grid gap-6 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div>
          <p className="label text-ink-mute max-w-md leading-relaxed">
            Colophon — set in Bodoni Moda, Newsreader, and Space Mono. Built
            with Next.js and Tailwind CSS. Composed, printed, and served from
            the edge.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="label link-rule tap"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="label text-ink-mute md:text-right">
          &copy; {year} {site.fullName}
          <br />
          <Link href="/" className="link-rule tap">
            Back to front page
          </Link>
        </p>
      </div>
    </footer>
  );
}
