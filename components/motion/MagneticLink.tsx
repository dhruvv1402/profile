"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  /** How far the element may be pulled, in px. */
  strength?: number;
  external?: boolean;
};

/**
 * A link that leans towards the pointer as it approaches, then springs back.
 *
 * Reserved for the two or three largest call-to-action links on the site. Used
 * everywhere it becomes noise, and it should never be applied to something in
 * a list — neighbouring magnetic elements fight each other.
 *
 * The transform is written directly to the node; putting it through React
 * state would re-render on every pointer sample.
 */
export function MagneticLink({
  children,
  href,
  className,
  strength = 14,
  external = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    // Measured once on enter, not on every move. Reading a bounding rect
    // inside a pointermove handler forces a synchronous layout on every
    // sample, which is exactly the "forced reflow" a profiler flags.
    let rect: DOMRect | null = null;

    function onEnter() {
      rect = node!.getBoundingClientRect();
    }

    function onMove(event: PointerEvent) {
      if (!node || !rect) return;
      // Offset from centre, normalised to -1..1, then scaled.
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      node.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    }

    function reset() {
      rect = null;
      if (node) node.style.transform = "translate(0px, 0px)";
    }

    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    node.addEventListener("blur", reset);
    // A scroll mid-hover invalidates the cached rect.
    window.addEventListener("scroll", reset, { passive: true });

    return () => {
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
      node.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
      reset();
    };
  }, [strength]);

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
    >
      {children}
    </a>
  );
}
