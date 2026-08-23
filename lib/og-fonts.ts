import "server-only";

/**
 * Fetch a Google font as a TTF buffer for use in an ImageResponse.
 *
 * Satori — the renderer behind ImageResponse — only accepts ttf, otf, and
 * woff, so this deliberately asks Google for the legacy format. Google decides
 * which format to serve from the User-Agent, and a modern one gets woff2,
 * which Satori cannot parse. Sending no User-Agent gets ttf.
 *
 * `text` narrows the request to only the glyphs actually being rendered, which
 * keeps the download to a few kilobytes and stays well inside the 500KB budget
 * an ImageResponse has for everything it bundles.
 *
 * Returns null on any failure. The caller falls back to Satori's built-in font
 * rather than failing the build, because a plain OG card beats no site.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url =
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}` +
      `&text=${encodeURIComponent(text)}`;

    const cssResponse = await fetch(url);
    if (!cssResponse.ok) return null;
    const css = await cssResponse.text();

    // Prefer an explicit truetype source; fall back to the first url() found.
    const resource =
      css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/)?.[1] ??
      css.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!resource) return null;

    const fontResponse = await fetch(resource);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}
