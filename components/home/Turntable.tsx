"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Listening } from "@/lib/spotify";

/**
 * The record player itself: album art as the sleeve, a CSS vinyl half-drawn
 * behind it that turns while something is actually playing, and the facts
 * of the record beside it in the house voice.
 *
 * Polls /api/listening on mount and once a minute after — the page is
 * static, the needle is not. Every state stays composed: while loading the
 * sleeve shows the hatched pending mat, and an idle player says so instead
 * of pretending.
 */

/** How often to ask where the needle is, in milliseconds. */
const POLL_MS = 60_000;

export function Turntable() {
  const [listening, setListening] = useState<Listening | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      try {
        const response = await fetch("/api/listening");
        if (!response.ok) return;
        const data = (await response.json()) as Listening;
        if (!cancelled) {
          setListening(data);
          setLoaded(true);
        }
      } catch {
        /* leave the last known state on the platter */
      }
    };
    poll();
    const timer = window.setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const nowPlaying = listening?.nowPlaying ?? null;
  const feature = nowPlaying ?? listening?.recent[0] ?? null;
  // The list beneath skips the record already on the platter.
  const others = (listening?.recent ?? [])
    .filter((track) => track.title !== feature?.title)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      {/* ── The record ─────────────────────────────────────────────────── */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-4">
        <div className="gramo-stage">
          <div
            className="gramo-disc"
            data-spinning={nowPlaying ? "" : undefined}
            aria-hidden="true"
          />
          <figure className="gramo-sleeve press-frame halftone aspect-square w-full">
            {feature?.art ? (
              <Image
                src={feature.art}
                alt={`Album sleeve — ${feature.album}`}
                fill
                sizes="(max-width: 640px) 66vw, 25vw"
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
          </figure>
        </div>
        <p className="label mt-3 text-ink-mute">
          {feature
            ? `Fig. — ${feature.album || feature.title}.`
            : "Fig. — The house record player."}
        </p>
      </div>

      {/* ── The listing ────────────────────────────────────────────────── */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-8">
        <p className="label text-accent">
          {!loaded
            ? "Lowering the needle"
            : nowPlaying
              ? "Now spinning"
              : feature
                ? "Last on the platter"
                : "The needle is at rest"}
        </p>

        {feature ? (
          <>
            <h3 className="display-lg mt-3">
              {feature.url ? (
                <a
                  href={feature.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-rule"
                >
                  {feature.title}
                </a>
              ) : (
                feature.title
              )}
            </h3>
            <p className="label mt-2">{feature.artist}</p>
            {feature.album ? (
              <p className="label mt-1 text-ink-mute">{feature.album}</p>
            ) : null}
          </>
        ) : (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-mute">
            {loaded
              ? "Nothing on just now — the author is presumably shipping something."
              : "Asking the house what is playing."}
          </p>
        )}

        {others.length > 0 ? (
          <div className="mt-8">
            <p className="label rule-b pb-2 text-ink-mute">
              Recently on the platter
            </p>
            <ul>
              {others.map((track) => (
                <li
                  key={`${track.title}-${track.playedAt}`}
                  className="flex items-baseline justify-between gap-4 border-b border-ink py-2"
                >
                  <span className="label truncate">
                    {track.title}
                    <span className="text-ink-mute"> — {track.artist}</span>
                  </span>
                  {track.playedAt ? (
                    <span className="label shrink-0 text-ink-faint">
                      {timeAgo(track.playedAt)}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** "3h ago", in the paper's shorthand. */
function timeAgo(iso: string): string {
  const minutes = Math.max(
    1,
    Math.round((Date.now() - new Date(iso).getTime()) / 60_000),
  );
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
