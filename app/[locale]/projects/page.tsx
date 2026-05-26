import ProjectsContent from "@/components/sections/ProjectsContent";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return <ProjectsContent />;
}
