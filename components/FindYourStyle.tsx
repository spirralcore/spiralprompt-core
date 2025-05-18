"use client";

type FindYourStyleProps = {
  tags: string[];
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
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tag list */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => {
          const isLiked = likedTags.includes(tag);
          const isCombo = combo.includes(tag);

          return (
            <div
              key={tag}
              className={`cursor-pointer px-3 py-1 rounded-full border shadow-sm text-sm select-none
                ${isLiked ? "bg-pink-200 border-pink-400" : "bg-white border-gray-300"}
                ${isCombo ? "ring-2 ring-blue-400" : ""}
              `}
              onClick={() => onCombo(tag)}
              onDoubleClick={() => onLike(tag)}
              onContextMenu={(e) => {
                e.preventDefault();
                onAddToStoryboard(tag);
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>

      {/* Combo actions */}
      <div className="text-center">
        <button
          onClick={onSendCombo}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          Send Combo
        </button>
      </div>
    </div>
  );
}
