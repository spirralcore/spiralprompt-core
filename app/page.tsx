"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import Sidebar from "@/components/Sidebar";
import ProjectSelector from "@/components/ProjectSelector";
import AddToSceneModal from "@/components/AddToSceneModal";
// Gelecek component placeholderları (ileride eklenir):
// import FindYourStyle from "@/components/FindYourStyle";
// import PromptPhrases from "@/components/PromptPhrases";
// import SceneBuilder from "@/components/SceneBuilder";
// import Journal from "@/components/Journal";
// import FriendEngine from "@/components/FriendEngine";

export default function Home() {
  return (
    <ProjectsProvider>
      <MainApp />
    </ProjectsProvider>
  );
}

function MainApp() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("style");
  const [topMenu, setTopMenu] = useState<"your" | "global">("your");
  const [echoTab, setEchoTab] = useState<"likes" | "phrases" | "scenes" | "stories">("likes");
  const [showModal, setShowModal] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);

  // Placeholder içerik fonksiyonları:
  const renderContent = () => {
    switch (activeTab) {
      case "style":
        return <div className="text-gray-400">Find Your Style component gelecek...</div>;
      case "phrases":
        return <div className="text-gray-400">Create Your Prompt Phrases component gelecek...</div>;
      case "scene":
        return <div className="text-gray-400">The Way to Your Scene component gelecek...</div>;
      case "journal":
        return <div className="text-gray-400">Your Journal component gelecek...</div>;
      case "storyboard":
        return <div className="text-gray-400">Storyboard component gelecek...</div>;
      case "engines":
        return <div className="text-gray-400">Work With Your Friend Engine component gelecek...</div>;
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
    <div className="flex h-screen text-white bg-[#0f0f0f]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogoClick={() => router.push("/landing")}
      />
      <main className="flex-1 p-10 overflow-y-auto">
        {renderTopMenu()}
        {renderEchoTabs()}
        <ProjectSelector />
        {renderContent()}
        {showModal && selectedPhrase && (
          <AddToSceneModal
            phrase={selectedPhrase}
            onClose={() => {
              setShowModal(false);
              setSelectedPhrase(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

