
import React, { useState } from "react";

const menuItems = [
  { key: "style", icon: "🌀", label: "Find Your Style" },
  { key: "phrases", icon: "💬", label: "Prompt Phrases" },
  { key: "scene", icon: "🎬", label: "To Your Scene" },
  { key: "journal", icon: "📓", label: "Your Journal" },
  { key: "storyboard", icon: "🟝️", label: "Storyboard" },
  { key: "engines", icon: "🎿️", label: "Friend Engine" },
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
      className={`flex flex-col h-screen border-r transition-all duration-200 z-40
        ${collapsed ? "w-16" : "w-60"}
        bg-gradient-to-br from-[#e9f4f9] via-[#e2ebe9] to-[#d7e5f0] 
        backdrop-blur-xl shadow-2xl
      `}
    >
      <div
        className="flex items-center gap-2 mt-4 mb-8 mx-2 cursor-pointer select-none"
        onClick={onLogoClick}
      >
        <span className="text-3xl drop-shadow">🌀</span>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-green-500 via-blue-400 to-green-600 bg-clip-text text-transparent">
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
              group flex items-center gap-3 px-3 py-2 rounded-xl my-1 font-medium transition-all
              hover:bg-gradient-to-r hover:from-[#b2f2e8] hover:to-[#90e6d4] hover:text-green-700
              ${
                activeTab === item.key
                  ? "bg-gradient-to-r from-green-400 to-emerald-400 text-green-900 shadow border-l-4 border-green-400 scale-[1.03]"
                  : "text-[#34423a] hover:scale-[1.04]"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="mx-3 mb-4 mt-2 py-1 px-2 rounded bg-[#e2ebe9] hover:bg-[#b2f2e8] text-xs text-green-700 border border-[#bdd1cb] shadow"
      >
        {collapsed ? "» Expand" : "« Collapse"}
      </button>
      <div className={`text-[10px] text-green-900 text-center pb-3 ${collapsed ? "hidden" : "block"}`}>
        Powered by SpiralPrompt Engine © 2025
      </div>
    </aside>
  );
}
