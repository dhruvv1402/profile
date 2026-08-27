"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * A ruled drawer: a labelled control that folds a block open beneath it.
 * Used for the college calendar inside the Bennett entry, keeping the
 * landing page to one line until a reader asks for more.
 *
 * The height animation is CSS (see .disclose-panel): the panel's grid row
 * eases 0fr -> 1fr, which animates to the content's natural height without
 * measuring anything. Without JavaScript the panel simply stands open —
 * the CSS collapsed state is scoped to `.js`, same contract as the
 * reveals — so the content is never unreachable.
 */
export function Disclosure({
  closedLabel,
  openLabel,
  className,
  children,
}: {
  closedLabel: string;
  openLabel: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="label link-rule tap font-bold text-accent"
      >
        {open ? openLabel : closedLabel}
      </button>
      <div
        id={panelId}
        className="disclose-panel"
        data-open={open ? "" : undefined}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
