"use client";

import { useEffect, useState } from "react";

/**
 * A twelve-column overlay, toggled with Ctrl+G.
 *
 * Development only — the root layout does not render it in production. This
 * design lives or dies on alignment: the rules, the masthead, the column
 * gutters and the section heads all have to sit on the same grid, and by eye
 * a two-pixel drift reads as sloppiness without being obvious enough to find.
 * Turn it on when adding a section.
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        setVisible((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200]"
    >
      {/* Uses .shell so the overlay is measured by the same rule the layout
          is, rather than by a second definition that could drift from it. */}
      <div className="shell h-full">
        <div className="grid h-full grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="h-full bg-accent/10 outline outline-accent/25" />
          ))}
        </div>
      </div>
      <p className="label fixed bottom-3 left-3 bg-ink px-2 py-1 text-paper">
        Grid — ctrl+G
      </p>
    </div>
  );
}
