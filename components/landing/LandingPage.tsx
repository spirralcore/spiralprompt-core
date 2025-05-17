"use client";

import YourEchoContainer from "./YourEchoContainer";

export default function LandingPage() {
  return (
    <div className="p-10 bg-[#0f0f0f] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">🌀 Your Echo</h1>
      <YourEchoContainer />
    </div>
  );
}

