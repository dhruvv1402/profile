"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";

/**
 * The instrument in the corner: a small mono readout pinned bottom-right
 * with the wire's vitals — a live lamp, how much of the edition has been
 * received (scroll progress as a percentage), and the desk clock in the
 * author's timezone. It ties the wire-service conceit to the whole visit
 * instead of just the boot.
 *
 * Deliberately dumb about rendering: two text nodes updated in place, a
 * scroll listener throttled through rAF, and a one-second clock. Hidden on
 * small screens, in print, and without JavaScript — all in CSS.
 */
export function WireTelemetry() {
  const receivedRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const received = receivedRef.current;
    const clock = clockRef.current;
    if (!received || !clock) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
        received.textContent = `${Math.min(100, Math.max(0, pct))}% received`;
      });
    };

    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const onTick = () => {
      clock.textContent = `${format.format(new Date())} ist`;
    };

    onScroll();
    onTick();
    const timer = window.setInterval(onTick, 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="wire-tel label no-print" aria-hidden="true">
      <span className="wire-tel-lamp" />
      <span>live</span>
      <span className="wire-tel-sep" />
      <span ref={receivedRef}>0% received</span>
      <span className="wire-tel-sep" />
      <span ref={clockRef}>--:--:-- ist</span>
    </div>
  );
}
