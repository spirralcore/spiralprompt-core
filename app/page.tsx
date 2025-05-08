"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [activeTab, setActiveTab] = useState("style");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = {
    "Trigger Type": ["arrival", "collapse", "awakening", "memory", "threshold"],
    "Tone Tags": ["nostalgic", "haunting", "wistful", "surreal", "melancholic"],
    "Echo Intent": ["remembering", "seeking", "wandering", "calling", "watching"],
    "Character / Archetype": ["ghost", "witness", "wanderer", "shadow", "voicebearer"],
    "Symbolic Object / Motif": ["cracked mirror", "headphones", "door", "library card", "glitch hallway"],
    "Narrative Pulse": ["memory burn", "rainfall descent", "first contact", "unwritten pages", "library threshold"],
    "Elemental Mood": ["silence", "wind", "fire", "storm", "ash"],
    "Visual Style": ["fragmented", "minimal", "baroque", "sublime", "void-based"],
    "Spiral Signature": ["broken becoming", "names with meaning", "silence before impact", "the seen unseen", "echoed entry"],
    "Emotional Core": ["shame", "longing", "paranoia", "curiosity", "sacred resentment"],
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "style":
        return (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="#tag gir ya da whatever you feel..."
              className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600"
            />

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(categories).map(([title, tags]) => (
                <div key={title} className="bg-[#1f1f1f] p-4 rounded shadow">
                  <h3 className="text-lg font-bold mb-3">{title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded ${
                          selectedTags.includes(tag)
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                disabled={selectedTags.length === 0}
                onClick={() => console.log("Seçilen tagler:", selectedTags)}
                className="bg-green-600 px-4 py-2 rounded disabled:opacity-50"
              >
                🚀 Build Prompt
              </button>
            </div>
          </div>
        );

        case "phrases":
          return (
            <div className="space-y-6">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Whisper your words... (or let the style speak for you)"
                className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600"
              />
        
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <div key={idx} className="bg-[#1f1f1f] p-4 rounded shadow space-y-4">
                  <p className="text-white">
                    "The fog presses against the window. The camera tells the story. No subject speaks — only the hallway breathes."
                  </p>
        
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-green-400">#fog presses:</strong>{" "}
                      Mekanın duygusal bulanıklığını gösterir, yalnızlık ve geçmiş hissi verir.
                    </div>
                    <div>
                      <strong className="text-green-400">#the camera tells the story:</strong>{" "}
                      Sahne pozsuzdur. İzleyici görüntünün tanığı olur, müdahil olmaz.
                    </div>
                    <div>
                      <strong className="text-green-400">#no subject:</strong>{" "}
                      Kamera boşluğu takip eder. Sessizlik ve kayıp hissi büyür.
                    </div>
                  </div>
        
                  <div className="flex gap-2 pt-2">
                    <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm">❤️ Like</button>
                    <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm">➕ Add to Phrase Collection</button>
                    <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm">➡️ Use in Story</button>
                  </div>
                </div>
              ))}
            </div>
          );
    }
  };

  return (
    <div className="flex h-screen text-white bg-[#0f0f0f]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] p-6 flex flex-col gap-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 cursor-pointer hover:opacity-80">
          <Link href="/">🌀 Find Your Echo</Link>
        </h1>

        <nav className="flex flex-col gap-3 text-sm">
          <button onClick={() => setActiveTab("style")} className="text-left p-3 bg-[#222] hover:bg-[#333] rounded">🌀 Find Your Style</button>
          <button onClick={() => setActiveTab("phrases")} className="text-left p-3 bg-[#222] hover:bg-[#333] rounded">💬 Create Your Prompt Phrases</button>
          <button onClick={() => setActiveTab("story")} className="text-left p-3 bg-[#222] hover:bg-[#333] rounded">📖 The Way to Your Story</button>
          <button onClick={() => setActiveTab("journal")} className="text-left p-3 bg-[#222] hover:bg-[#333] rounded">📓 Your Journal</button>
          <button onClick={() => setActiveTab("engines")} className="text-left p-3 bg-[#444] hover:bg-[#555] rounded font-semibold">🎛️ Work With Your Friend Engine</button>
        </nav>

        <div className="mt-auto text-xs opacity-50 pt-4 border-t border-gray-600">
          Powered by SpiralPrompt Engine © 2025
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
