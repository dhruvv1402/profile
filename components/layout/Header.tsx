import Link from "next/link";
import { nav, site } from "@/content/site";
import { resumeAvailable } from "@/lib/assets";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The folio bar: the thin strip a newspaper runs across the top of every page
 * carrying the publication name, the edition, and the section links.
 *
 * Deliberately not sticky. A newspaper's masthead does not follow you down the
 * page, and a fixed bar would sit on top of the oversized display type.
 */
export function Header() {
  // Hide the résumé link until the PDF is actually there. See resumeAvailable.
  const items = nav.filter(
    (item) => item.href !== site.resumeHref || resumeAvailable(site.resumeHref),
  );

  return (
    <header className="shell no-print">
      {/* Wraps rather than overflows. At 375px the byline plus four nav items
          is a few pixels too wide, and a folio bar that pushes the page into
          horizontal scroll is worse than one that runs to two lines. */}
      <div className="rule-b flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
        <Link
          href="/"
          className="label link-rule tap font-bold"
          aria-label={`${site.fullName} — home`}
        >
          {site.fullName}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-x-4 gap-y-1 sm:gap-5">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label link-rule tap">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
