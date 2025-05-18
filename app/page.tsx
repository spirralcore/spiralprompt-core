"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProjectSelector from "@/components/ProjectSelector";
import AddToSceneModal from "@/components/AddToSceneModal";

import FindYourStyle from "@/components/FindYourStyle";
import PromptPhrases from "@/components/PromptPhrases";
import SceneBuilder from "@/components/SceneBuilder";
import Journal from "@/components/Journal";
import Storyboard from "@/components/Storyboard";
import FriendEngine from "@/components/FriendEngine";
import { useProjects } from "@/contexts/ProjectsContext";

export default function Home() {
  return (
    <ProjectsProvider>
      <MainApp />
    </ProjectsProvider>
  );
}

import { ProjectsProvider } from "@/contexts/ProjectsContext";

function MainApp() {
  const [activeTab, setActiveTab] = useState("style");
  const [topMenu, setTopMenu] = useState<"your" | "global">("your");
  const [echoTab, setEchoTab] = useState<"likes" | "phrases" | "scenes" | "stories">("likes");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    getActiveProject,
    addNoteToProject,
    deleteNoteFromProject,
    addPhraseToProject,
    deletePhraseFromProject,
    addSceneToProject,
    deleteSceneFromProject,
  } = useProjects();

  const project = getActiveProject();

  const renderContent = () => {
    if (!project) return <p className="text-gray-400">No active project selected.</p>;

    switch (activeTab) {
      case "style":
        return <FindYourStyle />;
      case "phrases":
        return <PromptPhrases phrases={project.phrases} />;
      case "scene":
        return <SceneBuilder scenes={project.scenes} />;
      case "journal":
        return <Journal notes={project.journalNotes} />;
      case "storyboard":
        return <Storyboard />;
      case "engines":
        return <FriendEngine data={null} loading={false} />;
      default:
        return null;
    }
  };

  const renderTopMenu = () => (
    <div className="flex gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded ${topMenu === "your" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
        onClick={() => setTopMenu("your")}
      >
        Your Echo
      </button>
      <button
        className={`px-4 py-2 rounded ${topMenu === "global" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
        onClick={() => setTopMenu("global")}
      >
        Global Echo
      </button>
    </div>
  );

  const renderEchoTabs = () => (
    <div className="flex gap-4 mb-4">
      {["likes", "phrases", "scenes", "stories"].map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1 rounded ${echoTab === tab ? "bg-green-700" : "bg-[#1f1f1f] hover:bg-[#222]"}`}
          onClick={() => setEchoTab(tab as any)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen text-white bg-[#f4f8fa]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogoClick={() => {
          setActiveTab("style");
          setTopMenu("your");
          setSidebarCollapsed(true);
        }}
      />
      <main className="flex-1 p-10 overflow-y-auto bg-[#f4f8fa]">
        {activeTab === "style" && sidebarCollapsed && renderTopMenu()}
        {activeTab === "style" && sidebarCollapsed && renderEchoTabs()}
        <ProjectSelector />
        {renderContent()}
      </main>
    </div>
  );
}
