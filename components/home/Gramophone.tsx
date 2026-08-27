import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Turntable } from "@/components/home/Turntable";

/**
 * The gramophone: what the author is playing, live from Spotify.
 *
 * The section only renders at all when the Spotify credentials exist — the
 * gate lives in page.tsx beside the other conditional sections, so the
 * folio numbering stays unbroken either way. The live needle position is
 * fetched client-side by Turntable, because this page is otherwise static.
 */
export function Gramophone({ index }: { index: string }) {
  return (
    <section id="gramophone" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="The gramophone"
        note="From the author's desk"
      />
      <Reveal className="pt-10">
        <Turntable />
      </Reveal>
    </section>
  );
}
