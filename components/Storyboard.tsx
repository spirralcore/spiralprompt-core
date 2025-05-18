"use client";

import { useState } from "react";

type StoryboardItem = {
  id: string;
  type: "tag" | "phrase" | "scene" | "journal" | "story" | "custom";
  value: string;
  sourceLabel?: string;
};

type StoryboardProps = {
  items: StoryboardItem[];
  onRemove: (id: string) => void;
  onReorder: (newOrder: StoryboardItem[]) => void;
  onAddCustom?: (value: string) => void;
};

export default function Storyboard({
  items,
  onRemove,
  onReorder,
  onAddCustom,
}: StoryboardProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [customInput, setCustomInput] = useState("");

  const handleDragStart = (idx: number) => setDragIndex(idx);
  const handleDrop = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) return;
    const updated = [...items];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(idx, 0, removed);
    onReorder(updated);
    setDragIndex(null);
  };

  const handleAddCustom = () => {
    if (onAddCustom && customInput.trim()) {
      onAddCustom(customInput.trim());
      setCustomInput("");
    }
  };

  const icons: Record<string, string> = {
    tag: "🏷️",
    phrase: "💬",
    scene: "🎬",
    journal: "📝",
    story: "📖",
    custom: "⭐",
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 via-yellow-400 to-green-300 bg-clip-text text-transparent">
        Storyboard
      </h2>

      {onAddCustom && (
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Add a custom storyboard item..."
            className="flex-1 p-2 rounded bg-[#f0f0ff] border border-green-200 text-gray-800"
          />
          <button
            onClick={handleAddCustom}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-white font-semibold"
          >
            Add
          </button>
        </div>
      )}

      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            className="bg-white/80 rounded-xl p-4 text-gray-800 font-medium shadow border border-pink-100 flex flex-wrap gap-2 items-center cursor-move"
          >
            <span className="text-2xl">{icons[item.type] || "🌈"}</span>
            <span className="block flex-1">{item.value}</span>
            {item.sourceLabel && (
              <span className="text-xs text-gray-400 ml-2">{item.sourceLabel}</span>
            )}
            <button
              title="Remove from Storyboard"
              onClick={() => onRemove(item.id)}
              className="ml-2 text-lg text-red-400 hover:text-red-600"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center text-xs text-gray-400">
        Drag & drop to reorder your scenes. Add/remove freely!
      </div>
    </div>
  );
}
