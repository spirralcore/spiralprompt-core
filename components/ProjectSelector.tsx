"use client";

import { useProjects } from "@/hooks/useProjects";
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
    <div className="w-full p-4 bg-[#1a1a1a] border-b border-gray-700 text-white flex items-center justify-between">
      <div className="text-sm">
        <span className="opacity-50">Current Project:</span>{" "}
        <strong>
          {projects.find((p) => p.id === activeProjectId)?.title || "No project selected"}
        </strong>
      </div>

      <div className="flex gap-2 items-center">
        <select
          value={activeProjectId || ""}
          onChange={(e) => selectProject(e.target.value)}
          className="bg-[#2a2a2a] p-2 text-sm rounded"
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
              className="p-2 bg-[#2a2a2a] rounded text-sm"
            />
            <button
              onClick={handleAddProject}
              className="bg-green-600 px-3 py-1 text-sm rounded"
            >
              Add
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="bg-gray-700 px-3 py-1 text-sm rounded hover:bg-gray-600"
          >
            ➕ New Project
          </button>
        )}
      </div>
    </div>
  );
}
