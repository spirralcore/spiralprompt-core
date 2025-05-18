"use client";

type PromptPhrasesProps = {
  phrases: string[];
  likedPhrases: string[];
  combo: string[];
  searchTerm: string;
  onSearch: (q: string) => void;
  onLike: (phrase: string) => void;
  onCombo: (phrase: string) => void;
  onSendCombo: () => void;
  onAddToStoryboard: (phrase: string) => void;
  onAddToCollection: (phrase: string) => void;
};

export default function PromptPhrases({
  phrases,
  likedPhrases,
  combo,
  searchTerm,
  onSearch,
  onLike,
  onCombo,
  onSendCombo,
  onAddToStoryboard,
  onAddToCollection,
}: PromptPhrasesProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 via-green-400 to-teal-400 bg-clip-text text-transparent">
        Create Your Prompt Phrases
      </h2>

      {/* Search bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search prompt phrases..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-xl border border-blue-200 bg-white/80 text-gray-800 shadow focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Combo + send */}
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {combo.map((phrase) => (
          <span
            key={phrase}
            className="inline-flex items-center bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-semibold shadow hover:bg-blue-300 transition"
          >
            "{phrase}"
            <button
              className="ml-2 text-xs font-bold text-blue-800 hover:text-red-500"
              onClick={() => onCombo(phrase)}
            >
              ✕
            </button>
          </span>
        ))}
        {combo.length > 0 && (
          <button
            className="ml-2 px-4 py-1 bg-blue-700 text-white rounded-full font-bold shadow hover:bg-blue-600 transition"
            onClick={onSendCombo}
          >
            ➡️ Send Combo to Scenes
          </button>
        )}
      </div>

      {/* Phrase list */}
      <ul className="space-y-4">
        {phrases.map((phrase, idx) => (
          <li
            key={idx}
            className="bg-white/80 rounded-xl p-4 text-gray-800 font-medium shadow border border-blue-100 flex flex-wrap gap-2 items-center"
          >
            <span className="block flex-1">"{phrase}"</span>

            <button
              title="Like"
              onClick={() => onLike(phrase)}
              className={`text-lg ${
                likedPhrases.includes(phrase)
                  ? "text-pink-500 scale-125"
                  : "text-gray-400 hover:text-pink-400"
              } transition-all`}
            >
              ❤️
            </button>

            <button
              title="Add to Scenes Collection"
              onClick={() => onAddToCollection(phrase)}
              className="ml-0.5 text-lg text-green-700 hover:text-green-900 transition-all"
            >
              📥
            </button>

            <button
              title="Add to Storyboard"
              onClick={() => onAddToStoryboard(phrase)}
              className="ml-0.5 text-lg text-emerald-700 hover:text-emerald-900 transition-all"
            >
              🎬
            </button>

            <button
              title="Combo"
              onClick={() => onCombo(phrase)}
              className={`ml-0.5 text-lg ${
                combo.includes(phrase)
                  ? "text-blue-800 scale-110"
                  : "text-gray-400 hover:text-blue-600"
              } transition-all`}
            >
              ➕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center text-sm text-gray-500">
        <span>
          <span className="font-semibold text-blue-800">{combo.length}</span>
          /3 phrase combo selected
        </span>
      </div>
    </div>
  );
}

