import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { IS_INDEXABLE } from "@/content/flags";

export default function robots(): MetadataRoute.Robots {
  // While the copy is still placeholder, keep crawlers out entirely. See
  // content/flags.ts for the switch.
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
