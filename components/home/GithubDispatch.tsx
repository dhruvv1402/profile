import { site } from "@/content/site";
import type { Repo } from "@/lib/github";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Dispatches from the wire: recently-pushed public repositories, set as a
 * market table.
 *
 * Live data, revalidated hourly, so the section proves ongoing activity rather
 * than asserting it.
 *
 * The repos are fetched by the page rather than here. That is what lets the
 * page know whether this section will render at all, and therefore keep the
 * folio numbering unbroken when GitHub is unreachable — a section numbered 07
 * following one numbered 05 reads as a bug.
 */
export function GithubDispatch({
  repos,
  index,
}: {
  repos: Repo[];
  index: string;
}) {
  if (repos.length === 0) return null;

  return (
    <section id="dispatch" className="shell py-16 md:py-24">
      <SectionHead
        index={index}
        kicker="Dispatches from the wire"
        note="Updated hourly"
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left">
          <caption className="label pb-4 pt-3 text-left text-ink-mute">
            Most recently pushed public repositories, straight from the GitHub
            API.
          </caption>

          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="label py-2 pr-4 font-bold">
                Repository
              </th>
              <th scope="col" className="label py-2 pr-4 font-bold">
                Description
              </th>
              <th scope="col" className="label py-2 pr-4 font-bold">
                Language
              </th>
              <th scope="col" className="label py-2 text-right font-bold">
                Stars
              </th>
            </tr>
          </thead>

          <tbody>
            {repos.map((repo) => (
              <tr
                key={repo.name}
                className="border-b border-ink transition-colors hover:bg-paper-sub"
              >
                <td className="py-3 pr-4 align-top">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-rule font-mono text-sm font-bold"
                  >
                    {repo.name}
                  </a>
                </td>
                <td className="max-w-md py-3 pr-4 align-top text-sm text-ink-mute">
                  {repo.description ?? <span aria-hidden="true">&mdash;</span>}
                </td>
                <td className="label py-3 pr-4 align-top">
                  {repo.language ?? <span aria-hidden="true">&mdash;</span>}
                </td>
                <td className="label py-3 text-right align-top">
                  {repo.stars > 0 ? (
                    <span className="text-accent">{repo.stars}</span>
                  ) : (
                    <span aria-hidden="true">&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Reveal className="pt-6">
        <a
          href={`https://github.com/${site.github}`}
          target="_blank"
          rel="noreferrer noopener"
          className="label link-rule font-bold"
        >
          Full archive on GitHub &rarr;
        </a>
      </Reveal>
    </section>
  );
}
