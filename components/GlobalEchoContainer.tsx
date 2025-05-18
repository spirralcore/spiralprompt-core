"use client";

type Props = {
  activeTab: "likes" | "phrases" | "scenes" | "stories";
};

export default function GlobalEchoContainer({ activeTab }: Props) {
  return (
    <div className="mt-8 text-center text-gray-500">
      <p className="text-xl font-semibold mb-4">
        🌍 Global Echo – {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </p>
      <p>
        Public projects from all users will appear here soon.
      </p>
    </div>
  );
}
