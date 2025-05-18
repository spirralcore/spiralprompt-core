"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import Sidebar from "@/components/Sidebar";
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
    <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogoClick={() => router.push("/landing")}
    />
    <main className="flex-1 p-10 overflow-y-auto">
      {/* Sağ ana içerik burada */}
      {renderTopMenu()}
      {renderEchoTabs()}
      <ProjectSelector />
      {renderContent()}
      {/* Modals, vs... */}
    </main>
  </div>
);

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
