"use client";

import { useProjects } from "@/contexts/ProjectsContext";

export default function Storyboard() {
  const { getActiveProject, deleteSceneFromProject } = useProjects();
  const activeProject = getActiveProject();

  if (!activeProject) return <p className="text-gray-400">No active project selected.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">📽️ {activeProject.title} — Storyboard</h2>
      {activeProject.scenes.length === 0 ? (
        <p className="text-gray-500">No scenes added yet.</p>
      ) : (
        <ul className="space-y-4">
          {activeProject.scenes.map((scene, idx) => (
            <li
              key={idx}
              className="relative p-4 bg-[#1f1f1f] rounded shadow text-sm text-white border border-gray-700"
            >
              <span>{scene}</span>
              <button
                onClick={() => deleteSceneFromProject(scene)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
