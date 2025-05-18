"use client";

import { useProjects } from "@/contexts/ProjectsContext";

export default function Storyboard() {
  const { getActiveProject, deleteSceneFromProject } = useProjects();
  const activeProject = getActiveProject();

  if (!activeProject) return <p className="text-gray-400">No active project selected.</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">📽️ Storyboard for: {activeProject.title}</h2>

      {activeProject.scenes.length === 0 ? (
        <p className="text-gray-500">No scenes added to this project yet. Use the Scene Builder to create one.</p>
      ) : (
        <ul className="space-y-4">
          {activeProject.scenes.map((scene, idx) => (
            <li
              key={idx}
              className="relative bg-[#1f1f1f] p-4 rounded shadow text-white text-sm border border-gray-700"
            >
              <div className="whitespace-pre-line">{scene}</div>
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
