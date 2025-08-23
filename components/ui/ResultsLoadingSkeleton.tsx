import React from "react";

export default function ResultsLoadingSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-normal mb-6 text-gray-800 mt-10">
        Searching Substack...
      </h2>
      <div className="space-y-4">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="mb-3 p-6 md:px-4 md:py-3 bg-white rounded-sm shadow-none border opacity-0 animate-fade-up"
            style={{ animationDelay: `${100 + index * 100}ms` }}
          >
            {/* Title skeleton */}
            <div className="h-6 bg-gray-300 rounded-none w-3/4 mb-3 animate-pulse"></div>
            
            {/* Content skeleton - 2 lines */}
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-300 rounded-none w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded-none w-4/5 animate-pulse"></div>
            </div>

            {/* Meta info skeleton */}
            <div className="flex justify-between items-center">
              <div className="h-3 bg-gray-300 rounded-none w-1/4 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded-none w-1/6 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
