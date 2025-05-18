"use client";

type FriendEngineProps = {
  data?: any; // İleride GTP/agent çıktısı
  loading?: boolean;
};

export default function FriendEngine({ data, loading }: FriendEngineProps) {
  // Sadece temel placeholder. Sonradan agent/GTP fonksiyonları eklenir.
  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <span className="text-lg text-green-700">Loading Friend Engine...</span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#e2ebe9cc] rounded-xl shadow-inner text-green-900">
      <h2 className="text-2xl font-bold mb-3">🎛️ Friend Engine</h2>
      <div className="mb-2 opacity-80 text-sm">
        Here you will interact with advanced GTP agents. (Coming soon!)
      </div>
      {/* Sonradan agent/GTP response UI buraya gelecek */}
      {data && (
        <pre className="mt-4 bg-[#f4f8fa] p-4 rounded text-xs text-gray-800 overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
