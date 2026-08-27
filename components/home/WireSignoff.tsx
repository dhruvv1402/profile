import { Reveal } from "@/components/motion/Reveal";

/**
 * The wire closes before the letters page: a ruled strip in the mono voice,
 * the way a service marks the end of a day's feed. It carries no folio
 * number — it is punctuation between the last section and Correspondence,
 * not a section itself.
 */
export function WireSignoff() {
  return (
    <div className="shell pt-16 md:pt-24">
      <Reveal>
        <div className="flex items-center gap-4">
          <hr className="rule flex-1" />
          <p className="label">&mdash; end of transmission &mdash;</p>
          <hr className="rule flex-1" />
        </div>
        <p className="label mt-3 text-center text-ink-mute">
          Wire closed for this edition &middot; correspondence follows
        </p>
      </Reveal>
    </div>
  );
}
