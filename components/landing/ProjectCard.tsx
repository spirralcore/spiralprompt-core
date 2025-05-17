"use client";

import { useState } from "react";
import type { Project } from "@/contexts/ProjectsContext";

export default function ProjectCard({ project }: { project: Project }) {
  const [activeSection, setActiveSection] = useState<"likes" | "phrases" | "scene" | "storys">("phrases");

  return (
    <div className="bg-[#1f1f1f] rounded shadow border border-gray-700 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-xs opacity-60">
            Created: {new Date(project.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          {(["likes", "phrases", "scene", "storys"] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-3 py-1 text-sm rounded transition-all ${
                activeSection === section
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
            >
              {section === "likes" && "❤️ Likes"}
              {section === "phrases" && "💬 Phrases"}
              {section === "scene" && "🎬 Scene"}
              {section === "storys" && "🌀 Storys"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {activeSection === "phrases" && (
          <ul className="space-y-2">
            {project.phrases.length === 0 ? (
              <li className="text-gray-400 text-sm">No phrases yet.</li>
            ) : (
              project.phrases.map((phrase, idx) => (
                <li key={idx} className="bg-[#2a2a2a] p-3 rounded text-sm">
                  {phrase}
                </li>
              ))
            )}
          </ul>
        )}

        {activeSection === "scene" && (
          <div className="text-gray-400 text-sm italic">🎬 Scene builder coming soon...</div>
        )}

        {activeSection === "storys" && (
          <div className="text-gray-400 text-sm italic">🌀 Storys module not implemented yet.</div>
        )}

        {activeSection === "likes" && (
          <div className="text-gray-400 text-sm italic">❤️ Likes will be tracked soon.</div>
        )}
      </div>
    </div>
  );
}
