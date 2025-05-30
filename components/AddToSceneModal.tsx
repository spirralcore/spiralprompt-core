"use client";

import { useProjects } from "@/contexts/ProjectsContext";
import { useState } from "react";

export default function AddToSceneModal({
  phrase,
  onClose,
}: {
  phrase: string;
  onClose: () => void;
}) {
  const { projects, addSceneToProject } = useProjects(); // ✅ Buraya dikkat
  const [selectedId, setSelectedId] = useState("");

  const handleAdd = () => {
    if (!selectedId) return;
    console.log("🧠 AddToSceneModal çalıştı:", selectedId, phrase); // debug için
    addSceneToProject(phrase, selectedId); // ✅ Scene olarak ekliyoruz
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] p-6 rounded shadow-lg w-full max-w-md space-y-4 text-white">
        <h2 className="text-xl font-bold">Select Project to Add Scene</h2>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-400">No projects found. Please create one first.</p>
        ) : (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-2 rounded bg-[#2a2a2a] text-sm"
          >
            <option value="">-- Select Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={!selectedId}
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-sm disabled:opacity-50"
          >
            Add to Scene
          </button>
        </div>
      </div>
    </div>
  );
}
