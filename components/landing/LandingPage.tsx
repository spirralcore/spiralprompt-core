"use client";

import { useState } from "react";
import TopNav from "./TopNav";
import YourEchoContainer from "./YourEchoContainer";
import GlobalEchoContainer from "./GlobalEchoContainer";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"your" | "global">("your");

  return (
    <div className="p-10 bg-[#0f0f0f] min-h-screen text-white">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "your" && <YourEchoContainer />}
      {activeTab === "global" && <GlobalEchoContainer />}
    </div>
  );
}
