"use client";

import { useProjects } from "@/contexts/ProjectsContext";
import ProjectCard from "./ProjectCard";

export default function YourEchoContainer() {
  const { projects } = useProjects();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">📂 Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-400">You don’t have any projects yet.</p>
      ) : (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
