"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger within a group, in seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * The house scroll reveal: content rises a little and fades in as it enters.
 *
 * The animation itself lives in CSS (see `[data-reveal]` in globals.css); this
 * only decides *when* by flipping an attribute. Three reasons it is built that
 * way rather than with an animation library:
 *
 *   1. No hydration mismatch. A hook that reads a media query returns one
 *      answer on the server and another on the client, and React complains
 *      about every element on the page.
 *   2. Reduced motion is handled by the global CSS rule, so this component
 *      cannot forget to honour it.
 *   3. If JavaScript never arrives, the content is still visible — the hidden
 *      initial state is scoped to `.js`, which is only set by the inline
 *      script in the root layout.
 *
 * `once` is implied: the observer disconnects after firing. Re-animating text
 * the reader has already read is worse than not animating it at all.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer, no reveal — show the content rather than hiding it forever.
    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-revealed", "");
      return;
    }

    // Anything already on screen at load reveals immediately, without waiting
    // for a scroll that may never come on a short page.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = as;

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
}
