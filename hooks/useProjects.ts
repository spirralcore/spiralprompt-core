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

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('spiral_projects');
      const active = localStorage.getItem('spiral_activeProjectId');
      if (stored) setProjects(JSON.parse(stored));
      if (active) setActiveProjectId(active);
    } catch (err) {
      console.error("Failed to load projects from localStorage:", err);
    }
  }, []);

  // Save whenever projects state changes
  useEffect(() => {
    localStorage.setItem('spiral_projects', JSON.stringify(projects));
  }, [projects]);

  // Save active project ID
  useEffect(() => {
    if (activeProjectId) {
      localStorage.setItem('spiral_activeProjectId', activeProjectId);
    }
  }, [activeProjectId]);

  // Add new project
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
  };

  // Set active project
  const selectProject = (id: string) => {
    setActiveProjectId(id);
  };

  // Get full object of active project
  const getActiveProject = (): Project | null => {
    return projects.find((p) => p.id === activeProjectId) || null;
  };

  // Add phrase to active project
  const addPhraseToProject = (phrase: string) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, phrases: [...p.phrases, phrase] }
          : p
      )
    );
  };

  // Add phrase to specific project
  const addPhraseToSpecificProject = (phrase: string, projectId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, phrases: [...p.phrases, phrase] }
          : p
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
    addPhraseToSpecificProject,
  };
}
