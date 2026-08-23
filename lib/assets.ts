import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Does this path exist under public/?
 *
 * The repo ships without real screenshots or a portrait, so components check
 * before rendering an <Image> and fall back to a ruled placeholder mat when a
 * file is missing. Dropping the real file in makes it appear — no code change,
 * no broken image icon in the meantime.
 *
 * Evaluated at build time on the server, so it costs nothing at runtime.
 */
export function publicFileExists(src: string) {
  if (!src.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Is there a real résumé to link to?
 *
 * The nav and the contact block hide the link until the PDF is actually in
 * public/. A résumé link that 404s is worse than no résumé link — it is the
 * one thing on a portfolio a recruiter is most likely to click.
 */
export function resumeAvailable(href: string) {
  return publicFileExists(href);
}
