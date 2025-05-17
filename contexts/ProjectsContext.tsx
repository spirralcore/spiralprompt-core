'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Project = {
  id: string;
  title: string;
  createdAt: number;
  phrases: string[];
  journalNotes: string[];
  engineLogs: string[];
};

type ProjectsContextType = {
  projects: Project[];
  activeProjectId: string | null;
  addProject: (title: string) => void;
  selectProject: (id: string) => void;
  addPhraseToProject: (phrase: string, id?: string) => void;
  removePhraseFromProject: (phrase: string, id?: string) => void;
  getActiveProject: () => Project | null;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects must be used inside ProjectsProvider");
  return context;
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('spiral_projects');
      const active = localStorage.getItem('spiral_activeProjectId');
      if (stored) setProjects(JSON.parse(stored));
      if (active) setActiveProjectId(active);
    } catch (err) {
      console.error("❌ localStorage read error:", err);
    }
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('spiral_projects', JSON.stringify(projects));
    }
  }, [projects]);

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
    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(newProject.id);
  };

  const selectProject = (id: string) => {
    setActiveProjectId(id);
  };

  const getActiveProject = (): Project | null => {
    return projects.find((p) => p.id === activeProjectId) || null;
  };

  const addPhraseToProject = (phrase: string, id?: string) => {
    const targetId = id || activeProjectId;
    if (!targetId) return;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetId && !p.phrases.includes(phrase)
          ? { ...p, phrases: [...p.phrases, phrase] }
          : p
      )
    );
  };

  const removePhraseFromProject = (phrase: string, id?: string) => {
    const targetId = id || activeProjectId;
    if (!targetId) return;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetId
          ? { ...p, phrases: p.phrases.filter((t) => t !== phrase) }
          : p
      )
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProjectId,
        addProject,
        selectProject,
        addPhraseToProject,
        removePhraseFromProject,
        getActiveProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}




