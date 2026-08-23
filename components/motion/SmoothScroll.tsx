"use client";

import { useEffect } from "react";

type LenisCtor = typeof import("lenis").default;

/**
 * Lenis smooth scroll.
 *
 * Renders nothing — it exists purely to own the scroll loop for the lifetime
 * of the app. Mounted once in the root layout.
 *
 * Three rules it must honour, all enforced here:
 *   1. Reduced motion means no scroll hijacking at all. Not "less easing" —
 *      none. Overriding how someone's scroll wheel behaves is exactly the
 *      thing that preference is asking you not to do. The library is not even
 *      fetched in that case.
 *   2. Touch devices keep native scrolling. Lenis on touch fights the
 *      browser's own momentum and feels worse than doing nothing.
 *   3. It must not be in the bundle that blocks first paint. Smooth scrolling
 *      is an enhancement to an already-usable page, so the library is imported
 *      dynamically after mount.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let teardown: (() => void) | undefined;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      // The component may have unmounted while the chunk was in flight.
      if (cancelled) return;
      teardown = start(Lenis);
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return null;
}

/** Starts the scroll loop and returns its teardown. */
function start(Lenis: LenisCtor) {
  const lenis = new Lenis({
    // A long, heavy glide — the page is a broadsheet, it should feel like one.
    // Shorter durations read as jittery at this scale of type.
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Native momentum on touch. See rule 2 above.
    syncTouch: false,
    touchMultiplier: 1.6,
  });

  let frame = requestAnimationFrame(function raf(time: number) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  });

  // In-page anchors have to be handed to Lenis, or the browser's native jump
  // and Lenis's loop will fight each other.
  function onAnchorClick(event: MouseEvent) {
    const anchor = (event.target as HTMLElement)?.closest?.(
      'a[href^="#"]',
    ) as HTMLAnchorElement | null;
    if (!anchor) return;

    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -24 });
  }

  document.addEventListener("click", onAnchorClick);

  return () => {
    document.removeEventListener("click", onAnchorClick);
    cancelAnimationFrame(frame);
    lenis.destroy();
  };
}
