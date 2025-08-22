"use client";
import { useState, FormEvent } from "react";
import { SubstackCard } from "./SubstackCard";
import ResultsLoadingSkeleton from "./ui/ResultsLoadingSkeleton";
import SearchSuggestions from "./ui/SearchSuggestions";

export default function SubstackFinder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle search from Exa API
  const handleSearchResults = async (query: string) => {
    try {
      const response = await fetch('/api/substack-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch search results.');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error in handleSearchResults:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
      setSearchResults([]);
    }
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery) {
      setError("Please enter a search topic to find Substack posts.");
      return;
    }
    
    setIsGenerating(true);
    setError(null);

    try {
      await handleSearchResults(searchQuery);
    } catch (error) {
      console.error('Error in search:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSuggestionClick = async (query: string) => {
    setSearchQuery(query);
    setIsGenerating(true);
    setError(null);

    try {
      await handleSearchResults(query);
    } catch (error) {
      console.error('Error in suggestion search:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="md:max-w-4xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <a
            href="https://dashboard.exa.ai/playground/"
            target="_blank"
            className="flex items-center px-4 py-1.5 bg-white border-2 border-[var(--brand-default)] text-[var(--brand-default)] 
            rounded-none hover:bg-[var(--brand-default)] hover:text-white transition-all duration-200 
            font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-sm">Try Exa API</span>
          </a>
          <div className="flex items-center gap-4 text-md text-gray-600">
            <a
              href="https://exa.ai/demos"
              target="_blank"
              className="hover:text-[var(--brand-default)] transition-colors"
            >
              <span className="underline">See More Demos</span>
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="https://github.com/exa-labs/substack-exa-search"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-[var(--brand-default)] transition-colors"
            >
              <span className="underline">View Project Code</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen w-full md:max-w-5xl z-0">
        <main className={`flex flex-col flex-grow w-full md:max-w-5xl p-2 md:p-6 pt-20 md:pt-24 ${
          !searchQuery && !isGenerating && searchResults.length === 0 
            ? 'justify-center' 
            : ''
        }`}>
          
          <h1 className={`md:text-4xl text-2xl mb-8 font-medium opacity-0 animate-fade-up [animation-delay:300ms] ${
            !searchQuery && !isGenerating && searchResults.length === 0 
              ? 'mt-28 md:mt-56' 
              : 'mt-2 md:mt-2'
          }`}>
            Search across Substack using Exa AI
          </h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Substack posts..."
                className="flex-1 p-3 rounded-none ring-2 ring-brand-default focus:outline-none opacity-0 animate-fade-up [animation-delay:400ms]"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="bg-brand-default text-white px-6 py-3 rounded-none ring-2 ring-brand-default hover:bg-brand-dark transition-colors disabled:opacity-50 opacity-0 animate-fade-up [animation-delay:400ms]"
              >
                {isGenerating ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {!isGenerating && searchResults.length === 0 && (
            <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
          )}

          {error && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-none">
              {error}
            </div>
          )}

          {isGenerating && <ResultsLoadingSkeleton />}

          {!isGenerating && searchResults.length > 0 && (
            <>
              <h2 className="text-2xl font-normal mb-6 text-gray-800 mt-10">
                Substack Posts
              </h2>
              <div className="space-y-4">
                {searchResults
                  .filter(post => post.title && post.title.trim() !== '')
                  .map((post, index) => (
                  <SubstackCard
                    key={index}
                    post={post}
                    animationDelay={100 + index * 100}
                  />
                ))}
              </div>

              {/* Show suggestions again after search results */}
              <div className="mt-12">
                <h2 className="text-xl font-normal mb-6 text-gray-800">
                  Explore More Topics
                </h2>
                <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
