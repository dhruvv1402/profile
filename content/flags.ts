import { site } from "./site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Whether this site is ready to be indexed by search engines.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Two conditions, both of which have to hold.
 *
 *  CONTENT_IS_REAL — the copy describes real work. This is now true: the site
 *  carries Dhruv Gupta's actual projects, education and experience. Nothing is
 *  invented; the case-study outcomes are empty rather than fabricated.
 *
 *  A real domain — `site.url` still says example.com until it is set. Indexing
 *  a site whose canonical URLs and Open Graph images all point at example.com
 *  is worse than not being indexed at all: search engines record the canonical,
 *  not the address they found the page on. So the gate closes on that too, and
 *  opens by itself the moment the real domain is filled in.
 *
 *  When this is false the whole site is noindex/nofollow, robots.txt disallows
 *  everything, and the sitemap is empty.
 */

const CONTENT_IS_REAL = true;

const HAS_REAL_DOMAIN =
  !site.url.includes("example.com") && !site.url.includes("localhost");

export const IS_INDEXABLE = CONTENT_IS_REAL && HAS_REAL_DOMAIN;
