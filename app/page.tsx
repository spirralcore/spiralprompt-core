"use client";

import { useProjects } from "@/contexts/ProjectsContext";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ProjectSelector from "@/components/ProjectSelector";
import AddToSceneModal from "@/components/AddToSceneModal";
import FindYourStyle from "@/components/FindYourStyle";
import PromptPhrases from "@/components/PromptPhrases";
import SceneBuilder from "@/components/SceneBuilder";
import Journal from "@/components/Journal";
import Storyboard from "@/components/Storyboard";
import FriendEngine from "@/components/FriendEngine";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#f5f7f9] text-gray-800">
      <MainApp />
    </div>
  );
}

function MainApp() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    tagSearch, setTagSearch, tags, likedTags, tagCombo, toggleTagLike, toggleTagCombo, handleSendTagCombo, addTagToStoryboard,
    phraseSearch, setPhraseSearch, phrases, likedPhrases, phraseCombo, togglePhraseLike, togglePhraseCombo, handleSendPhraseCombo, addPhraseToStoryboard, addPhraseToCollection,
    sceneSearch, setSceneSearch, scenes, likedScenes, sceneCombo, toggleSceneLike, toggleSceneCombo, handleSendSceneCombo, addSceneToStoryboard, addSceneToCollection,
    journalSearch, setJournalSearch, journalEntries, likedJournalEntries, journalCombo, toggleJournalLike, toggleJournalCombo, handleSendJournalCombo, addJournalToStoryboard, addJournalToCollection, addJournalEntry,
    storyboardItems, removeFromStoryboard, reorderStoryboard, addCustomToStoryboard,
  } = useProjects();

  const [activeTab, setActiveTab] = useState("style");
  const [showModal, setShowModal] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);

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
        return <FriendEngine />;
      default:
        return null;
    }
  };

  const showTopMenu = pathname === "/landing";

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogoClick={() => router.push("/landing")} />
      <main className="flex-1 p-8 overflow-y-auto">
        {showTopMenu && (
          <>
            <ProjectSelector />
            <div className="h-4" />
          </>
        )}
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
    </>
  );
}
