import { cn } from "@/lib/utils";

/**
 * The gold sticker: a rotated badge slapped on top of a press photo, like the
 * die-cut stars a printer sold ad space with.
 *
 * It is the one place the gold token appears, and it should stay that way. A
 * second gold element on the page turns a deliberate accent into a colour
 * scheme, and the design only has room for one thing shouting at a time.
 *
 * Purely decorative, so it is hidden from assistive technology — the text on
 * it duplicates the status already stated in the About and Contact sections.
 */
export function Sticker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute grid h-24 w-24 place-items-center",
        className,
      )}
    >
      {/* A twelve-point burst, drawn rather than imported so it inherits the
          gold token and stays crisp at any size. */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points={burstPoints(12, 50, 50, 50, 41)}
          className="fill-gold stroke-ink"
          strokeWidth="1.5"
        />
      </svg>

      <span className="label relative max-w-[4.5rem] text-center leading-tight text-ink">
        {children}
      </span>
    </div>
  );
}

/** Alternating outer/inner radii around a circle, giving a starburst. */
function burstPoints(
  spikes: number,
  cx: number,
  cy: number,
  outer: number,
  inner: number,
) {
  const points: string[] = [];
  const step = Math.PI / spikes;

  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    // Start at -90deg so a spike points straight up.
    const angle = i * step - Math.PI / 2;
    points.push(
      `${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`,
    );
  }

  return points.join(" ");
}
