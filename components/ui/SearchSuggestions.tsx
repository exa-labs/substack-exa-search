"use client";

interface SearchSuggestionsProps {
  onSuggestionClick: (query: string) => void;
}

export default function SearchSuggestions({ onSuggestionClick }: SearchSuggestionsProps) {
  const suggestions = [
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

  return (
    <div className="opacity-0 animate-fade-up [animation-delay:500ms]">
      <h2 className="text-xl font-normal mb-6 text-gray-800">
        Popular Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSuggestionClick(suggestion.query)}
            className="p-4 bg-secondary-faint hover:bg-secondary-fainter border rounded-sm cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 opacity-0 animate-fade-up"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            <h3 className="font-medium text-gray-800 mb-2">
              {suggestion.title}
            </h3>
            <p className="text-sm text-gray-600">
              {suggestion.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
