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
     set vertically and read bottom-to-top. Three or four is the sweet spot. */
  roles: [
    "Machine Learning & Systems",
    "Computer Science Undergraduate",
    "Undergraduate Researcher",
    "Based in Greater Noida, IN",
  ],

  /* One line, used under the masthead and as the meta description fallback. */
  tagline:
    "Research and systems work — brain networks, language models, and the layers underneath them.",

  /* The standfirst: the paragraph beside the portrait. Two or three sentences,
     saying what this page is. */
  deck: "A computer science undergraduate at Bennett University, specialising in artificial intelligence. This is the record of what I have built — research on brain networks and language models, and systems written from the protocol up to find out how they work.",

  /* The big exclamatory line bottom-left of the hero. Two or three words, set
     very large, so keep it short. */
  statement: "Open to internships!",

  /* The gold sticker on the portrait. A few words; it is small and rotated.
     Set to null to remove it. */
  sticker: "Open to work" as string | null,

  location: "Greater Noida, IN",
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
     ★ SET THIS TO THE REAL DOMAIN. ★ Canonical URLs, the sitemap and the
     absolute OG image path all read from it, and indexing stays switched off
     while it still says example.com — see content/flags.ts. */
  url: "https://example.com",

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
  "Somewhere between a coherence matrix that would not converge and a borrow checker that would not relent, the two halves of this practice met. I am a computer science undergraduate at Bennett University specialising in artificial intelligence, and most of what I do sits in the gap between a model that works and a system that can carry it.",
  "The research runs in three directions at once. Computational neuroscience, where I work on functional connectivity analysis and brain network modelling from fMRI. Natural language, where I have built binary classification pipelines on BERT and RoBERTa for misinformation detection. And systems, where I am interested in compiler-level optimisation and in what it actually costs to make something fast rather than merely correct.",
  "The rest is built to find out how things work. A BitTorrent client, because I wanted to understand the protocol rather than read about it. An asynchronous Redis client in Rust, for the same reason. A reconnaissance toolkit, because automation is more interesting than repetition. I lead research across the IEEE and ACM student chapters here, which mostly means helping other people get a first paper out of their head and onto a page.",
];

/* A single sentence, set large between rules.
   CHECK THIS: replace it with something you have actually said. */
export const pullQuote =
  "Understand the layer below the one you are working on.";

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
    heading: "Languages",
    items: ["Python", "Java", "C++", "Rust", "JavaScript", "SQL"],
  },
  {
    heading: "Machine learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV",
      "BERT",
      "Vision Transformers",
    ],
  },
  {
    heading: "Data",
    items: ["NumPy", "Pandas", "SQL", "fMRI pipelines"],
  },
  {
    heading: "Systems & tools",
    items: ["Linux", "Git", "Docker", "Redis", "Tokio", "FastAPI", "LaTeX"],
  },
  {
    heading: "Mathematics",
    items: [
      "Linear algebra",
      "Probability theory",
      "Statistics",
      "Optimisation",
    ],
  },
  {
    heading: "Coursework",
    items: [
      "Machine learning",
      "Deep learning",
      "Data structures & algorithms",
      "Operating systems",
      "Databases",
    ],
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

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: site.resumeHref },
];
