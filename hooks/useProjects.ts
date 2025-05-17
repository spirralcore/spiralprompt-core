'use client';

import { useEffect, useState } from 'react';

export type Project = {
  id: string;
  title: string;
  createdAt: number;
  phrases: string[];
  journalNotes: string[];
  engineLogs: string[];
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('spiral_projects');
    const active = localStorage.getItem('spiral_activeProjectId');
    if (stored) setProjects(JSON.parse(stored));
    if (active) setActiveProjectId(active);
  }, []);

  // Save to localStorage when projects change
  useEffect(() => {
    localStorage.setItem('spiral_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (title: string) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title,
      createdAt: Date.now(),
      phrases: [],
      journalNotes: [],
      engineLogs: [],
    };
    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    localStorage.setItem('spiral_activeProjectId', newProject.id);
  };

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    localStorage.setItem('spiral_activeProjectId', id);
  };

  const getActiveProject = () => {
    return projects.find((p) => p.id === activeProjectId) || null;
  };

  const addPhraseToProject = (phrase: string) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId ? { ...p, phrases: [...p.phrases, phrase] } : p
      )
    );
  };

  return {
    projects,
    activeProjectId,
    getActiveProject,
    addProject,
    selectProject,
    addPhraseToProject,
  };
}

