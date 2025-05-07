"use client";
import { useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="flex h-screen text-white bg-[#0f0f0f]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] p-5 flex flex-col gap-2 shadow-md">
        <div>
          <h2
            onClick={() => setActivePage("home")}
            className="text-xl mb-6 cursor-pointer hover:text-gray-300 transition-colors"
          >
            🌀 SpiralPrompt
          </h2>
          <div onClick={() => setActivePage("scene")} className="mb-2 p-2 bg-[#222] rounded cursor-pointer hover:bg-[#333]">1️⃣ Build Your Scene</div>
          <div onClick={() => setActivePage("phrases")} className="mb-2 p-2 bg-[#222] rounded cursor-pointer hover:bg-[#333]">2️⃣ Discover Prompt Phrases</div>
          <div onClick={() => setActivePage("story")} className="mb-2 p-2 bg-[#222] rounded cursor-pointer hover:bg-[#333]">3️⃣ Write Your Story</div>
          <div onClick={() => setActivePage("echo")} className="mb-2 p-2 bg-[#222] rounded cursor-pointer hover:bg-[#333]">4️⃣ Discover Your Echo</div>
          <div onClick={() => setActivePage("journal")} className="mb-2 p-2 bg-[#222] rounded cursor-pointer hover:bg-[#333]">5️⃣ Your Echo Journal</div>
        </div>
        <div className="text-xs opacity-60 mt-auto">© 2025 SpiralCore</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-20 px-10 flex flex-col items-center">
        {activePage === "home" && (
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-3xl font-semibold mb-8">🌀 Welcome to SpiralPrompt</h1>
            <div className="bg-[#1d1d1d] p-6 rounded border border-dashed border-gray-600 text-base text-left">
              This is your core scene engine screen where multi-layered prompts will be generated. Start by selecting one of the options from the menu.
            </div>
          </div>
        )}

{activePage === "scene" && (
  <div className="w-full max-w-3xl mt-10 space-y-6">
    <h2 className="text-2xl font-semibold">🎬 Build Your Scene</h2>

    <div>
      <label className="block mb-2">Enter keywords or tags:</label>
      <input
        type="text"
        placeholder="#fog #temple #solitude"
        className="w-full p-2 rounded bg-[#222] border border-gray-600 text-white"
      />
    </div>

    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
      Generate Prompt
    </button>

    <div className="bg-[#1d1d1d] p-4 rounded border border-dashed border-gray-600">
      <strong>Generated Prompt:</strong>
      <p className="mt-2 italic opacity-80">A lonely figure walks through the fog near a forgotten temple...</p>
    </div>
  </div>
)}
        {activePage === "phrases" && (
          <div className="text-xl mt-10">📖 Prompt Phrase Explorer Loading...</div>
        )}

        {activePage === "story" && (
          <div className="text-xl mt-10">✍️ Story Writer is in development...</div>
        )}

        {activePage === "echo" && (
          <div className="text-xl mt-10">🌀 Echo Matching Portal Coming...</div>
        )}

        {activePage === "journal" && (
          <div className="text-xl mt-10">📓 Your Echo Journal is empty... for now.</div>
        )}
      </div>
    </div>
  );
}
