"use client";

import { useProjects } from "@/contexts/ProjectsContext";

export default function SceneBuilder() {
  const { getActiveProject } = useProjects();
  const project = getActiveProject();

  if (!project) return <p className="text-gray-400">No active project selected.</p>;

  const allInputs = [...project.phrases, ...project.journalNotes];

  const dummyScenes = [
    `Scene 1: ${allInputs[0] || "A memory lingers near the cracked mirror..."}`,
    `Scene 2: ${allInputs[1] || "A whisper follows footsteps into the ash corridor."}`,
    `Scene 3: ${allInputs[2] || "Silhouettes stand still while wind howls."}`,
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">🎬 Scene Suggestions</h2>
      {dummyScenes.map((scene, idx) => (
        <div key={idx} className="bg-[#1f1f1f] p-4 rounded shadow space-y-3 border border-gray-700">
          <p className="text-white text-sm">{scene}</p>
          <button
            onClick={() => alert("✅ Scene selected! (save logic will come soon)")}
            className="px-3 py-1 text-sm bg-green-600 rounded hover:bg-green-500"
          >
            ➕ Use This Scene
          </button>
        </div>
      ))}
    </div>
  );
}
