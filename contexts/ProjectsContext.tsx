'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Project = {
  id: string;
  title: string;
  createdAt: number;
  phrases: string[];
  journalNotes: string[];
  scenes: string[];
  engineLogs: string[];
};

type ProjectsContextType = {
  projects: Project[];
  activeProjectId: string | null;
  getActiveProject: () => Project | null;
  addProject: (title: string) => void;
  selectProject: (id: string) => void;
  addPhraseToProject: (phrase: string, id?: string) => void;
  deletePhraseFromProject: (phrase: string) => void;
  addNoteToProject: (note: string) => void;
  deleteNoteFromProject: (note: string) => void;
  addSceneToProject: (scene: string, id?: string) => void;
  deleteSceneFromProject: (scene: string) => void;
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

  const getActiveProject = () => {
    return projects.find((p) => p.id === activeProjectId) || null;
  };

  const addProject = (title: string) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title,
      createdAt: Date.now(),
      phrases: [],
      journalNotes: [],
      scenes: [],
      engineLogs: [],
    };
    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(newProject.id);
  };

  const selectProject = (id: string) => {
    setActiveProjectId(id);
  };

  const addPhraseToProject = (phrase: string, id?: string) => {
    const targetId = id || activeProjectId;
    if (!targetId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetId
          ? p.phrases.includes(phrase)
            ? p
            : { ...p, phrases: [...p.phrases, phrase] }
          : p
      )
    );
  };

  const deletePhraseFromProject = (phrase: string) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, phrases: p.phrases.filter((f) => f !== phrase) }
          : p
      )
    );
  };

  const addNoteToProject = (note: string) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, journalNotes: [...p.journalNotes, note] }
          : p
      )
    );
  };

  const deleteNoteFromProject = (note: string) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, journalNotes: p.journalNotes.filter((n) => n !== note) }
          : p
      )
    );
  };

  const addSceneToProject = (scene: string, id?: string) => {
    const targetId = id || activeProjectId;
    if (!targetId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetId
          ? p.scenes.includes(scene)
            ? p
            : { ...p, scenes: [...p.scenes, scene] }
          : p
      )
    );
  };

  const deleteSceneFromProject = (scene: string) => {
    if (!activeProjectId) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProjectId
          ? { ...p, scenes: p.scenes.filter((s) => s !== scene) }
          : p
      )
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProjectId,
        getActiveProject,
        addProject,
        selectProject,
        addPhraseToProject,
        deletePhraseFromProject,
        addNoteToProject,
        deleteNoteFromProject,
        addSceneToProject,
        deleteSceneFromProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
