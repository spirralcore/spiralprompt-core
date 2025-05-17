"use client";

import { useState } from "react";
import TopNav from "./TopNav";
import YourEchoContainer from "./YourEchoContainer";
// import GlobalEchoContainer from "./GlobalEchoContainer"; // İleride ekleyeceğiz

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"your" | "global">("your");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="p-6">
        {activeTab === "your" ? (
          <YourEchoContainer />
        ) : (
          <div className="text-gray-500 text-center py-10">
            🌐 Global Echo coming soon...
          </div>
          // GlobalEchoContainer() ileride buraya eklenecek
        )}
      </div>
    </div>
  );
}
