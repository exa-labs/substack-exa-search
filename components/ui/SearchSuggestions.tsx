"use client";

interface SearchSuggestionsProps {
  onSuggestionClick: (query: string) => void;
  searchMode: 'posts' | 'writers';
}

export default function SearchSuggestions({ onSuggestionClick, searchMode }: SearchSuggestionsProps) {
  const postSuggestions = [
    {
      title: "AI and Machine Learning",
      description: "Latest insights on artificial intelligence and ML trends",
      query: "artificial intelligence machine learning trends"
    },
    {
      title: "Startup Funding & Venture Capital",
      description: "Investment trends and startup ecosystem analysis", 
      query: "startup funding venture capital investment trends"
    },
    {
      title: "Climate Change & Sustainability",
      description: "Environmental discussions and climate solutions",
      query: "climate change sustainability environment solutions"
    },
    {
      title: "Web3 & Cryptocurrency",
      description: "Blockchain technology and crypto market analysis",
      query: "web3 cryptocurrency blockchain bitcoin ethereum"
    }
  ];

  const writerSuggestions = [
    {
      title: "AI & Technology Writers",
      description: "Writers who cover artificial intelligence and tech trends",
      query: "AI artificial intelligence technology"
    },
    {
      title: "Business & Finance Writers",
      description: "Authors focused on startups, investing, and economics",
      query: "business finance investing startup"
    },
    {
      title: "Climate & Environment Writers",
      description: "Writers covering sustainability and environmental issues",
      query: "climate change environment sustainability"
    },
    {
      title: "Crypto & Web3 Writers",
      description: "Authors covering blockchain and cryptocurrency topics",
      query: "cryptocurrency blockchain web3 bitcoin"
    }
  ];

  const suggestions = searchMode === 'posts' ? postSuggestions : writerSuggestions;

  return (
    <div className="opacity-0 animate-fade-up [animation-delay:500ms] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.query)}
            className="p-4 border border-gray-300 rounded-none hover:border-brand-default hover:bg-brand-fainter transition-all duration-200 cursor-pointer text-left opacity-0 animate-fade-up"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            <h3 className="font-medium text-gray-800 mb-2">
              {suggestion.title}
            </h3>
            <p className="text-sm text-gray-600">
              {suggestion.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
