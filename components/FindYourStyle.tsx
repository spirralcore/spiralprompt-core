"use client";

type FindYourStyleProps = {
  tags: Record<string, string[]>;            // agent'dan gelen tag kategorileri
  likedTags: string[];
  combo: string[];
  searchTerm: string;
  onSearch: (q: string) => void;
  onLike: (tag: string) => void;
  onCombo: (tag: string) => void;
  onSendCombo: () => void;
  onAddToStoryboard: (tag: string) => void;
};

export default function FindYourStyle({
  tags,
  likedTags,
  combo,
  searchTerm,
  onSearch,
  onLike,
  onCombo,
  onSendCombo,
  onAddToStoryboard,
}: FindYourStyleProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-600 via-teal-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
        Find Your Style
      </h2>
      {/* Search bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search style tags..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-xl border border-green-200 bg-white/80 text-gray-800 shadow focus:ring-2 focus:ring-green-400 outline-none"
        />
      </div>
      {/* Combo ve combo’yu phrase’a gönder */}
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {combo.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center bg-green-200 text-green-900 px-3 py-1 rounded-full font-semibold shadow hover:bg-green-300 transition"
          >
            #{tag}
            <button
              className="ml-2 text-xs font-bold text-green-800 hover:text-red-500"
              onClick={() => onCombo(tag)}
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
            ➡️ Send Combo to Phrases
          </button>
        )}
      </div>
      {/* Kategori listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {Object.entries(tags).map(([title, tags]) =>
          tags.length > 0 ? (
            <div
              key={title}
              className="bg-white/70 rounded-2xl shadow-lg p-5 border border-green-200 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-green-900 mb-3">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <div
                    key={tag}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-all
                      ${
                        combo.includes(tag)
                          ? "bg-green-500/80 text-white border-green-600 shadow"
                          : "bg-green-100 text-green-700 border-green-200"
                      }
                    `}
                  >
                    <button
                      className="font-medium focus:outline-none"
                      onClick={() => onCombo(tag)}
                      disabled={
                        !combo.includes(tag) && combo.length >= 5
                      }
                    >
                      #{tag}
                    </button>
                    {/* Like butonu */}
                    <button
                      title="Like"
                      onClick={() => onLike(tag)}
                      className={`ml-1 text-lg ${
                        likedTags.includes(tag)
                          ? "text-pink-500 scale-125"
                          : "text-gray-400 hover:text-pink-400"
                      } transition-all`}
                    >
                      ❤️
                    </button>
                    {/* Add to Storyboard */}
                    <button
                      title="Add to Storyboard"
                      onClick={() => onAddToStoryboard(tag)}
                      className="ml-0.5 text-lg text-emerald-700 hover:text-emerald-900 transition-all"
                    >
                      🎬
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <span>
          <span className="font-semibold text-green-800">{combo.length}</span>
          /5 style combo selected
        </span>
      </div>
    </div>
  );
}
