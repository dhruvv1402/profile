import Link from "next/link";

/**
 * The 404, kept in character: a page that went to press without this story on
 * it. Still gives the reader the three links they actually need.
 */
export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-2">
        <span className="label text-accent">Error 404</span>
        <span className="label text-ink-mute">Late edition</span>
      </div>

      <h1
        className="masthead pt-6"
        style={{ "--masthead-chars": 3 } as React.CSSProperties}
      >
        404
      </h1>

      <hr className="rule-double mt-4" />

      <div className="grid grid-cols-12 gap-x-8 gap-y-6 pt-8">
        <p className="col-span-12 max-w-xl text-lg leading-snug md:col-span-7">
          This story never made it to press. The page may have been renamed,
          moved, or spiked before the run.
        </p>

        <nav className="col-span-12 md:col-span-5 md:justify-self-end">
          <ul className="space-y-2 md:text-right">
            <li>
              <Link href="/" className="label link-rule font-bold">
                Front page
              </Link>
            </li>
            <li>
              <Link href="/work" className="label link-rule">
                The work index
              </Link>
            </li>
            <li>
              <Link href="/about" className="label link-rule">
                About the author
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
