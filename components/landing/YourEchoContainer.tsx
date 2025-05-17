"use client";

import { useProjects } from "@/contexts/ProjectsContext";

export default function YourEchoContainer() {
  const { projects } = useProjects();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">📂 Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-400">You don’t have any projects yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-[#1f1f1f] p-4 rounded shadow border border-gray-700 text-white"
            >
              <div className="text-lg font-semibold">{project.title}</div>
              <div className="text-xs opacity-60">Created at: {new Date(project.cr
