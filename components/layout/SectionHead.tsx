import { cn } from "@/lib/utils";
import { RollingIndex } from "@/components/motion/RollingIndex";

type Props = {
  /** Section number, e.g. "03". Set in the accent colour, like a page folio. */
  index?: string;
  /** The mono kicker above the rule, e.g. "SELECTED WORK". */
  kicker: string;
  /** Optional right-hand note: a count, a date, a status. */
  note?: string;
  className?: string;
};

/**
 * The header every section shares: a thick rule with a mono kicker sitting
 * directly beneath it, and an optional note pushed to the right margin.
 *
 * The folio rolls up like a mechanical counter as the section enters — the
 * one moment of motion every section is allowed. It degrades to plain
 * print without JavaScript or under reduced motion.
 *
 * Consistency here is what makes the page scan as one printed object. Resist
 * the urge to give a section its own bespoke heading treatment.
 */
export function SectionHead({ index, kicker, note, className }: Props) {
  return (
    <div className={cn("w-full", className)}>
      <hr className="rule-thick" />
      <div className="flex items-baseline justify-between gap-4 py-2">
        <h2 className="label flex items-baseline gap-3">
          {index ? (
            <span className="text-accent">
              <RollingIndex value={index} />
            </span>
          ) : null}
          <span>{kicker}</span>
        </h2>
        {note ? <span className="label text-ink-mute">{note}</span> : null}
      </div>
      <hr className="rule" />
    </div>
  );
}
