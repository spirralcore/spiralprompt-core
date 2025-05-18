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
  return (
    <div className="mb-8 space-y-6">
      {/* Üst Menü */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setTab("your")}
          className={`px-5 py-2 rounded-lg font-semibold ${
            currentTab === "your"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Your Echo
        </button>
        <button
          onClick={() => setTab("global")}
          className={`px-5 py-2 rounded-lg font-semibold ${
            currentTab === "global"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Global Echo
        </button>
      </div>

      {/* Alt Sekmeler */}
      <div className="flex justify-center gap-3">
        {["likes", "phrases", "scenes", "stories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setEchoTab(tab as any)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              echoTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
