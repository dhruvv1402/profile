"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePointerEnhancements } from "@/lib/use-media-query";

export type HoverSlide = {
  slug: string;
  src: string;
  alt: string;
  /** Resolved on the server — the file may not be in public/ yet. */
  exists: boolean;
};

/**
 * The image that peeks out under the pointer as you run down the work list.
 *
 * Mounted once by the list rather than once per row, so there is a single
 * rAF loop and a single set of listeners no matter how many projects there
 * are. Rows announce themselves by setting `data-hover-slug` on the shared
 * container; this listens for that.
 *
 * Desktop-pointer-only and off under reduced motion, same contract as the
 * cursor. On touch there is no hover state to hang it from, and the row is a
 * plain link that navigates.
 */
export function ProjectHoverImage({ slides }: { slides: HoverSlide[] }) {
  const enabled = usePointerEnhancements();
  const frame = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frameId = 0;
    let primed = false;

    function onMove(event: PointerEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      // Snap on the first sample so the panel does not fly in from 0,0.
      if (!primed) {
        current.x = target.x;
        current.y = target.y;
        primed = true;
      }

      const row = (event.target as HTMLElement)?.closest?.(
        "[data-hover-slug]",
      ) as HTMLElement | null;
      setActiveSlug(row?.dataset.hoverSlug ?? null);
    }

    function loop() {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      if (frame.current) {
        frame.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  const active = slides.find((s) => s.slug === activeSlug);

  return (
    <div
      ref={frame}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 h-[19rem] w-[14rem]"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 350ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {slides.map((slide) => (
        <div
          key={slide.slug}
          className="press-frame halftone absolute inset-0"
          style={{
            opacity: slide.slug === activeSlug ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          {slide.exists ? (
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="224px"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 9px, color-mix(in srgb, var(--color-ink) 9%, transparent) 9px 10px)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
