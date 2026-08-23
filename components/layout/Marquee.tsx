import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  /** Seconds for one full pass. Longer = slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * The ticker strip. Pure CSS — no JavaScript, no layout measurement, so it
 * costs nothing and works before hydration.
 *
 * The track is rendered twice and translated by exactly -50%, which is what
 * makes the loop seamless: at the end of the animation the second copy sits
 * precisely where the first one started.
 *
 * Under reduced motion the global rule forces one instant iteration, so it
 * settles into a static strip rather than spinning.
 */
export function Marquee({
  items,
  duration = 40,
  reverse = false,
  className,
}: Props) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "rule-t rule-b group relative overflow-hidden py-2",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="flex w-max shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="label flex items-center whitespace-nowrap">
            <span className="px-5">{item}</span>
            <span className="text-accent" aria-hidden="true">
              &#9679;
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
