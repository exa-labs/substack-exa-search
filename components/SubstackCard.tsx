"use client";

import { ExternalLink } from 'lucide-react';

interface SubstackPost {
  title: string;
  text: string;
  author: string;
  publishedDate: string;
  url: string;
}

export function SubstackCard({ 
  post, 
  animationDelay,
  isWriter = false,
}: { 
  post: SubstackPost;
  animationDelay: number;
  isWriter?: boolean;
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

  // Extract main heading and subheading from text
  const extractHeadings = (text: string) => {
    if (!text) return { heading: '', subheading: '' };
    
    const lines = text.split('\n').filter(line => line.trim());
    let heading = '';
    let subheading = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Look for main heading (# or ##)
      if (!heading && (trimmedLine.startsWith('# ') || trimmedLine.startsWith('## '))) {
        heading = trimmedLine.replace(/^#+\s*/, '').trim();
        // Remove any markdown links like [text](url)
        heading = heading.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        continue;
      }
      
      // Look for subheading (### or ####)
      if (heading && !subheading && (trimmedLine.startsWith('### ') || trimmedLine.startsWith('#### '))) {
        subheading = trimmedLine.replace(/^#+\s*/, '').trim();
        // Remove any markdown links
        subheading = subheading.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        break;
      }
    }
    
    return { heading, subheading };
  };

  const { heading, subheading } = extractHeadings(post.text);

  // Extract writer name from text for writer pages
  const extractWriterName = (text: string) => {
    if (!text) return '';
    
    const lines = text.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Look for "By [Name]" pattern
      const byMatch = trimmedLine.match(/^By\s+(.+?)(?:\s*·|\s*$)/i);
      if (byMatch) {
        return byMatch[1].trim();
      }
      
      // Look for lines that might contain author info after subscriber count
      const subscriberMatch = trimmedLine.match(/Over\s+[\d,]+\s+subscribers.*?By\s+(.+?)(?:\s*·|\s*$)/i);
      if (subscriberMatch) {
        return subscriberMatch[1].trim();
      }
    }
    
    return '';
  };

  const writerName = isWriter ? extractWriterName(post.text) : '';

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

        {isWriter ? (
          writerName ? (
            <p className="text-gray-600 text-sm mb-3 line-clamp-1">
              {writerName}
            </p>
          ) : (
            <p className="text-gray-700 mb-3 line-clamp-3 text-sm">
              {post.text ? post.text.substring(0, 200) + (post.text.length > 200 ? '...' : '') : 'No description available'}
            </p>
          )
        ) : (
          subheading ? (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {subheading}
            </p>
          ) : (
            <p className="text-gray-700 mb-3 line-clamp-3 text-sm">
              {post.text ? post.text.substring(0, 200) + (post.text.length > 200 ? '...' : '') : 'No description available'}
            </p>
          )
        )}

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
