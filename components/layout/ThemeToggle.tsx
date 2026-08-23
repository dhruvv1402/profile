"use client";

const STORAGE_KEY = "edition";

/**
 * Day / Night edition switch.
 *
 * Flips `data-theme` on <html>, which swaps the seven colour tokens in
 * globals.css — the whole site inverts without a single component knowing
 * about it.
 *
 * Deliberately holds no React state. Which edition is active is already
 * recorded on the document by the blocking script in the root layout, so
 * mirroring it into state would mean either a hydration mismatch (the server
 * cannot know the reader's choice) or a render-after-mount flicker. Instead
 * both labels are rendered and CSS shows the right one — correct on the server,
 * correct before hydration, and correct the instant the attribute changes.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "night" ? "day" : "night";

    if (next === "night") {
      root.dataset.theme = "night";
    } else {
      delete root.dataset.theme;
    }

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this
      // visit, it just will not be remembered. Not worth surfacing.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="label tap cursor-pointer text-ink-mute transition-colors hover:text-accent"
    >
      {/* No aria-label. An aria-label that does not contain the visible text
          breaks WCAG 2.5.3 (Label in Name): someone driving the page by voice
          says what they can see — "click Night ed." — and the command misses.
          The extra wording is appended, visually hidden, so the accessible name
          starts with exactly the words on screen. */}
      <span className="edition-day">
        Night ed.<span className="sr-only"> — switch to the night edition</span>
      </span>
      <span className="edition-night">
        Day ed.<span className="sr-only"> — switch to the day edition</span>
      </span>
    </button>
  );
}
