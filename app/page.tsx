"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import Sidebar from "@/components/Sidebar";
import ProjectSelector from "@/components/ProjectSelector";
import AddToSceneModal from "@/components/AddToSceneModal";

import FindYourStyle from "@/components/FindYourStyle";
import PromptPhrases from "@/components/PromptPhrases";
import SceneBuilder from "@/components/SceneBuilder";
import Journal from "@/components/Journal";
import Storyboard from "@/components/Storyboard";
import FriendEngine from "@/components/FriendEngine";

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

  // Burası GTP veya agent veri kaynaklarının geldiği yer olacak.
  // Şu an örnek data ile bağlıyorum, gerçek GTP geldiğinde state'leri buraya bağlayacaksın!
  const [gtpTags, setGtpTags] = useState<Record<string, string[]> | null>(null);
  const [gtpPhrases, setGtpPhrases] = useState<string[] | null>(null);
  const [gtpScenes, setGtpScenes] = useState<any[] | null>(null);
  const [gtpJournal, setGtpJournal] = useState<string[] | null>(null);
  const [gtpStoryboard, setGtpStoryboard] = useState<any[] | null>(null);
  const [gtpEngine, setGtpEngine] = useState<any | null>(null);

  // Loading state örnekleri (agent veri bekleniyorsa)
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingPhrases, setLoadingPhrases] = useState(false);
  const [loadingScenes, setLoadingScenes] = useState(false);
  const [loadingJournal, setLoadingJournal] = useState(false);
  const [loadingStoryboard, setLoadingStoryboard] = useState(false);
  const [loadingEngine, setLoadingEngine] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "style":
        return (
          <FindYourStyle tags={gtpTags} loading={loadingTags} />
        );
      case "phrases":
        return (
          <PromptPhrases phrases={gtpPhrases} loading={loadingPhrases} />
        );
      case "scene":
        return (
          <SceneBuilder scenes={gtpScenes} loading={loadingScenes} />
        );
      case "journal":
        return (
          <Journal notes={gtpJournal} loading={loadingJournal} />
        );
      case "storyboard":
        return (
          <Storyboard board={gtpStoryboard} loading={loadingStoryboard} />
        );
      case "engines":
        return (
          <FriendEngine data={gtpEngine} loading={loadingEngine} />
        );
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
        onLogoClick={() => router.push("/landing")}
      />
      <main className="flex-1 p-10 overflow-y-auto bg-[#f4f8fa]">
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
