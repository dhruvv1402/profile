"use client";

import { useEffect, useRef } from "react";
import { usePointerEnhancements } from "@/lib/use-media-query";

/**
 * A custom cursor: a small ruled square that grows and inverts over anything
 * interactive.
 *
 * Guarded three ways, because a custom cursor is the easiest thing on a site
 * to get wrong:
 *   - hover-capable pointers only (never on touch, where there is no cursor)
 *   - never under reduced motion
 *   - the native cursor is only hidden while ours is actually mounted, so any
 *     failure here leaves the reader with a normal, working pointer
 *
 * Position is written straight to the DOM inside rAF rather than through React
 * state. Re-rendering a component on every mousemove is how a custom cursor
 * ends up visibly lagging the pointer.
 */
export function Cursor() {
  const enabled = usePointerEnhancements();
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    document.body.style.cursor = "none";

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    function onMove(event: PointerEvent) {
      target.x = event.clientX;
      target.y = event.clientY;

      const el = event.target as HTMLElement | null;
      const interactive = !!el?.closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor="grow"]',
      );
      dot.current?.toggleAttribute("data-over", interactive);
    }

    function loop() {
      // Light lerp — the cursor trails the pointer just enough to feel
      // weighted, not enough to feel broken.
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.body.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 border border-ink bg-transparent mix-blend-difference transition-[width,height,background-color] duration-300 ease-out data-[over]:h-9 data-[over]:w-9 data-[over]:bg-ink"
    />
  );
}
