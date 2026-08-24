import type { Metadata } from "next";
import Link from "next/link";
import { bio, chronicle, honours, pullQuote, site, stack } from "@/content/site";
import { resumeAvailable } from "@/lib/assets";
import { PressImage } from "@/components/layout/PressImage";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: bio[0],
  alternates: { canonical: "/about" },
};

/**
 * The long-form account: the full bio, the complete chronicle split into its
 * two columns, and the stack in plain text.
 *
 * The home page carries an abridged version of all three. This is the page for
 * someone who has read that and wants the whole thing.
 */
export default function AboutPage() {
  const education = chronicle.filter((entry) => entry.kind === "education");
  const experience = chronicle.filter((entry) => entry.kind === "experience");

  return (
    <div className="shell pb-16 pt-10 md:pb-24">
      <header className="border-b border-ink pb-2">
        <p className="label text-accent">The author</p>
      </header>

      <div className="grid grid-cols-12 gap-x-8 gap-y-10 pt-8">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="display-xl">{site.fullName}</h1>
          <p className="label mt-4 text-ink-mute">
            {site.roles.join(" · ")}
          </p>

          <div className="columns-news dropcap mt-10 md:columns-2">
            {bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {pullQuote ? (
            <blockquote className="display-lg mt-10 border-y border-ink py-6">
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
          ) : null}
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <PressImage
            src={site.portrait.src}
            alt={site.portrait.alt}
            caption={site.portrait.caption}
            ratio="4/5"
            priority
            sizes="(max-width: 1024px) 100vw, 33vw"
          />

          <dl className="mt-8 space-y-3">
            <Row term="Based in" detail={site.location} />
            <Row term="Timezone" detail={site.timezone} />
            <Row term="Status" detail="Open to internships" accent />
          </dl>

          {resumeAvailable(site.resumeHref) ? (
            <a
              href={site.resumeHref}
              className="label link-rule mt-6 inline-block font-bold"
            >
              Download the r&eacute;sum&eacute; &darr;
            </a>
          ) : null}
        </aside>
      </div>

      {/* ── The chronicle, split into its two columns ────────────────────── */}
      <section className="pt-20">
        <SectionHead kicker="The chronicle" note="Newest first" />

        <div className="grid grid-cols-1 gap-x-8 pt-8 lg:grid-cols-2">
          <ChronicleColumn heading="Experience" entries={experience} />
          <ChronicleColumn
            heading="Education"
            entries={education}
            className="lg:border-l lg:border-ink lg:pl-8"
          />
        </div>
      </section>

      {/* ── Honours ──────────────────────────────────────────────────────── */}
      {honours.length > 0 ? (
        <section className="pt-20">
          <SectionHead kicker="Honours" note={`${honours.length} awards`} />

          <dl className="pt-2">
            {honours.map((honour) => (
              <Reveal
                key={`${honour.event}-${honour.award}`}
                className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-ink py-6"
              >
                <dt className="label col-span-12 text-accent md:col-span-3">
                  {honour.award}
                </dt>
                <dd className="col-span-12 md:col-span-9">
                  <h3 className="display-lg">{honour.event}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-mute">
                    {honour.detail}
                  </p>
                  {honour.href ? (
                    <a
                      href={honour.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="label link-rule tap mt-3 inline-block"
                    >
                      Read more &#8599;
                    </a>
                  ) : null}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>
      ) : null}

      {/* ── The stack, spelled out ───────────────────────────────────────── */}
      <section className="pt-20">
        <SectionHead kicker="Tools of the trade" />

        <dl className="pt-6">
          {stack.map((group) => (
            <Reveal
              key={group.heading}
              className="grid grid-cols-12 gap-x-6 gap-y-1 border-b border-ink py-4"
            >
              <dt className="label col-span-12 font-bold md:col-span-3">
                {group.heading}
              </dt>
              <dd className="col-span-12 text-sm md:col-span-9">
                {group.items.join(" · ")}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <p className="pt-16">
        <Link href="/work" className="label link-rule font-bold">
          Read the work &rarr;
        </Link>
      </p>
    </div>
  );
}

function Row({
  term,
  detail,
  accent = false,
}: {
  term: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink pb-2">
      <dt className="label text-ink-mute">{term}</dt>
      <dd className={`label ${accent ? "text-accent" : ""}`}>{detail}</dd>
    </div>
  );
}

function ChronicleColumn({
  heading,
  entries,
  className = "",
}: {
  heading: string;
  entries: typeof chronicle;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="label border-b border-ink pb-2 font-bold">{heading}</h2>
      <ol>
        {entries.map((entry) => (
          <Reveal
            as="li"
            key={`${entry.period}-${entry.title}`}
            className="border-b border-ink py-6"
          >
            <p className="label text-ink-mute">{entry.period}</p>
            <h3 className="display-lg mt-2">{entry.title}</h3>
            <p className="label mt-1 text-accent">{entry.org}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-mute">
              {entry.detail}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
