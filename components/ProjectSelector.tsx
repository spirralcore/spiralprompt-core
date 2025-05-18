"use client";

import { useProjects } from "@/contexts/ProjectsContext";
import { useState } from "react";

export default function ProjectSelector() {
  const {
    projects,
    activeProjectId,
    selectProject,
    addProject,
  } = useProjects();

  const [newTitle, setNewTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddProject = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    addProject(trimmed);
    setNewTitle("");
    setShowInput(false);
  };

  return (
    <div className="w-full p-4 bg-white/70 border-b border-gray-300 text-gray-800 flex items-center justify-between shadow-sm rounded-xl mb-6">
      <div className="text-sm font-medium">
        <span className="opacity-60">Current Project:</span>{" "}
        <strong>
          {projects.find((p) => p.id === activeProjectId)?.title || "No project selected"}
        </strong>
      </div>

      <div className="flex gap-2 items-center">
        <select
          value={activeProjectId || ""}
          onChange={(e) => selectProject(e.target.value)}
          className="bg-white border border-gray-300 p-2 text-sm rounded shadow-sm"
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        {showInput ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New project name"
              className="p-2 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={handleAddProject}
              className="bg-green-600 px-3 py-1 text-sm rounded text-white hover:bg-green-500"
            >
              Add
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="bg-gray-100 px-3 py-1 text-sm rounded hover:bg-gray-200"
          >
            ➕ New Project
          </button>
        )}
      </div>
    </div>
  );
}
