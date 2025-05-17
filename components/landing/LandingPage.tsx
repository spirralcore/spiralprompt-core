"use client";

import { useState } from "react";
import TopNav from "./TopNav";
import YourEchoContainer from "./YourEchoContainer";
// import GlobalEchoContainer from "./GlobalEchoContainer"; // sonra eklenecek

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"your" | "global">("your");

  return (
    <div className="p-10 bg-[#0f0f0f] min-h-screen text-white">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "your" && <YourEchoContainer />}

      {activeTab === "global" && (
        <div className="text-center text-gray-500 mt-20">
          🌍 Global Echo is coming soon...
        </div>
        // TODO: <GlobalEchoContainer />
      )}
    </div>
  );
}

