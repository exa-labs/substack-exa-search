import React from "react";

export default function ResultsLoadingSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-normal mb-6 text-gray-800 mt-10">
        Searching Substack...
      </h2>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`py-6 px-4 bg-secondary-faint rounded-sm border opacity-0 animate-fade-up`}
          style={{ animationDelay: `${100 + index * 100}ms` }}
        >
          {/* Title skeleton */}
          <div className="h-6 bg-secondary-accent rounded-none w-3/4 mb-4 animate-pulse"></div>
          
          {/* Content skeleton - 3 lines */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-secondary-accent rounded-none w-full animate-pulse"></div>
            <div className="h-4 bg-secondary-accent rounded-none w-5/6 animate-pulse"></div>
            <div className="h-4 bg-secondary-accent rounded-none w-2/3 animate-pulse"></div>
          </div>

          {/* Meta info skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-3 bg-secondary-accent rounded-none w-1/4 animate-pulse"></div>
            <div className="h-3 bg-secondary-accent rounded-none w-1/6 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
