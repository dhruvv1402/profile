/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ★  EDIT THIS FILE.  ★
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything below is placeholder copy. Replace the strings with your own and
 *  the entire site updates: the masthead, the page titles, the OG image, the
 *  structured data, the footer. No content lives inside any component.
 *
 *  Projects live next door in `content/projects.ts`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /* ── Identity ─────────────────────────────────────────────────────────────
     `name` is set as the masthead at up to 17rem. Anything longer than about
     ten characters will need the masthead size clamp in globals.css nudged
     down; check it at 375px before you commit to a long name. */
  name: "DHRUV",
  fullName: "Dhruv Verma",

  /* The rotated stack in the hero's right gutter. Keep each line short —
     they are set vertically and read bottom-to-top, as in the reference.
     Three or four lines is the sweet spot. */
  roles: [
    "Full-Stack Developer",
    "Computer Science Undergraduate",
    "Interface & Systems Tinkerer",
    "Based in Bengaluru, IN",
  ],

  /* One line, used under the masthead and as the meta description fallback. */
  tagline:
    "A curated selection of the best work of the last few years — built, broken, and rebuilt.",

  /* The big exclamatory line bottom-left of the hero — the equivalent of the
     reference's "INTERACTIVE ARTIST!". Two or three words, set very large, so
     keep it short. It is the loudest thing on the page after your name. */
  statement: "Open to internships!",

  /* The gold sticker slapped on the portrait. Keep it to a few words; it is
     set small and rotated. Set to null to remove the sticker. */
  sticker: "Available now" as string | null,

  location: "Bengaluru, IN",
  timezone: "Asia/Kolkata",

  /* GitHub username, used to pull recently-updated public repositories into
     the "Dispatches" section at build time. Set to null to hide that section
     entirely. */
  github: "dhruvv1402" as string | null,

  /* ── Contact ────────────────────────────────────────────────────────────── */
  email: "hello@example.com",

  /* Shown as mono footnotes in the contact block and footer.
     Delete any line you do not want; the layout adapts. */
  socials: [
    { label: "GitHub", handle: "@dhruvv1402", href: "https://github.com/dhruvv1402" },
    { label: "LinkedIn", handle: "in/your-handle", href: "https://linkedin.com/in/your-handle" },
    { label: "X", handle: "@your-handle", href: "https://x.com/your-handle" },
    { label: "Read.cv", handle: "your-handle", href: "https://read.cv/your-handle" },
  ],

  /* Drop the real file at public/resume.pdf and this link starts working. */
  resumeHref: "/resume.pdf",

  /* ── Deployment ───────────────────────────────────────────────────────────
     Set this to the real domain before shipping. It is used for canonical
     URLs, the sitemap, and absolute OG image paths. */
  url: "https://example.com",

  /* ── Hero portrait ────────────────────────────────────────────────────────
     Replace with your own image at public/portrait.jpg. Until then a ruled
     placeholder mat is drawn in its place. */
  portrait: {
    src: "/portrait.jpg",
    alt: "Portrait photograph",
    caption: "Fig. 1 — The author, photographed at desk.",
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   THE BIO
   Set as justified newspaper columns with a drop cap. Each string is one
   paragraph. The first should open strongly — the drop cap lands on its
   first letter.
   ═══════════════════════════════════════════════════════════════════════════ */

export const bio = [
  "Somewhere between a compiler error at two in the morning and a design file that would not stop nagging, the two halves of this practice met. I build software the way a printer sets a page: structure first, ornament last, and nothing on the sheet that has not earned its place.",
  "Currently reading for a degree in Computer Science, which mostly means I spend my days on data structures and my nights on the things the syllabus does not cover — rendering pipelines, type systems, and an unreasonable interest in how interfaces feel under the hand.",
  "The work below runs from small tools I built to scratch an itch to systems that ended up carrying real users. Each one has a written account of what the problem was, what I chose, and what I would do differently. The failures are documented too; they taught more.",
];

/* A single sentence, set large between rules. Pick the line you would want
   quoted back to you. */
export const pullQuote =
  "Build the thing that is hard to explain, then explain it well.";

/* ═══════════════════════════════════════════════════════════════════════════
   THE TICKER
   The marquee strip under the hero. Short phrases only — they scroll past.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ticker = [
  "Open to internships",
  "Currently building",
  "TypeScript",
  "Rust",
  "Systems design",
  "Available for freelance",
  "Ships on weekends",
];

/* ═══════════════════════════════════════════════════════════════════════════
   STACK & CAPABILITIES
   Rendered as newspaper classifieds: small ruled ad-blocks in a grid.
   Recruiters and keyword scanners both read this, so be literal and honest.
   ═══════════════════════════════════════════════════════════════════════════ */

export const stack = [
  {
    heading: "Languages",
    items: ["TypeScript", "Python", "Rust", "Go", "SQL", "C++"],
  },
  {
    heading: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "WebGL / Three.js"],
  },
  {
    heading: "Backend",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "tRPC", "GraphQL"],
  },
  {
    heading: "Infrastructure",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Terraform"],
  },
  {
    heading: "Practice",
    items: ["Testing", "Accessibility", "Design systems", "Technical writing"],
  },
  {
    heading: "Learning",
    items: ["Distributed systems", "Compilers", "Shader programming"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   THE CHRONICLE
   Education and experience, set dry and dated like a record of proceedings.
   Newest first. `kind` picks the column it files under.
   ═══════════════════════════════════════════════════════════════════════════ */

export type ChronicleEntry = {
  period: string;
  title: string;
  org: string;
  kind: "education" | "experience";
  detail: string;
};

export const chronicle: ChronicleEntry[] = [
  {
    period: "2025 — Present",
    title: "Software Engineering Intern",
    org: "A Company You Have Heard Of",
    kind: "experience",
    detail:
      "Shipped three features to production on a codebase serving six figures of monthly traffic. Cut p95 latency on the search path by 40% by replacing an N+1 query with a single materialised view.",
  },
  {
    period: "2023 — 2027",
    title: "B.Tech, Computer Science",
    org: "Your University",
    kind: "education",
    detail:
      "Coursework in data structures, operating systems, computer networks, databases, and machine learning. Teaching assistant for the first-year programming course.",
  },
  {
    period: "2024 — 2025",
    title: "Open Source Contributor",
    org: "Various projects",
    kind: "experience",
    detail:
      "Merged patches to developer tooling used daily by other engineers. Mostly bug fixes and documentation; occasionally something larger.",
  },
  {
    period: "2024",
    title: "Finalist, National Hackathon",
    org: "Some Reputable Event",
    kind: "experience",
    detail:
      "Built and demoed a working prototype in 36 hours against 400 competing teams. Placed in the top five.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   NOTES
   Short write-ups: things you worked out, got wrong, or want to remember.

   Empty this array and the whole section disappears from the home page — no
   "coming soon", no dead link. That is deliberate: an empty writing section
   advertises that you stopped writing.

   Two placeholders ship here so you can see the treatment. Replace them with
   real posts, or delete them. `href` can point anywhere — your own /notes
   route later, a dev.to post, a gist, a GitHub README.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Note = {
  title: string;
  /** ISO date. Displayed as "12 MAR 2026". */
  date: string;
  href: string;
  summary: string;
};

export const notes: Note[] = [
  {
    title: "Why my WASM solver was slower than the JavaScript one",
    date: "2026-04-12",
    href: "https://example.com/notes/wasm-slower",
    summary:
      "I assumed the bottleneck was compute. It was the boundary — every call was copying the whole constraint set across. A note on measuring before porting.",
  },
  {
    title: "Reading a paper properly, and why tooling did not help",
    date: "2026-02-03",
    href: "https://example.com/notes/reading-papers",
    summary:
      "Three months of building a reader taught me more about how I read than any of the features I shipped into it.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════════════ */

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: site.resumeHref },
];
