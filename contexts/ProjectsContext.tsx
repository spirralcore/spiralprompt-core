'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Yeni nesil Project yapısı
export type StoryboardItem = {
  id: string;
  type: "tag" | "phrase" | "scene" | "journal" | "story" | "custom";
  value: string;
  source?: string;
};

export type JournalEntry = {
  type: "tag" | "phrase" | "scene" | "story" | "custom";
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
  selectProject: (id: string) => void;

  // TAGS
  tags: string[];
  likedTags: string[];
  tagCombo: string[];
  tagSearch: string;
  setTagSearch: (q: string) => void;
  toggleTagLike: (tag: string) => void;
  toggleTagCombo: (tag: string) => void;
  handleSendTagCombo: () => void;
  addTagToStoryboard: (tag: string) => void;

  // PHRASES
  phrases: string[];
  likedPhrases: string[];
  phraseCombo: string[];
  phraseSearch: string;
  setPhraseSearch: (q: string) => void;
  togglePhraseLike: (phrase: string) => void;
  togglePhraseCombo: (phrase: string) => void;
  handleSendPhraseCombo: () => void;
  addPhraseToStoryboard: (phrase: string) => void;
  addPhraseToCollection: (phrase: string) => void;

  // SCENES
  scenes: string[];
  likedScenes: string[];
  sceneCombo: string[];
  sceneSearch: string;
  setSceneSearch: (q: string) => void;
  toggleSceneLike: (scene: string) => void;
  toggleSceneCombo: (scene: string) => void;
  handleSendSceneCombo: () => void;
  addSceneToStoryboard: (scene: string) => void;
  addSceneToCollection: (scene: string) => void;

  // JOURNAL
  journalEntries: JournalEntry[];
  likedJournalEntries: string[];
  journalCombo: string[];
  journalSearch: string;
  setJournalSearch: (q: string) => void;
  toggleJournalLike: (entryValue: string) => void;
  toggleJournalCombo: (entryValue: string) => void;
  handleSendJournalCombo: () => void;
  addJournalToStoryboard: (entryValue: string) => void;
  addJournalToCollection: (entryValue: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;

  // STORIES
  stories: string[];
  likedStories: string[];
  storyCombo: string[];

  // STORYBOARD
  storyboardItems: StoryboardItem[];
  removeFromStoryboard: (id: string) => void;
  reorderStoryboard: (newOrder: StoryboardItem[]) => void;
  addCustomToStoryboard: (value: string) => void;
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

  // UI state (her projeye ait olmadan global)
  const [tagSearch, setTagSearch] = useState("");
  const [phraseSearch, setPhraseSearch] = useState("");
  const [sceneSearch, setSceneSearch] = useState("");
  const [journalSearch, setJournalSearch] = useState("");

  // LocalStorage'dan yükle
  useEffect(() => {
    try {
      const stored = localStorage.getItem('spiral_projects_v2');
      const active = localStorage.getItem('spiral_activeProjectId');
      if (stored) {
        setProjects(JSON.parse(stored));
      }
      if (active) setActiveProjectId(active);
    } catch (err) {
      console.error("localStorage read error:", err);
    }
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('spiral_projects_v2', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    if (activeProjectId) {
      localStorage.setItem('spiral_activeProjectId', activeProjectId);
    }
  }, [activeProjectId]);

  // --- Ana aktif project ile çalış ---
  const getActiveProject = () => projects.find((p) => p.id === activeProjectId) || null;
  const setActiveProject = (p: Project) => {
    setProjects((prev) => prev.map(pr => pr.id === p.id ? p : pr));
  };

  // --- Project işlemleri ---
  const addProject = (title: string) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
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
  const selectProject = (id: string) => setActiveProjectId(id);

  // ---- TAGS ----
  const tags = getActiveProject()?.tags || [];
  const likedTags = getActiveProject()?.likedTags || [];
  const tagCombo = getActiveProject()?.tagCombo || [];
  const toggleTagLike = (tag: string) => {
    const p = getActiveProject();
    if (!p) return;
    const updated = {
      ...p,
      likedTags: p.likedTags.includes(tag)
        ? p.likedTags.filter(t => t !== tag)
        : [...p.likedTags, tag]
    };
    setActiveProject(updated);
  };
  const toggleTagCombo = (tag: string) => {
    const p = getActiveProject();
    if (!p) return;
    let combo = p.tagCombo.includes(tag)
      ? p.tagCombo.filter(t => t !== tag)
      : p.tagCombo.length < 5
        ? [...p.tagCombo, tag]
        : p.tagCombo;
    setActiveProject({ ...p, tagCombo: combo });
  };
  const handleSendTagCombo = () => {
    // Combo'yu phrase search'e aktarabilirsiniz.
    setTagSearch(tagCombo.join(" "));
  };
  const addTagToStoryboard = (tag: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      storyboard: [
        ...p.storyboard,
        { id: Date.now().toString(), type: "tag", value: tag }
      ]
    });
  };

  // ---- PHRASES ----
  const phrases = getActiveProject()?.phrases || [];
  const likedPhrases = getActiveProject()?.likedPhrases || [];
  const phraseCombo = getActiveProject()?.phraseCombo || [];
  const togglePhraseLike = (phrase: string) => {
    const p = getActiveProject();
    if (!p) return;
    const updated = {
      ...p,
      likedPhrases: p.likedPhrases.includes(phrase)
        ? p.likedPhrases.filter(t => t !== phrase)
        : [...p.likedPhrases, phrase]
    };
    setActiveProject(updated);
  };
  const togglePhraseCombo = (phrase: string) => {
    const p = getActiveProject();
    if (!p) return;
    let combo = p.phraseCombo.includes(phrase)
      ? p.phraseCombo.filter(t => t !== phrase)
      : p.phraseCombo.length < 3
        ? [...p.phraseCombo, phrase]
        : p.phraseCombo;
    setActiveProject({ ...p, phraseCombo: combo });
  };
  const handleSendPhraseCombo = () => {
    setPhraseSearch(phraseCombo.join(" "));
  };
  const addPhraseToStoryboard = (phrase: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      storyboard: [
        ...p.storyboard,
        { id: Date.now().toString(), type: "phrase", value: phrase }
      ]
    });
  };
  const addPhraseToCollection = (phrase: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      phrases: p.phrases.includes(phrase)
        ? p.phrases
        : [...p.phrases, phrase]
    });
  };

  // ---- SCENES ----
  const scenes = getActiveProject()?.scenes || [];
  const likedScenes = getActiveProject()?.likedScenes || [];
  const sceneCombo = getActiveProject()?.sceneCombo || [];
  const toggleSceneLike = (scene: string) => {
    const p = getActiveProject();
    if (!p) return;
    const updated = {
      ...p,
      likedScenes: p.likedScenes.includes(scene)
        ? p.likedScenes.filter(t => t !== scene)
        : [...p.likedScenes, scene]
    };
    setActiveProject(updated);
  };
  const toggleSceneCombo = (scene: string) => {
    const p = getActiveProject();
    if (!p) return;
    let combo = p.sceneCombo.includes(scene)
      ? p.sceneCombo.filter(t => t !== scene)
      : p.sceneCombo.length < 3
        ? [...p.sceneCombo, scene]
        : p.sceneCombo;
    setActiveProject({ ...p, sceneCombo: combo });
  };
  const handleSendSceneCombo = () => {
    setSceneSearch(sceneCombo.join(" "));
  };
  const addSceneToStoryboard = (scene: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      storyboard: [
        ...p.storyboard,
        { id: Date.now().toString(), type: "scene", value: scene }
      ]
    });
  };
  const addSceneToCollection = (scene: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      scenes: p.scenes.includes(scene)
        ? p.scenes
        : [...p.scenes, scene]
    });
  };

  // ---- JOURNAL ----
  const journalEntries = getActiveProject()?.journalEntries || [];
  const likedJournalEntries = getActiveProject()?.likedJournalEntries || [];
  const journalCombo = getActiveProject()?.journalCombo || [];
  const toggleJournalLike = (entryValue: string) => {
    const p = getActiveProject();
    if (!p) return;
    const updated = {
      ...p,
      likedJournalEntries: p.likedJournalEntries.includes(entryValue)
        ? p.likedJournalEntries.filter(t => t !== entryValue)
        : [...p.likedJournalEntries, entryValue]
    };
    setActiveProject(updated);
  };
  const toggleJournalCombo = (entryValue: string) => {
    const p = getActiveProject();
    if (!p) return;
    let combo = p.journalCombo.includes(entryValue)
      ? p.journalCombo.filter(t => t !== entryValue)
      : p.journalCombo.length < 3
        ? [...p.journalCombo, entryValue]
        : p.journalCombo;
    setActiveProject({ ...p, journalCombo: combo });
  };
  const handleSendJournalCombo = () => {
    setJournalSearch(journalCombo.join(" "));
  };
  const addJournalToStoryboard = (entryValue: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      storyboard: [
        ...p.storyboard,
        { id: Date.now().toString(), type: "journal", value: entryValue }
      ]
    });
  };
  const addJournalToCollection = (entryValue: string) => {
    // Not: Bir journal entry'si story collectiona eklenebilir vs.
    // Şimdilik journal'a ekleme yapılabilir.
  };
  const addJournalEntry = (entry: JournalEntry) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      journalEntries: [...p.journalEntries, entry]
    });
  };

  // ---- STORIES (Şu an sade) ----
  const stories = getActiveProject()?.stories || [];
  const likedStories = getActiveProject()?.likedStories || [];
  const storyCombo = getActiveProject()?.storyCombo || [];

  // ---- STORYBOARD ----
  const storyboardItems = getActiveProject()?.storyboard || [];
  const removeFromStoryboard = (id: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      storyboard: p.storyboard.filter(item => item.id !== id)
    });
  };
  const reorderStoryboard = (newOrder: StoryboardItem[]) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({ ...p, storyboard: newOrder });
  };
  const addCustomToStoryboard = (value: string) => {
    const p = getActiveProject();
    if (!p) return;
    setActiveProject({
      ...p,
      storyboard: [
        ...p.storyboard,
        { id: Date.now().toString(), type: "custom", value }
      ]
    });
  };

  // --- Provider ---
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProjectId,
        getActiveProject,
        addProject,
        selectProject,

        // TAGS
        tags, likedTags, tagCombo, tagSearch, setTagSearch, toggleTagLike, toggleTagCombo, handleSendTagCombo, addTagToStoryboard,

        // PHRASES
        phrases, likedPhrases, phraseCombo, phraseSearch, setPhraseSearch, togglePhraseLike, togglePhraseCombo, handleSendPhraseCombo, addPhraseToStoryboard, addPhraseToCollection,

        // SCENES
        scenes, likedScenes, sceneCombo, sceneSearch, setSceneSearch, toggleSceneLike, toggleSceneCombo, handleSendSceneCombo, addSceneToStoryboard, addSceneToCollection,

        // JOURNAL
        journalEntries, likedJournalEntries, journalCombo, journalSearch, setJournalSearch, toggleJournalLike, toggleJournalCombo, handleSendJournalCombo, addJournalToStoryboard, addJournalToCollection, addJournalEntry,

        // STORIES
        stories, likedStories, storyCombo,

        // STORYBOARD
        storyboardItems, removeFromStoryboard, reorderStoryboard, addCustomToStoryboard,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
