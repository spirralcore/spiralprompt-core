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
