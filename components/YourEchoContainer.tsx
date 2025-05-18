"use client";

import { useProjects } from "@/contexts/ProjectsContext";

type Props = {
  activeTab: "likes" | "phrases" | "scenes" | "stories";
};

export default function YourEchoContainer({ activeTab }: Props) {
  const {
    likedTags,
    likedPhrases,
    likedScenes,
    likedJournalEntries,
  } = useProjects();

  const renderList = (items: string[]) => {
    if (items.length === 0) {
      return <p className="text-gray-400 text-center mt-10">Nothing liked yet.</p>;
    }

    return (
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="bg-white shadow p-4 rounded-lg border border-gray-200 text-gray-800"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-8">
      {activeTab === "likes" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Liked Tags</h3>
          {renderList(likedTags)}
        </div>
      )}
      {activeTab === "phrases" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Liked Phrases</h3>
          {renderList(likedPhrases)}
        </div>
      )}
      {activeTab === "scenes" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Liked Scenes</h3>
          {renderList(likedScenes)}
        </div>
      )}
      {activeTab === "stories" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Liked Journal Entries</h3>
          {renderList(likedJournalEntries)}
        </div>
      )}
    </div>
  );
}
