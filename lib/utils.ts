import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional class names, with later Tailwind utilities winning conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1 -> "01". Section and project numbering, newspaper style. */
export function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * "TUESDAY, 23 AUGUST 2026" - the dateline across the top of the page.
 * Locale is pinned so the server render and the client hydration agree.
 */
export function formatDateline(date: Date) {
  return date
    .toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
}
