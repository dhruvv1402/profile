/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ★  THIS IS THE FILE TO EDIT.  ★
 * ─────────────────────────────────────────────────────────────────────────────
 *  Taken strictly from the résumé. Titles are the real project names, the
 *  summaries are the résumé's own descriptions, and the stacks list only the
 *  technologies the résumé actually names for that project — not everything
 *  from the skills section.
 *
 *  Everything the résumé does not state is simply absent: no invented years,
 *  no invented team sizes, no invented libraries. Optional fields are omitted
 *  rather than filled with a guess, and the page skips whatever is missing.
 *
 *  ★ The `study` fields are yours to write. ★
 *  A résumé line says what a thing is. A case study says what was hard about
 *  it, what you chose, and what it cost — and that is the only part of this
 *  site that cannot be reconstructed from a PDF. Empty passages are skipped
 *  entirely, so the pages are honest as they stand; they are just quieter than
 *  they could be. Filling these in is the highest-value hour you can spend here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  /** URL segment: /work/<slug>. Lowercase, hyphenated, never changed once shared. */
  slug: string;
  /** The real project name, as it appears on the résumé and on GitHub. */
  title: string;
  /** Shorter label for the index lists, where the full title would overwhelm. */
  shortTitle?: string;
  /** Omitted unless the résumé actually dates it. */
  year?: string;
  /** Two or three words, for the index. */
  discipline: string;
  /** The résumé's own description. */
  summary: string;
  /** Promote to the home page. */
  featured: boolean;
  /** Only technologies the résumé names for this project. May be empty. */
  stack: string[];
  /** An award this project won, if any. */
  award?: string;
  /** Omitted where the résumé does not say. */
  role?: string;
  context?: string;
  /** ★ Yours to write. Empty passages are skipped, not rendered blank. */
  study: {
    problem: string;
    approach: string;
    outcome: string;
    reflection: string;
  };
  /** Drawn only from the résumé's own clauses. */
  highlights: string[];
  links: ProjectLink[];
  /** Drop screenshots in public/work/. Missing files fall back to a ruled mat. */
  cover: { src: string; alt: string; caption: string };
  gallery?: { src: string; alt: string; caption: string }[];
};

const emptyStudy = {
  problem: "",
  approach: "",
  outcome: "",
  reflection: "",
};

