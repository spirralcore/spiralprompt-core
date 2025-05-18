"use client";

import { useStories } from "@/hooks/useStories";

export default function StoryListPage() {
  const { stories } = useStories();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-10">
      <h1 className="text-3xl font-bold mb-10">🌀 The Way to Your Story</h1>

      {stories.length === 0 ? (
        <p className="text-gray-500">You have no stories yet.</p>
      ) : (
        <ul className="space-y-8">
          {stories.map((story) => (
            <li key={story.id} className="bg-[#1f1f1f] p-6 rounded shadow border border-gray-700">
              <h2 className="text-xl font-bold mb-2">{story.title}</h2>
              <p className="text-xs opacity-50 mb-4">
                Created: {new Date(story.createdAt).toLocaleString()}
              </p>
              {story.phrases.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No phrases yet.</p>
              ) : (
                <ul className="space-y-2">
                  {story.phrases.map((phrase, idx) => (
                    <li
                      key={idx}
                      className="bg-[#2a2a2a] p-3 rounded text-sm border border-gray-600"
                    >
                      {phrase}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
