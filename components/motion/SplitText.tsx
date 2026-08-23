import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** Seconds between consecutive letters. */
  stagger?: number;
  delay?: number;
};

/**
 * Letter-by-letter reveal for the masthead: each glyph rises out of its own
 * clipped box, like type being pressed onto the sheet.
 *
 * Driven entirely by CSS, which matters more here than anywhere else on the
 * site. The masthead is the one element that must never depend on JavaScript
 * to become visible — a JS-driven initial state means a failed or slow bundle
 * leaves the page with no name on it. A CSS animation starts at parse time,
 * needs no hydration, and collapses to its end state under reduced motion via
 * the global rule in globals.css.
 *
 * Splitting a word into per-letter spans would make a screen reader spell it
 * out, so the real word goes on an aria-label and every fragment is hidden.
 */
export function SplitText({ text, className, stagger = 0.045, delay = 0.1 }: Props) {
  const letters = Array.from(text);

  return (
    <span className={cn("inline-flex", className)} aria-label={text} role="text">
      {letters.map((char, i) => (
        <span key={i} aria-hidden="true" className="letter-box">
          <span
            className="letter-rise"
            style={{ animationDelay: `${delay + i * stagger}s` }}
          >
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  );
}
