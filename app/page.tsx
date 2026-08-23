import { notes, site, ticker } from "@/content/site";
import { getRecentRepos } from "@/lib/github";
import { padIndex } from "@/lib/utils";
import { Marquee } from "@/components/layout/Marquee";
import { Masthead } from "@/components/home/Masthead";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AboutColumn } from "@/components/home/AboutColumn";
import { StackClassifieds } from "@/components/home/StackClassifieds";
import { Chronicle } from "@/components/home/Chronicle";
import { GithubDispatch } from "@/components/home/GithubDispatch";
import { Notes } from "@/components/home/Notes";
import { ContactBlock } from "@/components/home/ContactBlock";

/**
 * The front page, composed in reading order.
 *
 * The folio numbers are handed out here rather than hardcoded in each section,
 * so the running order and the numbering can never drift apart. `folio()` only
 * runs for a section that actually renders — the `&&` short-circuits — which
 * keeps the sequence unbroken when GitHub is unreachable or the notes list is
 * empty. Reorder the sections by moving lines; the numbers follow.
 */
export default async function HomePage() {
  const repos = await getRecentRepos(site.github);

  let section = 0;
  const folio = () => padIndex(++section);

  return (
    <>
      <Masthead />
      <Marquee items={ticker} duration={45} />

      <SelectedWork index={folio()} />
      <AboutColumn index={folio()} />
      <StackClassifieds index={folio()} />
      <Chronicle index={folio()} />
      {repos.length > 0 && <GithubDispatch repos={repos} index={folio()} />}
      {notes.length > 0 && <Notes index={folio()} />}

      <Marquee items={ticker} duration={55} reverse />
      <ContactBlock index={folio()} />
    </>
  );
}
