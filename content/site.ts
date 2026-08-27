/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ★  THIS IS THE FILE TO EDIT.  ★
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything here drives the site: the masthead, the page titles, the OG
 *  image, the structured data, the footer. No copy lives inside any component.
 *
 *  Populated from the résumé of Dhruv Gupta. Where something could not be
 *  verified from that document it has been left out rather than guessed at —
 *  see the notes marked CHECK THIS.
 *
 *  Projects live next door in `content/projects.ts`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /* ── Identity ─────────────────────────────────────────────────────────────
     `name` is the masthead. It is sized from its own character count so any
     length fills the measure, but check it at 375px before changing it. */
  name: "DHRUV",
  fullName: "Dhruv Gupta",

  /* The rotated stack in the hero's right gutter. Short lines only — they are
     set vertically and read bottom-to-top. Three is plenty — the dateline
     already carries the location, so it does not need repeating here. */
  roles: [
    "Machine Learning & Systems",
    "Computer Science Undergraduate",
    "Undergraduate Researcher",
  ],

  /* One line, used under the masthead and as the meta description fallback. */
  tagline:
    "Research and systems work — brain networks, language models, and the layers underneath them.",

  /* The standfirst: the paragraph beside the portrait. Two or three sentences,
     saying what this page is. */
  deck: "A computer science undergraduate at Bennett University, specialising in artificial intelligence. This is the record of what I have built — research on brain networks and language models, and systems written from the protocol up to find out how they work.",

  /* The standfirst on the /work index. Keep it true to what is actually on
     the page — it previously promised a written account of every project,
     which was not the case. */
  workIntro:
    "Research toolkits, protocol implementations written from scratch, and a couple of things that won something along the way.",

  /* The big exclamatory line bottom-left of the hero. Two or three words, set
     very large, so keep it short. */
  statement: "Open to internships!",

  /* The gold sticker on the portrait. A few words; it is small and rotated.
     Set to null to remove it. */
  sticker: "Open to work" as string | null,

  location: "Gurugram, IN",
  timezone: "Asia/Kolkata",

  /* GitHub username. Pulls recently-pushed public repositories into the
     "Dispatches" section at build time, revalidated hourly. null hides it. */
  github: "dhruvv1402" as string | null,

  /* ── Contact ──────────────────────────────────────────────────────────────
     The phone number on the résumé is deliberately not published here. A
     mailto on a public page already attracts enough spam; a mobile number in
     the markup gets scraped and dialled. Keep it on the PDF, where you control
     who receives it. */
  email: "guptadhruv1402@gmail.com",

  socials: [
    {
      label: "GitHub",
      handle: "@dhruvv1402",
      href: "https://github.com/dhruvv1402",
    },
    {
      label: "LinkedIn",
      handle: "in/dhruvv-gupta",
      href: "https://www.linkedin.com/in/dhruvv-gupta/",
    },
  ],

  /* Export the résumé to PDF and drop it at public/resume.pdf. Until that file
     exists the link hides itself rather than pointing at a 404. */
  resumeHref: "/resume.pdf",

  /* ── Deployment ───────────────────────────────────────────────────────────
     The live origin. Canonical URLs, the sitemap and the absolute Open Graph
     image path are all built from this, so while it was wrong every share
     preview pointed at an image that did not exist.

     Setting it also opens the indexing gate in content/flags.ts, since the
     other condition — the copy being real — is already met.

     Change this the day a custom domain is attached, and add a redirect from
     the vercel.app address so the two do not compete in search. */
  url: "https://dhruvcodes.vercel.app",

  /* ── Hero portrait ────────────────────────────────────────────────────── */
  portrait: {
    src: "/portrait.png",
    alt: "Dhruv Gupta",
    caption: "Fig. 1 — The author.",
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   THE BIO
   Set as justified newspaper columns with a drop cap. Each string is one
   paragraph; the drop cap lands on the first letter of the first.

   CHECK THIS: written from the résumé, so the facts are yours but the voice is
   not. Read it aloud — if it does not sound like you, rewrite it. This is the
   part of the page people quote back at you in an interview.
   ═══════════════════════════════════════════════════════════════════════════ */

export const bio = [
  "I am a Computer Science and Engineering undergraduate at Bennett University (The Times Group), specialising in artificial intelligence. My coursework runs from linear algebra and probability through machine learning and deep learning to operating systems and databases, and my work sits across all of it.",
  "As an undergraduate researcher since 2024 I have worked on computational neuroscience — functional connectivity analysis, brain network modelling and signal synchronisation using fMRI and deep learning — under faculty guidance, alongside independent work on transformer-based fake news detection with BERT and RoBERTa, and on compiler-level optimisation in Rust.",
  "I am Research Lead for the IEEE and ACM student chapters, where I lead student research initiatives in AI, machine learning and systems, and mentor juniors in research methodology and academic writing. Most recently I spent a summer at Publicis Resources administering enterprise AI systems in production.",
]

/* A single sentence, set large between rules, in the About column.
   Null by default and the block is skipped — a "quote" I wrote for you would
   not be a quote. Put a line of your own here when you have one. */
export const pullQuote: string | null = null;

/* ═══════════════════════════════════════════════════════════════════════════
   THE TICKER
   The marquee strip under the hero. Short phrases only — they scroll past.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ticker = [
  "Open to internships",
  "Machine learning",
  "Rust",
  "PyTorch",
  "Computational neuroscience",
  "Systems programming",
  "Currently building",
];

/* ═══════════════════════════════════════════════════════════════════════════
   SKILLS
   Rendered as newspaper classifieds: small ruled ad-blocks in a grid.
   Recruiters and keyword scanners both read this, so it is set as plain text.
   Taken from the résumé.
   ═══════════════════════════════════════════════════════════════════════════ */

export const stack = [
  {
    heading: "Mathematics",
    items: [
      "Linear Algebra",
      "Probability Theory",
      "Statistics",
      "Optimization",
    ],
  },
  {
    heading: "ML / DL",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "OpenCV",
      "BERT",
      "Vision Transformers",
    ],
  },
  {
    heading: "Languages",
    items: ["Python", "Java", "C++", "Rust", "JavaScript", "SQL"],
  },
  {
    heading: "Systems & Tools",
    items: ["Linux", "Git", "Docker", "Redis", "Tokio", "FastAPI", "LaTeX"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   THE CHRONICLE
   Education and experience, set dry and dated like a record of proceedings.
   Newest first. `kind` picks the column it files under on the About page.
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
    period: "Jun 2026 — Aug 2026",
    title: "Applications Admin Intern, AI/ML",
    org: "Publicis Resources, Gurugram",
    kind: "experience",
    detail:
      "Supported and administered enterprise AI-enabled software in production, testing for system reliability. Ran Data Subject Access Request workflows and data validation for regulatory compliance, and documented system functionality and operational protocols for cross-functional MLOps teams.",
  },
  {
    period: "2025 — 2026",
    title: "Research Lead, IEEE & ACM Student Chapters",
    org: "Bennett University",
    kind: "experience",
    detail:
      "Leading student research initiatives across both chapters in AI, machine learning and systems. Mentoring juniors in research methodology and academic writing in LaTeX.",
  },
  {
    period: "2024 — Present",
    title: "Undergraduate Researcher",
    org: "Bennett University",
    kind: "experience",
    detail:
      "Faculty-guided research on functional connectivity analysis, brain network modelling and signal synchronisation from fMRI. Independent work on transformer-based misinformation detection and on compiler-level optimisation in Rust.",
  },
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science & Engineering",
    org: "Bennett University (The Times Group), Greater Noida",
    kind: "education",
    detail:
      "Specialisation in artificial intelligence. CGPA 8.92. Coursework in linear algebra, probability and statistics, machine learning, deep learning, data structures and algorithms, databases and operating systems.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HONOURS
   ═══════════════════════════════════════════════════════════════════════════ */

export type Honour = {
  award: string;
  event: string;
  detail: string;
  href?: string;
};

export const honours: Honour[] = [
  {
    award: "Special Jury Award",
    event: "NST GenAI Hackathon",
    detail:
      "Wraith OS — RetroCloud, a lightweight cloud file management prototype built with FastAPI, Python and shell tooling.",
    href: "https://www.linkedin.com/posts/dhruvv-gupta_wraithflash-activity-7318287884191490048-Bdeu",
  },
  {
    award: "2nd Runner-Up",
    event: "Project Showcase 2025 — Bennett University × Times of India",
    detail:
      "TerraVit, an AI-powered climate intelligence system using vision transformers on satellite imagery.",
    href: "https://www.linkedin.com/posts/dhruvv-gupta_globalaisummit-acm-climateai-activity-7397605909637799936-Zx1p",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   THE BULLETIN
   Events staged and organised at college — the society pages of this paper.
   Rendered under The Chronicle with a framed photograph per event.

   CHECK THIS: the three entries below are PLACEHOLDERS so the section has a
   shape while the real list is gathered. Replace every field with your actual
   events, or empty the array and the section disappears from the page.

   Photographs go in public/events/ under the `src` given here. Until a file
   exists the frame shows a ruled "image pending" mat — drop the photo in and
   it swaps automatically, no code change.
   ═══════════════════════════════════════════════════════════════════════════ */

export type CollegeEvent = {
  title: string;
  /** Display date, e.g. "Mar 2026". */
  date: string;
  /** What you did: "Lead organiser", "Co-organiser", "Host". */
  role: string;
  /** The body it was staged with, e.g. "IEEE Student Chapter". */
  org: string;
  /** One or two sentences on what it was and how it went. */
  detail: string;
  photo: { src: string; alt: string };
};

export const collegeEvents: CollegeEvent[] = [
  {
    title: "AI Research Workshop",
    date: "2025",
    role: "Organiser",
    org: "IEEE Student Chapter",
    detail:
      "Placeholder — replace with the real event, what you ran, and how many turned up.",
    photo: {
      src: "/events/ai-research-workshop.jpg",
      alt: "AI Research Workshop",
    },
  },
  {
    title: "Tech Talk Series",
    date: "2025",
    role: "Organiser",
    org: "ACM Student Chapter",
    detail:
      "Placeholder — replace with the real event, what you ran, and how many turned up.",
    photo: {
      src: "/events/tech-talk-series.jpg",
      alt: "Tech Talk Series",
    },
  },
  {
    title: "Project Showcase Night",
    date: "2026",
    role: "Organiser",
    org: "IEEE & ACM Student Chapters",
    detail:
      "Placeholder — replace with the real event, what you ran, and how many turned up.",
    photo: {
      src: "/events/project-showcase-night.jpg",
      alt: "Project Showcase Night",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   NOTES
   Short write-ups. `href` can point anywhere — a future /notes route, a gist,
   a repository README.

   Empty the array and the section disappears from the home page. That is
   deliberate: a writing section with nothing in it advertises that you stopped
   writing. It is empty because there was nothing on the résumé to put here.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Note = {
  title: string;
  /** ISO date. Displayed as "12 MAR 2026". */
  date: string;
  href: string;
  summary: string;
};

export const notes: Note[] = [];

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════════════ */

/* The folio bar also carries LinkedIn — the address recruiters actually
   reach for. Pulled from socials above so the URL lives in one place. */
export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  {
    label: "LinkedIn",
    href:
      site.socials.find((s) => s.label === "LinkedIn")?.href ??
      "https://www.linkedin.com/in/dhruvv-gupta/",
  },
  { label: "Résumé", href: site.resumeHref },
];
