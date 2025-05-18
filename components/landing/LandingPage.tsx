"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import YourEchoContainer from "@/components/YourEchoContainer";
import GlobalEchoContainer from "@/components/GlobalEchoContainer";

export default function LandingPage() {
  const [currentTab, setCurrentTab] = useState<"your" | "global">("your");
  const [echoTab, setEchoTab] = useState<"likes" | "phrases" | "scenes" | "stories">("likes");

  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-[#f1f5f9] to-[#e5f6ef] text-gray-800">
      <div className="max-w-5xl mx-auto">
        <TopNav
          currentTab={currentTab}
          setTab={setCurrentTab}
          echoTab={echoTab}
          setEchoTab={setEchoTab}
        />

        {currentTab === "your" ? (
          <YourEchoContainer activeTab={echoTab} />
        ) : (
          <GlobalEchoContainer activeTab={echoTab} />
        )}
      </div>
    </main>
  );
}

