"use client";

import { useStories } from "@/hooks/useStories";
import { useState } from "react";

export default function AddToStoryModal({
  phrase,
  onClose,
}: {
  phrase: string;
  onClose: () => void;
}) {
  const {
    stories,
    addStory,
    addPhraseToStory,
  } = useStories();

  const [selectedId, setSelectedId] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = () => {
    const trimmed = newTitle.trim();
    if (trimmed) {
      const newId = `story-${Date.now()}`;
      addStory(trimmed);
      addPhraseToStory(newId, phrase);
      onClose();
    } else if (selectedId) {
      addPhraseToStory(selectedId, phrase);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] p-6 rounded shadow-lg w-full max-w-md space-y-4 text-white">
        <h2 className="text-xl font-bold">Select or Create Story</h2>

        {stories.length > 0 && (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-2 rounded bg-[#2a2a2a] text-sm"
          >
            <option value="">-- Select Existing Story --</option>
            {stories.map((story) => (
              <option key={story.id} value={story.id}>
                {story.title}
              </option>
            ))}
          </select>
        )}

        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Or create new story..."
            className="w-full p-2 bg-[#2a2a2a] rounded text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedId && !newTitle.trim()}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-sm disabled:opacity-50"
          >
            Add to Story
          </button>
        </div>
      </div>
    </div>
  );
}
