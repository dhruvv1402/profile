import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { CONTENT_IS_REAL } from "@/content/flags";

/** Every route is static and known at build time, so the sitemap is exhaustive. */
export default function sitemap(): MetadataRoute.Sitemap {
  // An empty sitemap while the copy is placeholder, so nothing is volunteered
  // to a crawler that ignores robots.txt. See content/flags.ts.
  if (!CONTENT_IS_REAL) return [];

  const now = new Date();

  const pages = ["", "/work", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...caseStudies];
}
