"use client";

import ProjectCard from "./ProjectCard";

const dummyGlobalProjects = [
  {
    id: "global-1",
    title: "Eclipse Archives",
    createdAt: Date.now() - 86400000 * 2,
    phrases: [
      "The sky cracked open like memory.",
      "A forgotten name echoes through the ruins."
    ],
    journalNotes: [],
    engineLogs: []
  },
  {
    id: "global-2",
    title: "Starfall Dreams",
    createdAt: Date.now() - 86400000 * 5,
    phrases: [
      "She followed the trail of light through the ash.",
      "Every silence was a question the void refused to answer."
    ],
    journalNotes: [],
    engineLogs: []
  }
];

export default function GlobalEchoContainer() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">🌍 Global Projects</h2>

      <ul className="space-y-6">
        {dummyGlobalProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
