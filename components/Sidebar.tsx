import React, { useState } from "react";

const menuItems = [
  { key: "style", icon: "🌀", label: "Find Your Style" },
  { key: "phrases", icon: "💬", label: "Prompt Phrases" },
  { key: "scene", icon: "🎬", label: "To Your Scene" },
  { key: "journal", icon: "📓", label: "Your Journal" },
  { key: "storyboard", icon: "📽️", label: "Storyboard" },
  { key: "engines", icon: "🎛️", label: "Friend Engine" },
];

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogoClick?: () => void;
};

export default function Sidebar({ activeTab, setActiveTab, onLogoClick }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-screen border-r shadow-2xl transition-all duration-200 z-40
        ${collapsed ? "w-16" : "w-56"}
        bg-gradient-to-br from-[#e9f4f9bb] via-[#e2ebe9cc] to-[#d7e5f0b8] 
        backdrop-blur-2xl border-[#bdd1cb44]
      `}
    >
      <div
        className="flex items-center gap-2 mt-4 mb-8 mx-2 cursor-pointer select-none"
        onClick={onLogoClick}
      >
        <span className="text-3xl drop-shadow-glow">🌀</span>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight transition-all text-gradient bg-gradient-to-r from-green-500 via-blue-400 to-green-600 bg-clip-text text-transparent">
            Find Your Echo
          </span>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`
              group flex items-center gap-3 px-3 py-2 rounded-xl my-1 font-medium transition-all duration-150
              hover:bg-gradient-to-r hover:from-[#b2f2e8] hover:to-[#90e6d4] hover:text-green-700
              ${activeTab === item.key
                ? "bg-gradient-to-r from-green-400/80 to-emerald-400/90 text-green-900 shadow-lg border-l-4 border-green-400 scale-[1.03]"
                : "text-[#34423a] hover:scale-[1.04]"}
            `}
            style={{ minWidth: 0 }}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="mx-3 mb-6 mt-2 py-1 px-2 rounded bg-[#e2ebe9cc] hover:bg-[#b2f2e8dd] text-xs text-green-700 border border-[#bdd1cb44] shadow transition-all"
      >
        {collapsed ? "» Expand" : "« Collapse"}
      </button>
      <div className={`text-[10px] text-green-900 text-center pb-3 ${collapsed ? "opacity-0" : "opacity-100"} transition-all`}>
        Powered by SpiralPrompt Engine © 2025
      </div>
    </aside>
  );
}
