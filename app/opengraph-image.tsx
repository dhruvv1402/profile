import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadGoogleFont } from "@/lib/og-fonts";

export const alt = `${site.fullName} — ${site.roles[0]}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card: the masthead, reduced to a front page that fits in a
 * timeline preview.
 *
 * Satori supports flexbox and a subset of CSS — no grid, no CSS variables — so
 * this is written flat with literal colours rather than reaching for the
 * design tokens. The values are copied from globals.css; if the palette
 * changes, change them here too.
 */
export default async function OpenGraphImage() {
  const roleLine = site.roles.slice(0, 2).join("  ·  ");

  // The card is set in uppercase via CSS, but Google subsets the font to
  // exactly the characters asked for. Requesting only the source strings would
  // leave every uppercased glyph missing, and Satori would silently swap in its
  // fallback face mid-word. Ask for both cases.
  const source = `${site.name}${site.fullName}${roleLine}${site.location}Vol. I — No. 1`;
  const glyphs = `${source}${source.toUpperCase()}${source.toLowerCase()}`;

  const [display, mono] = await Promise.all([
    loadGoogleFont("Bodoni Moda", 700, glyphs),
    loadGoogleFont("Space Mono", 700, glyphs),
  ]);

  const fonts = [
    display && { name: "Display", data: display, weight: 700 as const, style: "normal" as const },
    mono && { name: "Mono", data: mono, weight: 700 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[];

  const monoFamily = mono ? "Mono" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f2efe8",
          color: "#14110f",
          padding: "56px 64px",
        }}
      >
        {/* Dateline strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: monoFamily,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            borderBottom: "1px solid #14110f",
            paddingBottom: 16,
          }}
        >
          <span>Vol. I — No. 1</span>
          <span style={{ color: "#d93b22" }}>{site.location}</span>
        </div>

        {/* The name, set as large as the card allows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: display ? "Display" : "serif",
              fontSize: 200,
              lineHeight: 0.85,
              letterSpacing: -6,
            }}
          >
            {site.name}
          </div>
        </div>

        {/* Roles, under a double rule */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, backgroundColor: "#14110f" }} />
          <div style={{ height: 3, backgroundColor: "#14110f", marginTop: 3 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: monoFamily,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              paddingTop: 20,
              gap: 40,
            }}
          >
            <span>{roleLine}</span>
            {/* Never allowed to wrap: the byline colliding with the roles is
                the one thing that would make the card look broken. */}
            <span style={{ color: "#d93b22", flexShrink: 0, whiteSpace: "nowrap" }}>
              {site.fullName}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
