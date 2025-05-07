"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("landing");

  const renderContent = () => {
    switch (activeTab) {
      case "echo":
        return <div><h2 className="text-xl font-bold">🌀 Find Your Echo</h2><p>Scene builder will go here.</p></div>;
      case "phrases":
        return <div><h2 className="text-xl font-bold">💬 Echo Phrases</h2><p>Prompt phrase generator.</p></div>;
      case "story":
        return <div><h2 className="text-xl font-bold">📖 Echo into Story</h2><p>Story interface area.</p></div>;
      case "style":
        return <div><h2 className="text-xl font-bold">🎨 Style Echo</h2><p>Styling and echo layering.</p></div>;
      case "journal":
        return <div><h2 className="text-xl font-bold">📓 Echo Journal</h2><p>Prompt and visual history.</p></div>;
      case "engines":
        return <div><h2 className="text-xl font-bold">🎛️ Echo Engines</h2><p>GTP selector panel.</p></div>;
      default:
        return (
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Welcome to Find Your Echo</h1>
            <p className="text-gray-400">Begin your creative journey here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen text-white bg-[#0f0f0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">🌀 Find Your Echo</h1>
          <button onClick={() => setActiveTab("echo")} className="text-left p-2 bg-[#222] hover:bg-[#333] rounded">🌀 Find Your Echo</button>
          <button onClick={() => setActiveTab("phrases")} className="text-left p-2 bg-[#222] hover:bg-[#333] rounded">💬 Echo Phrases</button>
          <button onClick={() => setActiveTab("story")} className="text-left p-2 bg-[#222] hover:bg-[#333] rounded">📖 Echo into Story</button>
          <button onClick={() => setActiveTab("style")} className="text-left p-2 bg-[#222] hover:bg-[#333] rounded">🎨 Style Echo</button>
          <button onClick={() => setActiveTab("journal")} className="text-left p-2 bg-[#222] hover:bg-[#333] rounded">📓 Echo Journal</button>
          <button onClick={() => setActiveTab("engines")} className="text-left p-2 bg-[#444] hover:bg-[#555] rounded font-semibold">🎛️ Echo Engines</button>
        </div>
        <div className="text-xs opacity-50 border-t border-gray-600 pt-4">
          Powered by SpiralPrompt Engine © 2025
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
