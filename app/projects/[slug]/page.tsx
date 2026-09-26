import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyProjectDetail from "@/components/LegacyProjectDetail";
import { legacyProjects } from "@/data/projects";
import { sharedOpenGraph, sharedTwitter } from "../../../lib/seo";

const retainedSlugs = ["neighborlink", "petcare-hub", "personal-crm", "watchwise"];
type Props = { params: Promise<{ slug: string }> };

function getProject(slug: string) {
  const project = legacyProjects.find((item) => item.slug === slug);
  if (!retainedSlugs.includes(slug) || !project) notFound();
  return project;
}

export function generateStaticParams() {
  return retainedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  const title = `${project.title} — Case Study`;
  const description = project.summary;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { ...sharedOpenGraph, title: `${title} | Hector Virrey`, description, url: `/projects/${project.slug}` },
    twitter: { ...sharedTwitter, title: `${title} | Hector Virrey`, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  return <LegacyProjectDetail project={project} />;
}
