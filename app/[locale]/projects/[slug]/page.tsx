import { notFound } from "next/navigation";
import ProjectDetail from "@/components/sections/ProjectDetail";
import type { Metadata } from "next";

const VALID_SLUGS = ["legalmasters"];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "legalmasters") {
    return { title: "Capital Legal Masters — Project" };
  }
  return { title: "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }
  return <ProjectDetail slug={slug} />;
}
