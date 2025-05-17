"use client";

import { useProjects } from "@/contexts/ProjectsContext";
import ProjectCard from "./ProjectCard";

export default function YourEchoContainer() {
  const { projects } = useProjects();

  if (projects.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        No projects found. Create one to begin your Echo journey.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
