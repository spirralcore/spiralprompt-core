"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import Storyboard from "@/components/Storyboard";
import ProjectSelector from "@/components/ProjectSelector";
import AddToSceneModal from "@/components/AddToSceneModal";
// TODO: Aşağıdaki importları ilgili componentler eklendikçe aç
// import FindYourStyle from "@/components/FindYourStyle";
// import PromptPhrases from "@/components/PromptPhrases";
// import SceneBuilder from "@/components/SceneBuilder";
// import Journal from "@/components/Journal";
// import FriendEngine from "@/components/FriendEngine";
// import TopNav from "@/components/TopNav";
// import EchoTabs from "@/components/EchoTabs";

export default function Home() {
  return (
    <ProjectsProvider>
      <MainApp />
    </ProjectsProvider>
  );
}

function MainApp() {
  const router = useRouter();
  // Sol menüdeki aktif alan
  const [activeTab, setActiveTab] = useState("style");
  // Üst menüdeki aktif alan (Your Echo, Global Echo)
  const [topMenu, setTopMenu] = useState<"your" | "global">("your");
  // Alt sekme: likes, phrases, scenes, stories
  const [echoTab, setEchoTab] = useState<"likes" | "phrases" | "scenes" | "stories">("likes");

  // Modal ve selection state
  const [showModal, setShowModal] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);

  // Placeholderlar; bunlar ayrı component olarak split edilmeli!
  const renderContent = () => {
    switch (activeTab) {
      case "style":
        // return <FindYourStyle />;
        return <div className="text-gray-400">Find Your Style component gelecek...</div>;
      case "phrases":
        // return <PromptPhrases />;
        return <div className="text-gray-400">Create Your Prompt Phrases component gelecek...</div>;
      case "scene":
        // return <SceneBuilder />;
        return <div className="text-gray-400">The Way to Your Scene component gelecek...</div>;
      case "journal":
        // return <Journal />;
        return <div className="text-gray-400">Your Journal component gelecek...</div>;
      case "storyboard":
        return <Storyboard />;
      case "engines":
        // return <FriendEngine />;
        return <div className="text-gray-400">Work With Your Friend Engine component gelecek...</div>;
      default:
        return null;
    }
  };

  // Üst menü (Your Echo / Global Echo)
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

  // Alt sekmeler
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
      {/* Sol Menü */}
      <div className="w-64 bg-[#1a1a1a] p-6 flex flex-col gap-4 shadow-lg">
        <h1
          className="text-2xl font-bold mb-6 cursor-pointer hover:opacity-80"
          onClick={() => router.push("/landing")}
        >
          🌀 Find Your Echo
        </h1>
        <nav className="flex flex-col gap-3 text-sm">
          <button
            onClick={() => setActiveTab("style")}
            className={`text-left p-3 rounded ${activeTab === "style" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
          >
            🌀 Find Your Style
          </button>
          <button
            onClick={() => setActiveTab("phrases")}
            className={`text-left p-3 rounded ${activeTab === "phrases" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
          >
            💬 Create Your Prompt Phrases
          </button>
          <button
            onClick={() => setActiveTab("scene")}
            className={`text-left p-3 rounded ${activeTab === "scene" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
          >
            🎬 The Way to Your Scene
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className={`text-left p-3 rounded ${activeTab === "journal" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
          >
            📓 Your Journal
          </button>
          <button
            onClick={() => setActiveTab("storyboard")}
            className={`text-left p-3 rounded ${activeTab === "storyboard" ? "bg-green-600" : "bg-[#222] hover:bg-[#333]"}`}
          >
            📽️ Storyboard
          </button>
          <button
            onClick={() => setActiveTab("engines")}
            className={`text-left p-3 rounded ${activeTab === "engines" ? "bg-green-600" : "bg-[#444] hover:bg-[#555]"}`}
          >
            🎛️ Work With Your Friend Engine
          </button>
        </nav>
        <div className="mt-auto text-xs opacity-50 pt-4 border-t border-gray-600">
          Powered by SpiralPrompt Engine © 2025
        </div>
      </div>
      {/* Sağ ana içerik */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Üst Menü */}
        {renderTopMenu()}
        {/* Alt sekmeler */}
        {renderEchoTabs()}
        {/* Proje Seçici */}
        <ProjectSelector />
        {/* Seçilen alanın içeriği */}
        {renderContent()}
        {/* Modal örneği */}
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
