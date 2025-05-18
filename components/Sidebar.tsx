import React from "react";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogoClick?: () => void;
};

const menuItems = [
  { key: "style", icon: "🌀", label: "Find Your Style" },
  { key: "phrases", icon: "💬", label: "Create Your Prompt Phrases" },
  { key: "scene", icon: "🎬", label: "The Way to Your Scene" },
  { key: "journal", icon: "📓", label: "Your Journal" },
  { key: "storyboard", icon: "📽️", label: "Storyboard" },
  { key: "engines", icon: "🎛️", label: "Work With Your Friend Engine" },
];

export default function Sidebar({ activeTab, setActiveTab, onLogoClick }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#1a1a1a] p-6 flex flex-col gap-4 shadow-lg h-screen">
      <h1
        className="text-2xl font-bold mb-6 cursor-pointer hover:opacity-80"
        onClick={onLogoClick}
      >
        🌀 Find Your Echo
      </h1>
      <nav className="flex flex-col gap-3 text-sm">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`text-left p-3 rounded ${
              activeTab === item.key ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto text-xs opacity-50 pt-4 border-t border-gray-600">
        Powered by SpiralPrompt Engine © 2025
      </div>
    </aside>
  );
}
