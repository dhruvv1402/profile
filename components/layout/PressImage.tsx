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
}: Props) {
  const exists = publicFileExists(src);

  return (
    <figure className={cn("flex flex-col", className)}>
      <div
        className="press-frame halftone w-full"
        style={{ aspectRatio: ratio }}
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
          <PlaceholderMat label={alt} />
        )}
      </div>
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
 */
function PlaceholderMat({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex items-end justify-start p-3"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 9px, color-mix(in srgb, var(--color-ink) 9%, transparent) 9px 10px)",
      }}
    >
      <span className="label text-ink-mute max-w-full text-balance">
        [ image pending ] {label}
      </span>
    </div>
  );
}
