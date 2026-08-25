import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
};

/**
 * A rotating type drum: every skill set around a cylinder that turns slowly on
 * its horizontal axis, the way the print drum of a line printer carries its
 * character set.
 *
 * Built from CSS 3D transforms and one keyframe — no canvas, no WebGL, no
 * library. Each slat is rotated to its own angle around the drum and pushed
 * out to the radius; the parent then spins the whole assembly. The browser
 * composites it on the GPU, so it costs about as much as a static list.
 *
 * The radius is computed from the item count rather than hardcoded, so the
 * slats stay evenly spaced whether there are twelve skills or forty:
 * circumference = count x slat height, and radius = circumference / 2pi.
 *
 * Decorative, and hidden from assistive technology. The same skills are listed
 * as plain text beside it, which is what a screen reader — and an applicant
 * tracking system — actually reads.
 *
 * Reduced motion is handled by the global rule in globals.css: the animation
 * collapses to a single instant iteration and the drum simply stands still.
 */
export function TypeDrum({ items, className }: Props) {
  const count = items.length;
  const slat = 44; // px of drum surface per item
  const radius = Math.round((count * slat) / (2 * Math.PI));

  return (
    <div
      aria-hidden="true"
      className={cn("type-drum", className)}
      style={
        {
          "--drum-count": count,
          "--drum-radius": `${radius}px`,
          "--drum-slat": `${slat}px`,
          height: `${radius * 2}px`,
        } as React.CSSProperties
      }
    >
      <div className="type-drum-axis">
        {items.map((item, i) => (
          <span
            key={item}
            className="type-drum-slat label"
            style={{ "--i": i } as React.CSSProperties}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
