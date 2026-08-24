/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ★  THIS IS THE FILE TO EDIT.  ★
 * ─────────────────────────────────────────────────────────────────────────────
 *  Your real projects, taken from the résumé.
 *
 *  READ THIS BEFORE PUBLISHING:
 *
 *  `problem` and `approach` are written from your own résumé descriptions, so
 *  the facts are yours — but they are necessarily general, because a one-line
 *  résumé entry does not say what went wrong or what you chose.
 *
 *  `outcome` and `reflection` are EMPTY on purpose. Nothing invented a number,
 *  a benchmark, or a user count on your behalf. A passage with an empty body
 *  is skipped when the page renders, so the site is complete and honest as it
 *  stands — it is simply quieter than it could be.
 *
 *  Filling those two fields in is the highest-value hour you can spend on this
 *  site. A screenshot says you can use a framework; "here is what it cost me to
 *  find out" says you can think. Put a real number in `outcome` wherever you
 *  have one, and say something true in `reflection` even if it is unflattering
 *  — being able to name what you would change reads as seniority.
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
  /** Year or range. Optional — omitted rather than guessed where unknown. */
  year?: string;
  /** Two or three words. Shown beside the title in the work list. */
  discipline: string;
  /** One sentence. The hook in the index and the meta description. */
  summary: string;
  /** Promote to the home page. Keep this to three or four. */
  featured: boolean;
  /** Technologies, most significant first. */
  stack: string[];
  /** Your part in it. */
  role: string;
  /** Team size and setting. */
  context: string;
  study: {
    problem: string;
    approach: string;
    /** ★ Fill this in. Empty passages are skipped, not rendered blank. */
    outcome: string;
    /** ★ Fill this in. What you would do differently. */
    reflection: string;
  };
  /** Specifics an engineer skims for. */
  highlights: string[];
  links: ProjectLink[];
  /** Drop screenshots in public/work/. Missing files fall back to a ruled mat. */
  cover: { src: string; alt: string; caption: string };
  gallery?: { src: string; alt: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "fmri-functional-connectivity",
    title: "Connectome",
    discipline: "Computational neuroscience",
    summary:
      "A Python toolkit for analysing functional connectivity in fMRI data — coherence metrics, network analysis, statistical testing and visualisation in one framework.",
    featured: true,
    stack: ["Python", "NumPy", "SciPy", "NetworkX", "Matplotlib", "fMRI pipelines"],
    role: "Author",
    context: "Faculty-guided research, Bennett University",
    study: {
      problem:
        "Functional connectivity analysis is spread across a dozen tools that do not agree on file formats, assumptions, or what a significance test means in this context. Getting from a preprocessed scan to a defensible statement about how two regions communicate means stitching several of them together by hand, and the stitching is where errors hide.",
      approach:
        "A single Python framework covering the path end to end: coherence metrics between region time series, graph-theoretic analysis of the resulting networks, statistical testing over those measures, and visualisation. Keeping it in one toolkit means the assumptions are stated once and the intermediate representations do not have to survive a round trip through a file format.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "Coherence-based connectivity metrics between region time series",
      "Graph-theoretic network analysis over the resulting connectome",
      "Statistical testing built into the pipeline rather than bolted on",
      "Visualisation of connectivity matrices and network structure",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/advanced-fmri-functional-connectivity-analysis-framework",
      },
    ],
    cover: {
      src: "/work/connectome.jpg",
      alt: "Functional connectivity matrix and brain network visualisation",
      caption: "Fig. 1 — Connectivity matrix and derived network.",
    },
  },

  {
    slug: "terravit",
    title: "TerraVit",
    year: "2025",
    discipline: "Vision / Climate AI",
    summary:
      "A climate intelligence system reading satellite imagery with vision transformers. Second runner-up at Project Showcase 2025.",
    featured: true,
    stack: ["Python", "PyTorch", "Vision Transformers", "Satellite imagery"],
    role: "Team project",
    context: "Project Showcase 2025 — Bennett University × Times of India",
    study: {
      problem:
        "Climate signal is visible from orbit long before it is visible in a report, but satellite imagery arrives faster than anyone can look at it. The useful question is not whether the data exists — it is whether a model can be pointed at it and asked something specific.",
      approach:
        "Vision transformers applied to satellite imagery, chosen over convolutional architectures because attention handles the long-range spatial structure that matters at this scale: a pattern spanning a whole tile rather than a local texture.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "Vision transformer architecture over satellite imagery tiles",
      "Second runner-up, Project Showcase 2025",
    ],
    links: [
      {
        label: "Write-up",
        href: "https://www.linkedin.com/posts/dhruvv-gupta_globalaisummit-acm-climateai-activity-7397605909637799936-Zx1p",
      },
    ],
    cover: {
      src: "/work/terravit.jpg",
      alt: "TerraVit interface showing satellite imagery analysis",
      caption: "Fig. 2 — Satellite tile under analysis.",
    },
  },

  {
    slug: "bittorrent-client",
    title: "BitTorrent",
    discipline: "Networking / Systems",
    summary:
      "A BitTorrent client written from the protocol up in Python — peer communication, piece management and concurrent downloading over raw sockets.",
    featured: true,
    stack: ["Python", "asyncio", "Sockets", "BitTorrent protocol"],
    role: "Solo",
    context: "Independent project",
    study: {
      problem:
        "BitTorrent is one of those protocols everyone has used and almost nobody has read. I wanted the version of the understanding you only get from having to implement the handshake yourself and watch it fail.",
      approach:
        "Built lightweight and asynchronous, on raw sockets and asynchronous I/O rather than a networking library. Core protocol functionality implemented directly: peer communication, piece management, and concurrent downloading of pieces from multiple peers at once.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "Core protocol implemented directly — peer handshake and messaging",
      "Piece management across concurrent peer connections",
      "Asynchronous I/O over raw sockets, no networking library",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/BitTorrent-Client-Python",
      },
    ],
    cover: {
      src: "/work/bittorrent.jpg",
      alt: "BitTorrent client downloading pieces from multiple peers",
      caption: "Fig. 3 — Concurrent piece download in progress.",
    },
  },

  {
    slug: "redis-client-rust",
    title: "Redis in Rust",
    discipline: "Systems / Concurrency",
    summary:
      "A minimal asynchronous Redis client built on Tokio, written for performance and concurrency rather than feature coverage.",
    featured: false,
    stack: ["Rust", "Tokio", "Redis protocol"],
    role: "Solo",
    context: "Independent project",
    study: {
      problem:
        "Redis clients are easy to use and hard to see inside. Writing one in Rust puts you in contact with the parts that are usually hidden: the wire protocol, the connection lifecycle, and what asynchrony actually costs when the borrow checker is watching.",
      approach:
        "Deliberately minimal, built on Tokio's asynchronous runtime with concurrency as the design constraint rather than an afterthought. The scope is narrow on purpose — enough of the protocol to be genuinely useful, not enough to obscure what the code is doing.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "Asynchronous throughout, built on the Tokio runtime",
      "Redis wire protocol implemented directly",
      "Minimal surface area, chosen for legibility over coverage",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Redis-Client-RUST",
      },
    ],
    cover: {
      src: "/work/redis.jpg",
      alt: "Redis client running against a local server",
      caption: "Fig. 4 — Client under load.",
    },
  },

  {
    slug: "wraith-os",
    title: "Wraith OS",
    discipline: "Cloud / Systems",
    summary:
      "RetroCloud, a lightweight cloud file management prototype. Special Jury Award at the NST GenAI Hackathon.",
    featured: false,
    stack: ["Python", "FastAPI", "Shell", "Cloud systems"],
    role: "Team project",
    context: "NST GenAI Hackathon",
    study: {
      problem:
        "Cloud file management arrives as a heavy, opinionated product when what is often wanted is something small enough to reason about and quick enough to build inside a hackathon's clock.",
      approach:
        "A deliberately lightweight prototype: FastAPI for the surface, Python and shell tooling underneath, aimed at proving the interaction rather than shipping a platform.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "FastAPI service over Python and shell tooling",
      "Special Jury Award, NST GenAI Hackathon",
    ],
    links: [
      {
        label: "Write-up",
        href: "https://www.linkedin.com/posts/dhruvv-gupta_wraithflash-activity-7318287884191490048-Bdeu",
      },
    ],
    cover: {
      src: "/work/wraith.jpg",
      alt: "Wraith OS RetroCloud interface",
      caption: "Fig. 5 — The RetroCloud prototype.",
    },
  },

  {
    slug: "bug-bounty-toolkit",
    title: "Recon",
    discipline: "Security / Automation",
    summary:
      "An automated reconnaissance framework tying subdomain enumeration, vulnerability detection and OSINT into a single workflow.",
    featured: false,
    stack: ["Python", "Shell", "OSINT tooling"],
    role: "Solo",
    context: "Independent project",
    study: {
      problem:
        "The reconnaissance phase of a bug bounty is mostly the same commands in the same order against a different target, and running them by hand is both slow and easy to do inconsistently — which is the worse of the two problems, because inconsistency is invisible.",
      approach:
        "One framework wrapping the stages that were previously separate tools: subdomain enumeration, vulnerability detection, and OSINT gathering, integrated so the output of each feeds the next rather than a directory of text files.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "Subdomain enumeration, vulnerability detection and OSINT in one pass",
      "Stages chained so each feeds the next automatically",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Bug-Bounty-Hunter",
      },
    ],
    cover: {
      src: "/work/recon.jpg",
      alt: "Reconnaissance framework enumerating a target",
      caption: "Fig. 6 — An enumeration run.",
    },
  },

  {
    slug: "misinformation-detection",
    title: "Veracity",
    discipline: "NLP / Research",
    summary:
      "Binary text classification pipelines on BERT and RoBERTa for detecting misinformation.",
    featured: false,
    stack: ["Python", "PyTorch", "BERT", "RoBERTa", "Transformers"],
    role: "Solo",
    context: "Independent research, Bennett University",
    study: {
      problem:
        "Misinformation detection is posed as a classification problem and is not really one — the label depends on context a sentence does not carry. The useful starting question is how far a transformer gets on surface signal alone, and where exactly it stops.",
      approach:
        "Binary classification pipelines built on both BERT and RoBERTa, run as a comparison rather than a single model, so architecture choice was a variable rather than an assumption.",
      outcome: "",
      reflection: "",
    },
    highlights: [
      "BERT and RoBERTa compared on the same classification task",
      "Full fine-tuning pipeline rather than a frozen feature extractor",
    ],
    links: [],
    cover: {
      src: "/work/veracity.jpg",
      alt: "Classification results across BERT and RoBERTa",
      caption: "Fig. 7 — Architecture comparison.",
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
