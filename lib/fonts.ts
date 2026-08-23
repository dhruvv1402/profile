/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TYPEFACES — the single swap point for the whole site.
 * ─────────────────────────────────────────────────────────────────────────────
 * Three roles, three faces. Change a face here and it propagates everywhere,
 * because nothing else in the codebase names a font.
 *
 *   display  Bodoni Moda   the masthead. A Didone: hairline-thin horizontals
 *                          against fat verticals. This is what makes the page
 *                          read as a newspaper rather than a website.
 *   body     Newsreader     long-form editorial text. Designed for screens at
 *                          small sizes, with a large x-height.
 *   mono     Space Mono     micro-labels, datelines, captions, technical data.
 *                          The "typewriter" voice of the paper.
 *
 * SWAPPING IN A LICENSED FACE
 * Drop the .woff2 into `app/fonts/`, then replace the `display` export:
 *
 *   import localFont from "next/font/local";
 *   export const display = localFont({
 *     src: "../app/fonts/YourDidone.woff2",
 *     variable: "--f-display",
 *     display: "swap",
 *   });
 *
 * Nothing else needs to change.
 */
import { Bodoni_Moda, Newsreader, Space_Mono } from "next/font/google";

export const display = Bodoni_Moda({
  variable: "--f-display",
  subsets: ["latin"],
  display: "swap",
  // Variable optical-size axis. Pinned high so the masthead gets the
  // display cut — thinner hairlines, tighter fit — not the text cut.
  axes: ["opsz"],
});

export const body = Newsreader({
  variable: "--f-body",
  subsets: ["latin"],
  display: "swap",
  // No optical-size axis. Nothing sets font-variation-settings on body copy —
  // only the display face uses opsz — and carrying an unused axis makes the
  // preloaded file substantially larger. The body font is on the critical path
  // for LCP, so that weight is paid on every first visit for nothing.
});

export const mono = Space_Mono({
  variable: "--f-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

/** Applied to <html> in the root layout. */
export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
