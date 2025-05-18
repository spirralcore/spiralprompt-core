"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectsProvider, useProjects } from "@/contexts/ProjectsContext";
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
  const {
    // FindYourStyle
    tags,
    likedTags,
    tagCombo,
    tagSearch,
    setTagSearch,
    toggleTagLike,
    toggleTagCombo,
    handleSendTagCombo,
    addTagToStoryboard,

    // PromptPhrases
    phrases,
    likedPhrases,
    phraseCombo,
    phraseSearch,
    setPhraseSearch,
    togglePhraseLike,
    togglePhraseCombo,
    handleSendPhraseCombo,
    addPhraseToStoryboard,
    addPhraseToCollection,

    // SceneBuilder
    scenes,
    likedScenes,
    sceneCombo,
    sceneSearch,
    setSceneSearch,
    toggleSceneLike,
    toggleSceneCombo,
    handleSendSceneCombo,
    addSceneToStoryboard,
    addSceneToCollection,

    // Journal
    journalEntries,
    likedJournalEntries,
    journalCombo,
    journalSearch,
    setJournalSearch,
    toggleJournalLike,
    toggleJournalCombo,
    handleSendJournalCombo,
    addJournalToStoryboard,
    addJournalToCollection,
    addJournalEntry,

    // Storyboard
    storyboardItems,
    removeFromStoryboard,
    reorderStoryboard,
    addCustomToStoryboard,

    // Diğer (modal, project, vs. contextten geliyor olabilir)
  } = useProjects(); // Burada tüm veri context/agent’ten geliyor!

  const [activeTab, setActiveTab] = useState("style");
  const [topMenu, setTopMenu] = useState<"your" | "global">("your");
  const [echoTab, setEchoTab] = useState<"likes" | "phrases" | "scenes" | "stories">("likes");
  const [showModal, setShowModal] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);

  // --------- renderContent ---------
  const renderContent = () => {
    switch (activeTab) {
      case "style":
        return (
          <FindYourStyle
            tags={tags}
            likedTags={likedTags}
            combo={tagCombo}
            searchTerm={tagSearch}
            onSearch={setTagSearch}
            onLike={toggleTagLike}
            onCombo={toggleTagCombo}
            onSendCombo={handleSendTagCombo}
            onAddToStoryboard={addTagToStoryboard}
          />
        );
      case "phrases":
        return (
          <PromptPhrases
            phrases={phrases}
            likedPhrases={likedPhrases}
            combo={phraseCombo}
            searchTerm={phraseSearch}
            onSearch={setPhraseSearch}
            onLike={togglePhraseLike}
            onCombo={togglePhraseCombo}
            onSendCombo={handleSendPhraseCombo}
            onAddToStoryboard={addPhraseToStoryboard}
            onAddToCollection={addPhraseToCollection}
          />
        );
      case "scene":
        return (
          <SceneBuilder
            scenes={scenes}
            likedScenes={likedScenes}
            combo={sceneCombo}
            searchTerm={sceneSearch}
            onSearch={setSceneSearch}
            onLike={toggleSceneLike}
            onCombo={toggleSceneCombo}
            onSendCombo={handleSendSceneCombo}
            onAddToStoryboard={addSceneToStoryboard}
            onAddToCollection={addSceneToCollection}
          />
        );
      case "journal":
        return (
          <Journal
            entries={journalEntries}
            likedEntries={likedJournalEntries}
            combo={journalCombo}
            searchTerm={journalSearch}
            onSearch={setJournalSearch}
            onLike={toggleJournalLike}
            onCombo={toggleJournalCombo}
            onSendCombo={handleSendJournalCombo}
            onAddToStoryboard={addJournalToStoryboard}
            onAddToCollection={addJournalToCollection}
            onAddEntry={addJournalEntry}
          />
        );
      case "storyboard":
        return (
          <Storyboard
            items={storyboardItems}
            onRemove={removeFromStoryboard}
            onReorder={reorderStoryboard}
            onAddCustom={addCustomToStoryboard}
          />
        );
      case "engines":
        return (
          <FriendEngine
            data={null} // Agent gelince eklenir
          />
        );
      default:
        return null;
    }
  };

  // ---------- UI ----------
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
