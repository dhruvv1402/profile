import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/content/site";
import { IS_INDEXABLE } from "@/content/flags";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WireTelemetry } from "@/components/layout/WireTelemetry";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { GridOverlay } from "@/components/layout/GridOverlay";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.roles[0]}`,
    template: `%s — ${site.fullName}`,
  },
  description: site.tagline,
  applicationName: site.fullName,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  keywords: [site.fullName, ...site.roles, "portfolio", "software engineer"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} — ${site.roles[0]}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.roles[0]}`,
    description: site.tagline,
  },
  // Inherited by every route. Placeholder copy must not be indexed — see
  // content/flags.ts.
  robots: IS_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/**
 * Runs before first paint. Two jobs, both of which have to happen before the
 * browser paints anything:
 *
 *   - restore the reader's chosen edition, or the page renders in day colours
 *     and snaps to night on hydration
 *   - mark the document as JavaScript-capable, which is what arms the hidden
 *     initial state of every scroll reveal. Without this class the reveals
 *     never hide, so a blocked or failed bundle degrades to a plain, complete,
 *     readable page instead of a blank one.
 *
 * Kept tiny and dependency-free because it blocks paint.
 */
const bootScript = `
document.documentElement.classList.add("js");
try {
  if (localStorage.getItem("edition") === "night") {
    document.documentElement.dataset.theme = "night";
  }
} catch (e) {}
console.log("%cSet in Bodoni Moda, Newsreader and Space Mono. Source: github.com/${site.github}", "font-family:Georgia,serif;font-size:12px");
`;

/** Tells search engines this page describes a person, not a company. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  url: site.url,
  jobTitle: site.roles[0],
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Keyboard users get out of the header in one press. */}
        <a
          href="#main"
          className="label tap sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>

        <SmoothScroll />
        {/* Alignment aid, development only — see GridOverlay. */}
        {process.env.NODE_ENV === "development" ? <GridOverlay /> : null}

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        {/* The wire's vitals, pinned to the corner on desktop. */}
        <WireTelemetry />

        <Analytics />
      </body>
    </html>
  );
}
