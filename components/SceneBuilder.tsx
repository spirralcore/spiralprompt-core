"use client";

type SceneBuilderProps = {
  scenes: string[];
  likedScenes: string[];
  combo: string[];
  searchTerm: string;
  onSearch: (q: string) => void;
  onLike: (scene: string) => void;
  onCombo: (scene: string) => void;
  onSendCombo: () => void;
  onAddToStoryboard: (scene: string) => void;
  onAddToCollection: (scene: string) => void;
};

export default function SceneBuilder({
  scenes,
  likedScenes,
  combo,
  searchTerm,
  onSearch,
  onLike,
  onCombo,
  onSendCombo,
  onAddToStoryboard,
  onAddToCollection,
}: SceneBuilderProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-600 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        The Way to Your Scene
      </h2>

      {/* Search bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search scene suggestions..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-xl border border-emerald-200 bg-white/80 text-gray-800 shadow focus:ring-2 focus:ring-emerald-400 outline-none"
        />
      </div>

      {/* Combo ve gönder */}
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {combo.map((scene) => (
          <span
            key={scene}
            className="inline-flex items-center bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full font-semibold shadow hover:bg-emerald-300 transition"
          >
            {scene}
            <button
              className="ml-2 text-xs font-bold text-emerald-800 hover:text-red-500"
              onClick={() => onCombo(scene)}
            >
              ✕
            </button>
          </span>
        ))}
        {combo.length > 0 && (
          <button
            className="ml-2 px-4 py-1 bg-emerald-700 text-white rounded-full font-bold shadow hover:bg-emerald-600 transition"
            onClick={onSendCombo}
          >
            ➡️ Send Combo to Stories
          </button>
        )}
      </div>

      {/* Scene list */}
      <ul className="space-y-4">
        {scenes.map((scene, idx) => (
          <li
            key={idx}
            className="bg-white/80 rounded-xl p-4 text-gray-800 font-medium shadow border border-emerald-100 flex flex-wrap gap-2 items-center"
          >
            <span className="block flex-1">{scene}</span>

            <button
              title="Like"
              onClick={() => onLike(scene)}
              className={`text-lg ${
                likedScenes.includes(scene)
                  ? "text-pink-500 scale-125"
                  : "text-gray-400 hover:text-pink-400"
              } transition-all`}
            >
              ❤️
            </button>

            <button
              title="Add to Scenes Collection"
              onClick={() => onAddToCollection(scene)}
              className="ml-0.5 text-lg text-blue-700 hover:text-blue-900 transition-all"
            >
              📥
            </button>

            <button
              title="Add to Storyboard"
              onClick={() => onAddToStoryboard(scene)}
              className="ml-0.5 text-lg text-emerald-700 hover:text-emerald-900 transition-all"
            >
              🎬
            </button>

            <button
              title="Combo"
              onClick={() => onCombo(scene)}
              className={`ml-0.5 text-lg ${
                combo.includes(scene)
                  ? "text-emerald-800 scale-110"
                  : "text-gray-400 hover:text-emerald-600"
              } transition-all`}
              disabled={!combo.includes(scene) && combo.length >= 3}
            >
              ➕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center text-sm text-gray-500">
        <span>
          <span className="font-semibold text-emerald-800">{combo.length}</span>
          /3 scene combo selected
        </span>
      </div>
    </div>
  );
}
