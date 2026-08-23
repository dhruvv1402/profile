import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadGoogleFont } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The tab icon: the initial, set in the display face on ink, with the red
 * spot colour as a rule beneath — the masthead compressed to 64 pixels.
 *
 * Generated rather than drawn so it tracks `site.name`: change the name in the
 * content file and the favicon follows, with no asset to re-export.
 */
export default async function Icon() {
  const initial = site.name.charAt(0).toUpperCase();
  const font = await loadGoogleFont("Bodoni Moda", 700, initial);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#14110f",
          color: "#f2efe8",
        }}
      >
        <div
          style={{
            fontFamily: font ? "Display" : "serif",
            fontSize: 46,
            lineHeight: 1,
            // Optical centring: a Didone cap sits high in its em box.
            marginTop: 2,
          }}
        >
          {initial}
        </div>
        <div style={{ width: 30, height: 4, backgroundColor: "#d93b22", marginTop: 4 }} />
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Display", data: font, weight: 700, style: "normal" }]
        : undefined,
    },
  );
}
