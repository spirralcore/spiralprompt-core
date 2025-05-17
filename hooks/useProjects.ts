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
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setProjects(parsed);
        }
      }
      if (active) setActiveProjectId(active);
    } catch (err) {
      console.error("❌ Error loading from localStorage:", err);
    }
  }, []);

  // Save whenever projects change, but only if non-empty
  useEffect(() => {
    const valid = projects.length > 0 && projects.some(p => p.id && p.title);
    if (valid) {
      console.log("💾 Saving to localStorage:", projects);
      localStorage.setItem('spiral_projects', JSON.stringify(projects));
    }
  }, [projects]);

  // Save active project ID
  useEffect(() => {
    if (activeProjectId) {
      localStorage.setItem('spiral_activeProjectId', activeProjectId);
    }
  }, [activeProjectId]);

  const addProject = (title: string) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title,
      createdAt: Date.now(),
      phrases: [],
      journalNotes: [],
      engineLogs: [],
    };
    console.log("➕ Yeni proje ekleniyor:", newProject);
    setProjects((prev) => {
      const updated = [...prev, newProject];
      localStorage.setItem('spiral_projects', JSON.stringify(updated)); // 💾 hemen yaz
      return updated;
    });
    setActiveProjectId(newProject.id);
    localStorage.setItem('spiral_activeProjectId', newProject.id);
  };

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    localStorage.setItem('spiral_activeProjectId', id);
  };

  const getActiveProject = (): Project | null => {
    return projects.find((p) => p.id === activeProjectId) || null;
  };

  const addPhraseToProject = (phrase: string) => {
    if (!activeProjectId) return;
    addPhraseToSpecificProject(phrase, activeProjectId);
  };

  const addPhraseToSpecificProject = (phrase: string, projectId: string) => {
    console.log("✍️ Phrase ekleniyor:", { phrase, projectId });

    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? { ...p, phrases: [...p.phrases, phrase] }
          : p
      );
      localStorage.setItem('spiral_projects', JSON.stringify(updated)); // 💾 hemen yaz
      return updated;
    });
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
