"use client";

import { useEffect, useState } from "react";

export type Story = {
  id: string;
  title: string;
  createdAt: number;
  phrases: string[];
};

const STORAGE_KEY = "spiral_stories";

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setStories(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load stories:", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }, [stories]);

  const addStory = (title: string) => {
    const newStory: Story = {
      id: `story-${Date.now()}`,
      title,
      createdAt: Date.now(),
      phrases: [],
    };
    setStories((prev) => [...prev, newStory]);
  };

  const deleteStory = (id: string) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  const addPhraseToStory = (storyId: string, phrase: string) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId
          ? s.phrases.includes(phrase)
            ? s
            : { ...s, phrases: [...s.phrases, phrase] }
          : s
      )
    );
  };

  const removePhraseFromStory = (storyId: string, phrase: string) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId
          ? { ...s, phrases: s.phrases.filter((p) => p !== phrase) }
          : s
      )
    );
  };

  const getStoryById = (id: string): Story | undefined => {
    return stories.find((s) => s.id === id);
  };

  return {
    stories,
    addStory,
    deleteStory,
    addPhraseToStory,
    removePhraseFromStory,
    getStoryById,
  };
}
