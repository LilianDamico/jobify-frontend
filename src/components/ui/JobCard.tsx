"use client";

import Link from "next/link";

export type JobCardProps = {
  job: {
    id: string;
    title: string;
    company: string;
    category: string;
    job_type?: string | null;
    location?: string | null;
    url: string; // link externo
    published_at?: string | null;
    is_favorite?: boolean | null;
    tags?: string[] | null;
  };
};

export default function JobCard({ job }: JobCardProps) {
  const viewHref = `/jobs/${encodeURIComponent(job.id)}?url=${encodeURIComponent(
    job.url
  )}`;

  return (
    <article className="card p-5 flex flex-col gap-3">
      <header>
        <h3 className="font-semibold leading-tight">{job.title}</h3>
        <p className="text-[rgb(var(--muted))]">
          {job.company} • {job.location ?? "Remoto"}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {job.category && <span className="chip">{job.category}</span>}
        {job.job_type && <span className="chip">{job.job_type}</span>}
        {job.tags?.slice(0, 5).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {job.published_at && (
        <p className="text-xs text-[rgb(var(--muted))]">
          {new Date(job.published_at).toLocaleDateString("pt-BR")}
        </p>
      )}

      <div className="mt-2">
        <Link href={viewHref} className="btn btn--outline">
          Ver vaga
        </Link>
      </div>
    </article>
  );
}
