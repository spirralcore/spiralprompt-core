"use client";

type TopNavProps = {
  currentTab: "your" | "global";
  setTab: (tab: "your" | "global") => void;
  echoTab: "likes" | "phrases" | "scenes" | "stories";
  setEchoTab: (tab: "likes" | "phrases" | "scenes" | "stories") => void;
};

export default function TopNav({
  currentTab,
  setTab,
  echoTab,
  setEchoTab,
}: TopNavProps) {
  const echoTabs = ["likes", "phrases", "scenes", "stories"];

  return (
    <div className="space-y-6">
      {/* Üst sekme: Your / Global */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setTab("your")}
          className={`px-5 py-2 rounded-full font-semibold shadow ${
            currentTab === "your"
              ? "bg-green-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Your Echo
        </button>
        <button
          onClick={() => setTab("global")}
          className={`px-5 py-2 rounded-full font-semibold shadow ${
            currentTab === "global"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Global Echo
        </button>
      </div>

      {/* Alt sekmeler: Likes, Phrases, Scenes, Stories */}
      <div className="flex gap-3 justify-center">
        {echoTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setEchoTab(tab as any)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              echoTab === tab
                ? "bg-gradient-to-r from-green-400 to-blue-400 text-white"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
