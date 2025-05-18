"use client";

import { useState } from "react";

type JournalEntryType = "tag" | "phrase" | "scene" | "story" | "custom";

type JournalEntry = {
  type: JournalEntryType;
  value: string;
};

type JournalProps = {
  entries: JournalEntry[];
  likedEntries: string[];
  combo: string[];
  searchTerm: string;
  onSearch: (q: string) => void;
  onLike: (entry: string) => void;
  onCombo: (entry: string) => void;
  onSendCombo: () => void;
  onAddToStoryboard: (entry: string) => void;
  onAddToCollection: (entry: string) => void;
  onAddEntry: (entry: JournalEntry) => void;
};

export default function Journal({
  entries,
  likedEntries,
  combo,
  searchTerm,
  onSearch,
  onLike,
  onCombo,
  onSendCombo,
  onAddToStoryboard,
  onAddToCollection,
  onAddEntry,
}: JournalProps) {
  const [entryType, setEntryType] = useState<JournalEntryType>("custom");
  const [entryInput, setEntryInput] = useState("");

  const handleAddEntry = () => {
    const trimmed = entryInput.trim();
    if (trimmed) {
      onAddEntry({ type: entryType, value: trimmed });
      setEntryInput("");
    }
  };

  const typeOptions: { type: JournalEntryType; label: string; icon: string }[] = [
    { type: "tag", label: "Tag", icon: "🏷️" },
    { type: "phrase", label: "Phrase", icon: "💬" },
    { type: "scene", label: "Scene", icon: "🎬" },
    { type: "story", label: "Story", icon: "📖" },
    { type: "custom", label: "Note", icon: "📝" },
  ];

  // Arama filtresi (type veya value içinde arar)
  const filteredEntries = searchTerm
    ? entries.filter(
        (entry) =>
          entry.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : entries;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-500 via-green-400 to-blue-400 bg-clip-text text-transparent">
        Your Journal
      </h2>
      {/* Yeni entry ekleme */}
      <div className="flex gap-2 mb-6 items-center">
        <select
          value={entryType}
          onChange={e => setEntryType(e.target.value as JournalEntryType)}
          className="px-3 py-2 rounded-lg bg-yellow-100 text-gray-800 font-medium"
        >
          {typeOptions.map(opt => (
            <option key={opt.type} value={opt.type}>
              {opt.icon} {opt.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={entryInput}
          onChange={e => setEntryInput(e.target.value)}
          placeholder={`Type a ${entryType}...`}
          className="flex-1 p-2 rounded bg-[#fffbea] border border-yellow-200 text-gray-800"
        />
        <button
          onClick={handleAddEntry}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-white font-semibold"
        >
          Add
        </button>
      </div>
      {/* Search bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search journal..."
          value={searchTerm}
          onChange={e => onSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-xl border border-yellow-200 bg-white/80 text-gray-800 shadow focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>
      {/* Combo ve combo’yu stories’a gönder */}
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {combo.map((entry) => (
          <span
            key={entry}
            className="inline-flex items-center bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full font-semibold shadow hover:bg-yellow-300 transition"
          >
            {entry}
            <button
              className="ml-2 text-xs font-bold text-yellow-800 hover:text-red-500"
              onClick={() => onCombo(entry)}
            >
              ✕
            </button>
          </span>
        ))}
        {combo.length > 0 && (
          <button
            className="ml-2 px-4 py-1 bg-yellow-700 text-white rounded-full font-bold shadow hover:bg-yellow-600 transition"
            onClick={onSendCombo}
          >
            ➡️ Send Combo to Stories
          </button>
        )}
      </div>
      {/* Journal entry list */}
      <ul className="space-y-4">
        {filteredEntries.map((entry, idx) => (
          <li
            key={idx}
            className="bg-white/80 rounded-xl p-4 text-gray-800 font-medium shadow border border-yellow-100 flex flex-wrap gap-2 items-center"
          >
            <span className="block flex-1">
              <span className="mr-2">
                {typeOptions.find(opt => opt.type === entry.type)?.icon || "📝"}
              </span>
              {entry.value}
            </span>
            <button
              title="Like"
              onClick={() => onLike(entry.value)}
              className={`text-lg ${
                likedEntries.includes(entry.value)
                  ? "text-pink-500 scale-125"
                  : "text-gray-400 hover:text-pink-400"
              } transition-all`}
            >
              ❤️
            </button>
            <button
              title="Add to Stories Collection"
              onClick={() => onAddToCollection(entry.value)}
              className="ml-0.5 text-lg text-blue-700 hover:text-blue-900 transition-all"
            >
              📥
            </button>
            <button
              title="Add to Storyboard"
              onClick={() => onAddToStoryboard(entry.value)}
              className="ml-0.5 text-lg text-emerald-700 hover:text-emerald-900 transition-all"
            >
              🎬
            </button>
            <button
              title="Combo"
              onClick={() => onCombo(entry.value)}
              className={`ml-0.5 text-lg ${
                combo.includes(entry.value)
                  ? "text-yellow-800 scale-110"
                  : "text-gray-400 hover:text-yellow-600"
              } transition-all`}
              disabled={
                !combo.includes(entry.value) && combo.length >= 3
              }
            >
              ➕
            </button>
          </li>
        ))}
        {filteredEntries.length === 0 && (
          <li className="text-gray-400 text-center w-full">No journal entries found.</li>
        )}
      </ul>
      <div className="mt-8 text-center text-sm text-gray-500">
        <span>
          <span className="font-semibold text-yellow-800">{combo.length}</span>
          /3 journal combo selected
        </span>
      </div>
    </div>
  );
}
