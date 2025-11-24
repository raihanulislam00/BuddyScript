import Link from "next/link";
import { notFound } from "next/navigation";

import { getExploreItem } from "@/lib/explore";

interface ExplorePageProps {
  params: {
    slug: string;
  };
}

export default function ExplorePage({ params }: ExplorePageProps) {
  const item = getExploreItem(params.slug);

  if (!item) {
    return notFound();
  }

  return (
    <div className="feed-page feed-page--light">
      <main className="explore-page">
        <header className="card explore-hero">
          <div className="explore-hero__pill">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge ? <span className="feed-pill">{item.badge}</span> : null}
          </div>
          <h1>{item.heroTitle}</h1>
          <p className="explore-hero__subtitle">{item.heroSubtitle}</p>
          <p className="explore-hero__description">{item.description}</p>
          <div className="explore-hero__cta">
            <Link href={item.ctaHref} className="btn btn-primary">
              {item.ctaLabel}
            </Link>
            <Link href="/feed" className="btn btn-light">
              Back to feed
            </Link>
          </div>
          <ul className="explore-hero__stats">
            {item.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <section className="card explore-highlights">
          <div className="explore-highlights__header">
            <h2>Why you&apos;ll love {item.label}</h2>
            <p>Three quick wins to get you started.</p>
          </div>
          <ul>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="explore-sections">
          {item.sections.map((section) => (
            <article key={section.title} className="card explore-tile">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
