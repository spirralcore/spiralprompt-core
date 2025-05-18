type PromptPhrasesProps = {
  phrases?: string[];
  loading?: boolean;
};

export default function PromptPhrases({ phrases, loading }: PromptPhrasesProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-lg text-gray-500">
        Loading prompt phrases from agent...
      </div>
    );
  }

  if (!phrases) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        No prompt phrases loaded. (Agent not connected.)
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-7">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 via-green-400 to-teal-400 bg-clip-text text-transparent">
        Create Your Prompt Phrases
      </h2>
      <ul className="space-y-4">
        {phrases.length === 0 ? (
          <li className="text-center text-gray-500">No phrases found.</li>
        ) : (
          phrases.map((phrase, idx) => (
            <li
              key={idx}
              className="bg-white/80 rounded-xl p-4 text-gray-800 font-medium shadow border border-blue-100"
            >
              <span className="block">"{phrase}"</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
