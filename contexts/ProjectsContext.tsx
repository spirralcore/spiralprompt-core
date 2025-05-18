'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type StoryboardItem = {
  id: string;
  type: 'tag' | 'phrase' | 'scene' | 'journal' | 'story' | 'custom';
  value: string;
  source?: string;
};

export type JournalEntry = {
  type: 'tag' | 'phrase' | 'scene' | 'story' | 'custom';
  value: string;
};

export type Project = {
  id: string;
  title: string;
  createdAt: number;

  tags: string[];
  likedTags: string[];
  tagCombo: string[];

  phrases: string[];
  likedPhrases: string[];
  phraseCombo: string[];

  scenes: string[];
  likedScenes: string[];
  sceneCombo: string[];

  journalEntries: JournalEntry[];
  likedJournalEntries: string[];
  journalCombo: string[];

  stories: string[];
  likedStories: string[];
  storyCombo: string[];

  storyboard: StoryboardItem[];
};

type ProjectsContextType = {
  projects: Project[];
  activeProjectId: string | null;
  getActiveProject: () => Project | null;
  addProject: (title: string) => void;
  setActiveProject: (id: string) => void;
  addSceneToProject: (scene: string, projectId: string) => void;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('spiral_projects');
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('spiral_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (title: string) => {
    const newProject: Project = {
      id: uuidv4(),
      title,
      createdAt: Date.now(),
      tags: [],
      likedTags: [],
      tagCombo: [],
      phrases: [],
      likedPhrases: [],
      phraseCombo: [],
      scenes: [],
      likedScenes: [],
      sceneCombo: [],
      journalEntries: [],
      likedJournalEntries: [],
      journalCombo: [],
      stories: [],
      likedStories: [],
      storyCombo: [],
      storyboard: [],
    };
    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(newProject.id);
  };

  const setActiveProject = (id: string) => {
    setActiveProjectId(id);
  };

  const getActiveProject = () => {
    return projects.find((p) => p.id === activeProjectId) || null;
  };

  const addSceneToProject = (scene: string, projectId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, scenes: [...project.scenes, scene] }
          : project
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
        setActiveProject,
        addSceneToProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
