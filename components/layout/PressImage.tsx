import Image from "next/image";
import { publicFileExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  /** Aspect ratio for the frame, e.g. "4/5". Keeps layout stable pre-image. */
  ratio?: string;
  priority?: boolean;
  className?: string;
  /** Sizes hint for next/image. Defaults to a conservative full-width guess. */
  sizes?: string;
  /** Thumbnail-sized frame: draw the placeholder without its caption text. */
  compact?: boolean;
  /**
   * "frame" is a wire-service photograph: ruled box, mat, dot screen.
   * "cutout" is for a subject with a transparent background — no box at all,
   * so the figure stands on the paper.
   */
  variant?: "frame" | "cutout";
};

/**
 * A wire-service photograph: 1px ruled frame, halftone screen, mono caption.
 *
 * Real screenshots are not in the repo yet, so this checks the file at build
 * time and draws a ruled placeholder mat when it is missing. That keeps every
 * section looking deliberate instead of broken while content is still being
 * gathered — drop the file into public/ and it swaps in automatically, with no
 * code change.
 *
 * Server component: it touches the filesystem, so it cannot be imported by a
 * client component.
 */
export function PressImage({
  src,
  alt,
  caption,
  ratio = "4/5",
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  compact = false,
  variant = "frame",
}: Props) {
  const exists = publicFileExists(src);
  // A cut-out only makes sense once the real file is there; without it there
  // is nothing to cut out, so the placeholder keeps its frame either way.
  const cutout = variant === "cutout" && exists;

  return (
    <figure className={cn("flex flex-col", className)}>
      {/* A missing image is capped in height rather than reserving the full
          aspect ratio. A 16/9 cover at full width is ~780px of empty hatching
          on a 1440px screen, and seven case studies of that read as a broken
          site rather than as pending artwork. Real images use the true ratio,
          so dropping the file in restores the intended proportions. */}
      <div
        className={cn(
          "w-full",
          // The frame's mat and dot screen are drawn behind the image. That is
          // right for a rectangular photograph and wrong for a cut-out: with a
          // transparent background they show *through*, and the subject ends
          // up pasted on a speckled grey panel with a dark empty band beside
          // them. A cut-out gets no box at all.
          cutout ? "relative" : "press-frame",
          !cutout && !compact && "halftone",
        )}
        style={{
          aspectRatio: ratio,
          ...(exists ? null : { maxHeight: "22rem" }),
        }}
      >
        {exists ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <PlaceholderMat label={compact ? null : alt} />
        )}
      </div>
      {cutout ? <hr className="rule" /> : null}

      {caption ? (
        <figcaption className="label mt-2 text-ink-mute">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * The stand-in: diagonal press-proof hatching with the intended subject
 * written across it, so a missing asset reads as "not yet supplied" rather
 * than as a bug.
 *
 * A null label leaves just the hatching. At thumbnail size a full alt string
 * wraps to six lines and fills the frame, which looks like a fault rather than
 * a placeholder — the hatching alone reads correctly.
 */
function PlaceholderMat({ label }: { label: string | null }) {
  return (
    <div
      className="absolute inset-0 flex items-end justify-start p-3"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 9px, color-mix(in srgb, var(--color-ink) 9%, transparent) 9px 10px)",
      }}
    >
      {label ? (
        <span className="label text-ink-mute max-w-full text-balance">
          [ image pending ] {label}
        </span>
      ) : null}
    </div>
  );
}
