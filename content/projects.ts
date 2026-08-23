/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ★  EDIT THIS FILE.  ★
 * ─────────────────────────────────────────────────────────────────────────────
 *  Five placeholder projects, shaped the way a real case study should be.
 *
 *  The single highest-value thing on this whole site is a well-written case
 *  study. A screenshot says you can use a framework; `problem -> approach ->
 *  outcome` says you can think. Keep the structure and replace the words.
 *
 *  Rules of thumb:
 *    - `outcome` should contain a number wherever you honestly have one.
 *    - Never link a demo that is down. A dead link is worse than no link.
 *    - `featured: true` promotes a project to the home page. Keep it to 3–4.
 *    - Order here is the order shown. Put your strongest work first.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  /** URL segment: /work/<slug>. Lowercase, hyphenated, never changed once shared. */
  slug: string;
  title: string;
  /** Year or range, shown in the index table. */
  year: string;
  /** Two or three words. Shown beside the title in the work list. */
  discipline: string;
  /** One sentence. This is the hook in the index and the meta description. */
  summary: string;
  /** Promote to the home page. */
  featured: boolean;
  /** Technologies, most significant first. */
  stack: string[];
  /** Your part in it. Say "solo" if it was. */
  role: string;
  /** Team size / context, e.g. "Solo project" or "Team of 4, 36-hour hackathon". */
  context: string;
  /** The case study proper. */
  study: {
    problem: string;
    approach: string;
    outcome: string;
    /** What you would do differently. Honesty here reads as seniority. */
    reflection: string;
  };
  /** Two to four bullet points of specifics an engineer would care about. */
  highlights: string[];
  links: ProjectLink[];
  /** Drop real screenshots in public/work/. Missing files fall back to a ruled mat. */
  cover: { src: string; alt: string; caption: string };
  gallery?: { src: string; alt: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "meridian-scheduler",
    title: "Meridian",
    year: "2026",
    discipline: "Full-stack / Systems",
    summary:
      "A timetable solver that turns a semester of conflicting constraints into a schedule in under two seconds.",
    featured: true,
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Rust (WASM)", "Redis"],
    role: "Solo — design, solver, interface",
    context: "Solo project, built over one semester",
    study: {
      problem:
        "Course registration at my university is a lottery dressed up as a form. Students hold six browser tabs open and hand-check for clashes, and every semester a few hundred people end up in a timetable they cannot actually attend. The scheduling constraints are real but nobody had ever written them down in one place.",
      approach:
        "I modelled it as a constraint satisfaction problem and wrote the solver in Rust, compiled to WebAssembly so it runs entirely in the browser — no server round-trip, no student data leaving the machine. The interface is a Next.js app that streams partial solutions as the solver finds them, so the page fills in progressively instead of blocking on a spinner. Redis caches the parsed course catalogue, which only changes twice a year.",
      outcome:
        "Solves a full six-course semester in under 2 seconds on a mid-range laptop, against roughly 40 seconds for the naive backtracking version I started with. Around 300 students used it during the last registration window. Zero server cost, because the hard part runs client-side.",
      reflection:
        "I reached for WASM before I had proven the JavaScript version was too slow — it turned out to be, but I got lucky. I should have profiled first. The constraint DSL is also more general than anyone needed; a simpler model would have shipped a month earlier.",
    },
    highlights: [
      "Rust solver compiled to WASM, running fully client-side",
      "Streaming partial results via a Web Worker, so the UI never blocks",
      "Constraint model covers prerequisites, capacity, and time clashes",
      "Zero backend cost — static hosting plus a cached catalogue",
    ],
    links: [
      { label: "Live demo", href: "https://example.com/meridian" },
      { label: "Source", href: "https://github.com/dhruvv1402" },
    ],
    cover: {
      src: "/work/meridian.jpg",
      alt: "Screenshot of the Meridian timetable interface",
      caption: "Fig. 1 — The solver, mid-run, streaming partial schedules.",
    },
  },

  {
    slug: "cinder-observability",
    title: "Cinder",
    year: "2025",
    discipline: "Backend / Infrastructure",
    summary:
      "A self-hosted log pipeline that answers the question every incident starts with: what changed?",
    featured: true,
    stack: ["Go", "ClickHouse", "Docker", "Grafana", "Terraform"],
    role: "Backend and infrastructure",
    context: "Team of 3, internship project",
    study: {
      problem:
        "The team's logs lived in four places and none of them talked to each other. Debugging a production incident meant grepping three services by hand and guessing at timestamps. The hosted alternatives were quoted at more than the team's entire infrastructure budget.",
      approach:
        "I built an ingestion service in Go that normalises log lines from every service into one schema, writes them into ClickHouse in batches, and exposes a query layer that Grafana can read directly. Batching was the whole game — writing rows individually collapsed under load, so the writer buffers for 200ms or 5,000 rows, whichever comes first. The whole stack is defined in Terraform and comes up with a single command.",
      outcome:
        "Ingests roughly 12,000 log lines per second on a single modest instance. Median incident triage time dropped from about 20 minutes to under 5. Running cost is around a twentieth of the hosted quote.",
      reflection:
        "I underestimated retention. The first version kept everything forever and filled the disk in three weeks; adding tiered retention afterwards was far more painful than designing for it would have been.",
    },
    highlights: [
      "Batched writer sustaining ~12k lines/sec on one instance",
      "Single normalised log schema across four heterogeneous services",
      "Whole stack reproducible from Terraform in one command",
      "Tiered retention: hot 7 days, cold 90 days, then dropped",
    ],
    links: [
      { label: "Write-up", href: "https://example.com/cinder" },
      { label: "Source", href: "https://github.com/dhruvv1402" },
    ],
    cover: {
      src: "/work/cinder.jpg",
      alt: "Grafana dashboard showing log ingestion metrics",
      caption: "Fig. 2 — Ingestion throughput during a load test.",
    },
  },

  {
    slug: "paper-reader",
    title: "Paper",
    year: "2025",
    discipline: "Interface / ML",
    summary:
      "A reading tool for academic papers that keeps the citation you are reading about on screen beside you.",
    featured: true,
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "pgvector"],
    role: "Solo — full stack",
    context: "Solo project",
    study: {
      problem:
        "Reading a paper properly means chasing its references, and chasing a reference means losing your place. I wanted the cited claim to appear next to the citation, without leaving the page.",
      approach:
        "The backend parses a PDF into a structured document, resolves each citation against an open metadata API, and embeds every abstract into pgvector. When you hover a citation, the reader pulls the referenced abstract and the specific passage most similar to the sentence doing the citing — so you see the relevant claim, not just the paper's title. The frontend is a two-pane React reader with keyboard navigation throughout.",
      outcome:
        "Resolves around 85% of citations correctly on the sample of 200 papers I tested against. Retrieval returns in about 120ms warm. I use it for coursework every week, which is the honest measure of whether a tool works.",
      reflection:
        "PDF parsing is a swamp and I spent nearly half the project in it. If I started again I would build on an existing extraction library rather than writing my own heuristics for column detection.",
    },
    highlights: [
      "Citation-aware retrieval: matches the passage, not just the paper",
      "pgvector similarity search returning in ~120ms warm",
      "Two-pane reader, fully keyboard navigable",
      "Handles two-column PDF layouts, which is harder than it sounds",
    ],
    links: [
      { label: "Live demo", href: "https://example.com/paper" },
      { label: "Source", href: "https://github.com/dhruvv1402" },
    ],
    cover: {
      src: "/work/paper.jpg",
      alt: "Two-pane paper reader showing a citation preview",
      caption: "Fig. 3 — A citation previewed in the right-hand pane.",
    },
  },

  {
    slug: "loom-design-system",
    title: "Loom",
    year: "2024",
    discipline: "Design systems",
    summary:
      "A component library and token pipeline that got four student projects looking like they came from the same team.",
    featured: false,
    stack: ["TypeScript", "React", "Tailwind CSS", "Storybook", "Style Dictionary"],
    role: "Maintainer",
    context: "Team of 5, university society",
    study: {
      problem:
        "Our society shipped four small web projects a year and every one of them reinvented buttons, forms, and colour. Nothing was accessible by default, and each new contributor started from a blank file.",
      approach:
        "I defined the design tokens once in JSON and generated the CSS variables, the Tailwind theme, and the Figma variables from the same source via Style Dictionary — so a colour change lands in code and design at once. On top of that sits a component library documented in Storybook, with accessibility checks running in CI on every pull request.",
      outcome:
        "Adopted by all four projects. Axe reports zero critical violations across the library. New contributors now ship a working, accessible page on day one instead of week two.",
      reflection:
        "I documented the components thoroughly and the tokens barely at all, so people used the components correctly and the colours however they liked. The documentation people actually need is the boring foundational layer.",
    },
    highlights: [
      "One token source generating CSS, Tailwind, and Figma variables",
      "Zero critical axe violations, enforced in CI",
      "26 components documented in Storybook",
      "Adopted across four independent projects",
    ],
    links: [
      { label: "Storybook", href: "https://example.com/loom" },
      { label: "Source", href: "https://github.com/dhruvv1402" },
    ],
    cover: {
      src: "/work/loom.jpg",
      alt: "Storybook view of the Loom component library",
      caption: "Fig. 4 — The component library in Storybook.",
    },
  },

  {
    slug: "tidal-visualiser",
    title: "Tidal",
    year: "2024",
    discipline: "Graphics / WebGL",
    summary:
      "An audio-reactive fluid simulation running at 60fps in the browser, written to learn what a shader actually is.",
    featured: false,
    stack: ["TypeScript", "Three.js", "GLSL", "Web Audio API"],
    role: "Solo",
    context: "Solo project, learning exercise",
    study: {
      problem:
        "I could use a graphics library but I could not have told you what the GPU was doing underneath. I wanted a project where not understanding the hardware would actually hurt.",
      approach:
        "A Navier-Stokes fluid solver implemented as a chain of GLSL fragment shaders, running on ping-pong framebuffers so each step reads the previous frame's texture. The Web Audio API's analyser node feeds frequency bands into the simulation as force injections, so bass moves the fluid differently from treble.",
      outcome:
        "Holds 60fps at 1080p on integrated graphics. More to the point, I now understand framebuffers, texture precision, and why everything on a GPU is a trade against bandwidth.",
      reflection:
        "The first version ran at 12fps because I was reading pixels back to the CPU every frame to normalise them. Learning to keep the whole loop on the GPU was the actual lesson of the project.",
    },
    highlights: [
      "GLSL fluid solver on ping-pong framebuffers, fully GPU-resident",
      "60fps at 1080p on integrated graphics",
      "Frequency-band audio analysis driving force injection",
      "No rendering library beyond Three.js for context setup",
    ],
    links: [
      { label: "Live demo", href: "https://example.com/tidal" },
      { label: "Source", href: "https://github.com/dhruvv1402" },
    ],
    cover: {
      src: "/work/tidal.jpg",
      alt: "Still frame from the Tidal audio-reactive fluid simulation",
      caption: "Fig. 5 — The simulation responding to a bass transient.",
    },
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Previous and next in `projects` order, for the foot of a case study. */
export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
