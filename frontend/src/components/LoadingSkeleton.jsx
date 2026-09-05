import React from 'react';
import { Mail } from 'lucide-react';

const LoadingSkeleton = ({ type = 'email', count = 5 }) => {
  if (type === 'page') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#8B6914] flex items-center justify-center shadow-md text-white">
            <Mail className="w-7 h-7" />
          </div>
          <div className="w-36 h-2 rounded-full bg-[#E8E0D0] dark:bg-[#222233] overflow-hidden">
            <div className="w-1/2 h-full bg-[#8B6914] animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'email') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] animate-fade-in shadow-xs"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="w-11 h-11 rounded-full shimmer shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex justify-between">
                <div className="h-3.5 w-36 rounded-lg shimmer" />
                <div className="h-3 w-16 rounded-lg shimmer" />
              </div>
              <div className="h-4 w-56 rounded-lg shimmer" />
              <div className="h-3 w-full rounded-lg shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'thread') {
    return (
      <div className="space-y-5 p-6 max-w-4xl mx-auto">
        <div className="h-8 w-2/3 rounded-xl shimmer" />
        <div className="h-4 w-40 rounded-lg shimmer" />
        <div className="p-6 space-y-4 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full shimmer shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-44 rounded-lg shimmer" />
              <div className="h-3 w-28 rounded-lg shimmer" />
            </div>
          </div>
          <div className="space-y-3 pt-4">
            {[100, 92, 85, 96, 75].map((w, i) => (
              <div key={i} className="h-3.5 rounded-lg shimmer" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'analytics') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 space-y-3 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-xs">
            <div className="h-3 w-28 rounded-lg shimmer" />
            <div className="h-10 w-20 rounded-xl shimmer" />
          </div>
        ))}
        <div className="col-span-2 p-6 h-64 shimmer rounded-2xl border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] shadow-xs" />
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
