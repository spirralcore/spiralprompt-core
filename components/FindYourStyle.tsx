type FindYourStyleProps = {
  tags?: Record<string, string[]>;
  loading?: boolean;
};

export default function FindYourStyle({ tags, loading }: FindYourStyleProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-lg text-gray-500">
        Loading tags from GTP...
      </div>
    );
  }

  if (!tags) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        No data loaded. (Agent not connected.)
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-600 via-teal-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
        Find Your Style
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {Object.entries(tags).map(([title, tagList]) => (
          <div
            key={title}
            className="bg-white/70 rounded-2xl shadow-lg p-5 border border-green-200 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-green-900 mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium border border-green-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
