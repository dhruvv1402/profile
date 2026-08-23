import "server-only";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  updatedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

/**
 * Recently-pushed public repositories, fetched from the unauthenticated
 * GitHub API and revalidated hourly.
 *
 * Deliberately fails soft. The unauthenticated API is rate-limited to 60
 * requests an hour per IP, and a CI runner on a shared address can hit that,
 * so every failure path returns an empty list and the section quietly hides
 * itself. A portfolio that will not build because GitHub is briefly grumpy is
 * a worse portfolio.
 */
export async function getRecentRepos(
  username: string | null,
  limit = 6,
): Promise<Repo[]> {
  if (!username) return [];

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-site",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];

    return (data as GitHubRepo[])
      // Forks and archives pad a profile without saying anything about you.
      .filter((repo) => !repo.fork && !repo.archived)
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
        updatedAt: repo.pushed_at,
      }));
  } catch {
    return [];
  }
}
