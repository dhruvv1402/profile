"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * `useSyncExternalStore` rather than the usual useState-plus-useEffect dance:
 * a media query is external state, and this is the API built for reading it.
 * It also avoids the cascading extra render that setting state inside an
 * effect causes, and it hydrates cleanly — the server snapshot is always
 * false, so the server renders the un-enhanced markup and the real answer
 * arrives on the client without a mismatch.
 *
 * Always false during server render. Anything gated on this must therefore
 * degrade to something sensible when absent, which for every caller here means
 * "do not render the enhancement at all".
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Desktop pointer, and the reader has not asked for less motion. */
export function usePointerEnhancements() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return finePointer && !reducedMotion;
}
