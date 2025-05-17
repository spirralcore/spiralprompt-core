"use client";

type Props = {
  activeTab: "your" | "global";
  onTabChange: (tab: "your" | "global") => void;
};

export default function TopNav({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex justify-center gap-4 py-6 border-b border-gray-700 bg-[#0f0f0f] text-white">
      <button
        onClick={() => onTabChange("your")}
        className={`px-6 py-2 rounded text-lg ${
          activeTab === "your"
            ? "bg-green-600"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        🌀 Your Echo
      </button>
      <button
        onClick={() => onTabChange("global")}
        className={`px-6 py-2 rounded text-lg ${
          activeTab === "global"
            ? "bg-green-600"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        🌐 Global Echo
      </button>
    </div>
  );
}
