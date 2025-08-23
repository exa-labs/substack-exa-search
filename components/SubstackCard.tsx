"use client";

import { ExternalLink } from 'lucide-react';

interface SubstackPost {
  title: string;
  text: string;
  author: string;
  publishedDate: string;
  summary: string;
  url: string;
}

export function SubstackCard({ 
  post, 
  animationDelay,
}: { 
  post: SubstackPost;
  animationDelay: number;
}) {
  
  // Extract year from date, return null if invalid
  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.getFullYear() : null;
  };

  const year = getYear(post.publishedDate);
  const hasValidAuthor = post.author && post.author !== "" && post.author.trim() !== "";

  // Function to format the display string
  const formatMetaInfo = (year: number | null, author: string | null) => {
    if (year && hasValidAuthor) {
      return `${year} | ${author}`;
    }
    if (year) {
      return `${year}`;
    }
    if (hasValidAuthor) {
      return `${author}`;
    }
    return null;
  };

  const metaInfo = formatMetaInfo(year, post.author);

  // Extract domain for display
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div 
      className="cursor-pointer hover:shadow-md transition-shadow duration-100"
      onClick={() => window.open(post.url, '_blank')}
    >
      <div className="mb-3 p-6 hover:translate-y-[-2px] md:px-4 md:py-3 hover:bg-gray-50 rounded-sm shadow-none border transition-all duration-300 opacity-0 animate-fade-up"
      style={{ animationDelay: `${animationDelay}ms` }}>
        
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 pr-2">
            {post.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </div>

        <p className="text-gray-700 mb-3 line-clamp-3 text-sm">
          {post.text ? post.text.substring(0, 200) + (post.text.length > 200 ? '...' : '') : post.summary}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-400">
          {metaInfo && (
            <span className="line-clamp-1">
              {metaInfo}
            </span>
          )}
          <span className="text-xs text-gray-500">
            {getDomain(post.url)}
          </span>
        </div>

      </div>
    </div>
  );
}
