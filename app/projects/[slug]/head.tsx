import { projects } from '@/data/projects';

export default function Head({ params }: { params: { slug: string } }) {
  const p = projects.find(x => x.slug === params.slug);
  const title = p ? `${p.title} – Case Study` : 'Project';
  const desc = p?.summary ?? 'Project case study';
  const og = '/images/og.png';
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={og} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
