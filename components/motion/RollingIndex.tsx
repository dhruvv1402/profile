"use client";

import { useEffect, useRef } from "react";

/**
 * A folio number that arrives like a mechanical counter: each digit is a
 * clipped column of 0–9 that rolls from zero to its value when the section
 * scrolls into view, tenths of a second apart, like wheels settling.
 *
 * The motion is entirely CSS (see `.odo-*` in globals.css); this component
 * only flips `data-odo-on` when the element enters — the same division of
 * labour as Reveal, and the same degradation story: without JavaScript the
 * columns sit at their final digit (the resting transform is the default,
 * the zeroed start state is scoped to `.js`), and reduced motion snaps
 * through the global transition kill-switch.
 */
export function RollingIndex({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-odo-on", "");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-odo-on", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} data-odo="">
      {/* Screen readers get the finished number; the machinery — which
          contains every digit 0-9 — stays out of the accessibility tree. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {[...value].map((char, i) =>
          /\d/.test(char) ? (
            <span key={i} className="odo-digit">
              <span
                className="odo-col"
                style={
                  {
                    "--d": char,
                    transitionDelay: `${i * 0.12}s`,
                  } as React.CSSProperties
                }
              >
                {"0123456789".split("").map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{char}</span>
          ),
        )}
      </span>
    </span>
  );
}
