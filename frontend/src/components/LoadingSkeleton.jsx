import React from 'react';
import { Bot } from 'lucide-react';

const LoadingSkeleton = ({ type = 'email', count = 5 }) => {
  if (type === 'page') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center animate-pulse-glow">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="w-36 h-2 rounded-full bg-[#222233] overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'email') {
    return (
      <div className="space-y-3 p-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-[#111118] border border-[#222233] animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
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
        <div className="card p-6 space-y-4 border border-[#222233] bg-[#111118]">
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
          <div key={i} className="card p-6 space-y-3 border border-[#222233] bg-[#111118]">
            <div className="h-3 w-28 rounded-lg shimmer" />
            <div className="h-10 w-20 rounded-xl shimmer" />
          </div>
        ))}
        <div className="col-span-2 card p-6 h-64 shimmer rounded-2xl border border-[#222233]" />
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