export const projects: Project[] = [
  {
    slug: "terravit",
    title: "TerraVit",
    year: "2025",
    discipline: "Vision / Climate AI",
    summary: "An AI-powered climate intelligence system.",
    featured: true,
    stack: ["Vision Transformers", "Satellite Imagery", "Climate AI"],
    award:
      "2nd Runner-Up — Project Showcase 2025, Bennett University × Times of India",
    study: { ...emptyStudy },
    highlights: ["Vision transformers applied to satellite imagery"],
    links: [
      { label: "Live site", href: "https://terra-vi-t.vercel.app/" },
      {
        label: "Write-up",
        href: "https://www.linkedin.com/posts/dhruvv-gupta_globalaisummit-acm-climateai-activity-7397605909637799936-Zx1p",
      },
    ],
    cover: {
      src: "/work/terravit.jpg",
      alt: "TerraVit climate intelligence system",
      caption: "Fig. 1 — TerraVit.",
    },
  },

  {
    /* Summary taken from the live product page's own description. */
    slug: "prakriva",
    title: "Prakriva",
    year: "2026",
    discipline: "AI / Health platform",
    summary:
      "AI-powered Ayurvedic diet management platform connecting doctors and patients for personalised wellness and nutrition plans.",
    featured: true,
    stack: [],
    study: { ...emptyStudy },
    highlights: [
      "Doctor and patient sides of one platform",
      "Personalised Ayurvedic nutrition plans",
    ],
    links: [{ label: "Live site", href: "https://prakriva.vercel.app/" }],
    cover: {
      src: "/work/prakriva.jpg",
      alt: "Prakriva Ayurvedic diet management platform",
      caption: "Fig. 2 — Prakriva.",
    },
  },

  {
    slug: "fmri-functional-connectivity",
    title: "Advanced fMRI Functional Connectivity Analysis Framework",
    shortTitle: "fMRI Connectivity Framework",
    discipline: "Computational neuroscience",
    summary:
      "Comprehensive Python toolkit for fMRI functional connectivity analysis with coherence metrics, network analysis, statistical testing, and visualisation.",
    featured: true,
    stack: ["Python"],
    context: "Ongoing research — an interface for the toolkit is in the works.",
    study: { ...emptyStudy },
    highlights: [
      "Coherence metrics",
      "Network analysis",
      "Statistical testing",
      "Visualisation",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/advanced-fmri-functional-connectivity-analysis-framework",
      },
    ],
    cover: {
      src: "/work/fmri.jpg",
      alt: "fMRI functional connectivity analysis output",
      caption: "Fig. 3 — Connectivity analysis output.",
    },
  },

  {
    slug: "wraith-os-retrocloud",
    title: "Wraith OS — RetroCloud",
    shortTitle: "Wraith OS",
    discipline: "Cloud systems",
    summary: "A lightweight cloud file management prototype.",
    featured: true,
    stack: ["FastAPI", "Python", "Shell", "Cloud Systems"],
    award: "Special Jury Award — NST GenAI Hackathon",
    study: { ...emptyStudy },
    highlights: ["Lightweight cloud file management"],
    links: [
      {
        label: "Write-up",
        href: "https://www.linkedin.com/posts/dhruvv-gupta_wraithflash-activity-7318287884191490048-Bdeu",
      },
    ],
    cover: {
      src: "/work/wraith-os.jpg",
      alt: "Wraith OS RetroCloud prototype",
      caption: "Fig. 4 — The RetroCloud prototype.",
    },
  },

  {
    /* Summary from the repository's own description. */
    slug: "brain-tumor-segmentation-unet",
    title: "Brain Tumour Segmentation — U-Net on BraTS 2020",
    shortTitle: "U-Net on BraTS 2020",
    discipline: "Medical imaging / DL",
    summary:
      "Deep learning pipeline automating brain tumour segmentation from multi-modal MRI scans on the BraTS 2020 dataset, distinguishing necrotic core, peritumoral edema, and enhancing tumour.",
    featured: true,
    stack: ["Python"],
    study: { ...emptyStudy },
    highlights: [
      "Multi-modal MRI input",
      "Necrotic core, edema, and enhancing tumour classes",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Brain-Tumor-Segmentation-U-Net-on-BraTS-2020",
      },
    ],
    cover: {
      src: "/work/brats-unet.jpg",
      alt: "U-Net brain tumour segmentation output",
      caption: "Fig. 5 — Segmentation masks.",
    },
  },

  {
    /* CHECK THIS: summary derived from the repository name only. */
    slug: "conditional-gans-mri-segmentation",
    title: "Conditional GANs for MRI Tumour Segmentation",
    shortTitle: "Conditional GANs for MRI",
    discipline: "Medical imaging / DL",
    summary:
      "Conditional generative adversarial networks applied to tumour segmentation on MRI scans.",
    featured: true,
    stack: ["Python"],
    study: { ...emptyStudy },
    highlights: [],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Conditional-GANs-for-MRI-Tumor-Segmentation",
      },
    ],
    cover: {
      src: "/work/cgan-mri.jpg",
      alt: "Conditional GAN segmentation output",
      caption: "Fig. 6 — Generated segmentations.",
    },
  },

  {
    /* CHECK THIS: summary derived from the repository name only. */
    slug: "parking-compliance-yolov11m",
    title: "Intelligent Parking Compliance — YOLOv11m",
    shortTitle: "Parking Compliance YOLO",
    discipline: "Computer vision",
    summary:
      "Parking compliance detection built on YOLOv11m object detection.",
    featured: false,
    stack: ["Python"],
    study: { ...emptyStudy },
    highlights: [],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Intelligent-Parking-Compliance-YoloV11m",
      },
    ],
    cover: {
      src: "/work/parking-yolo.jpg",
      alt: "YOLO parking compliance detections",
      caption: "Fig. 7 — Detections in frame.",
    },
  },

  {
    slug: "bittorrent-client-python",
    title: "BitTorrent Client in Python",
    shortTitle: "BitTorrent Client",
    discipline: "Networking / Systems",
    summary:
      "Lightweight, asynchronous BitTorrent client implementing core protocol functionality including peer communication, piece management, and concurrent file downloading using sockets and asynchronous I/O.",
    featured: false,
    stack: ["Python", "Sockets", "Asynchronous I/O"],
    study: { ...emptyStudy },
    highlights: [
      "Peer communication",
      "Piece management",
      "Concurrent file downloading",
      "Sockets and asynchronous I/O",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/BitTorrent-Client-Python",
      },
    ],
    cover: {
      src: "/work/bittorrent.jpg",
      alt: "BitTorrent client downloading from peers",
      caption: "Fig. 8 — The client in operation.",
    },
  },

  {
    slug: "redis-client-rust",
    title: "Redis Client in Rust",
    shortTitle: "Redis Client",
    discipline: "Systems / Concurrency",
    summary:
      "Minimal asynchronous Redis client built using Tokio, focused on high performance and concurrency.",
    featured: false,
    stack: ["Rust", "Tokio"],
    study: { ...emptyStudy },
    highlights: [
      "Asynchronous client built on Tokio",
      "Focused on high performance and concurrency",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Redis-Client-RUST",
      },
    ],
    cover: {
      src: "/work/redis.jpg",
      alt: "Redis client in Rust",
      caption: "Fig. 9 — The client under load.",
    },
  },

  {
    slug: "bug-bounty-hunter",
    title: "Bug Bounty Hunter Toolkit",
    shortTitle: "Bug Bounty Hunter",
    discipline: "Security / Automation",
    summary:
      "Automated reconnaissance framework integrating subdomain enumeration, vulnerability detection, and OSINT workflows.",
    featured: false,
    stack: [],
    study: { ...emptyStudy },
    highlights: [
      "Subdomain enumeration",
      "Vulnerability detection",
      "OSINT workflows",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/dhruvv1402/Bug-Bounty-Hunter",
      },
    ],
    cover: {
      src: "/work/bug-bounty.jpg",
      alt: "Reconnaissance framework output",
      caption: "Fig. 10 — A reconnaissance run.",
    },
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export const featuredProjects = projects.filter((p) => p.featured);

/** The short label where one is set, otherwise the full title. */
export function projectLabel(project: Project) {
  return project.shortTitle ?? project.title;
}

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
