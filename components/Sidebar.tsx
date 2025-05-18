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
        bg-gradient-to-br from-[#2e3935ee] via-[#223127dd] to-[#23282af8]
        backdrop-blur-xl border-[#34403f44]
      `}
    >
      <div
        className="flex items-center gap-2 mt-4 mb-8 mx-2 cursor-pointer select-none"
        onClick={onLogoClick}
      >
        <span className="text-3xl drop-shadow-glow">🌀</span>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight transition-all text-gradient bg-gradient-to-r from-green-400 via-blue-300 to-green-600 bg-clip-text text-transparent">
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
              hover:bg-gradient-to-r hover:from-[#29313b] hover:to-[#1a472a] hover:text-green-300
              ${activeTab === item.key
                ? "bg-gradient-to-r from-green-700/80 to-emerald-700/90 text-white shadow-lg border-l-4 border-green-300 scale-[1.03]"
                : "text-[#bdbdbd] hover:scale-[1.04]"}
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
        className="mx-3 mb-6 mt-2 py-1 px-2 rounded bg-[#232323cc] hover:bg-[#224423e8] text-xs text-green-300 border border-[#233] shadow transition-all"
      >
        {collapsed ? "» Expand" : "« Collapse"}
      </button>
      <div className={`text-[10px] text-gray-500 text-center pb-3 ${collapsed ? "opacity-0" : "opacity-100"} transition-all`}>
        Powered by SpiralPrompt Engine © 2025
      </div>
    </aside>
  );
}
