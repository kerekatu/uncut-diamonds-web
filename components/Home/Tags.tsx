import { useState } from "react";

const TAGS = [
  "🇵🇱 Społeczność",
  "🔞 18+",
  "🕹️ Gry",
  "🎉 Wydarzenia",
  "🔊 Aktywne VC",
  "💵 Ekonomia",
  "🤖 Autorski bot",
  "🌸 Anime",
];

const Tags = () => {
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <div className="flex flex-col flex-wrap gap-4 items-center justify-center mb-6 text-lg font-semibold sm:text-xl">
      <ul className="flex flex-wrap gap-4 items-center justify-center">
        {TAGS.slice(0, 4).map((tag, index) => (
          <li className="px-4 py-2 bg-zinc-900 rounded-xl" key={index}>
            {tag}
          </li>
        ))}

        {!showAllTags && TAGS.length > 4 && (
          <li className="hidden sm:block">
            <button
              onClick={() => setShowAllTags(true)}
              disabled={showAllTags}
              className="px-4 py-2 bg-zinc-900 rounded-xl text-xl font-semibold transition-opacity hover:opacity-75"
            >
              ...
            </button>
          </li>
        )}
      </ul>

      <ul className="hidden gap-4 items-center justify-center sm:flex sm:flex-wrap">
        {showAllTags &&
          TAGS.slice(4).map((tag, index) => (
            <li className="px-4 py-2 bg-zinc-900 rounded-xl" key={index}>
              {tag}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tags;
