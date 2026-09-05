import React from 'react';
import EmailCard from './EmailCard';
import LoadingSkeleton from './LoadingSkeleton';
import { Inbox, Sparkles, CheckCircle2 } from 'lucide-react';

const EmailList = ({ pages, isLoading, isFetchingNextPage, hasNextPage, onLoadMore }) => {
  if (isLoading) return <LoadingSkeleton type="email" count={8} />;

  const allMessages = pages?.flatMap(page => page.messages) ?? [];

  if (allMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] flex items-center justify-center mb-5 shadow-md relative group">
          <div className="absolute inset-0 bg-[#8B6914]/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <Inbox className="w-10 h-10 text-[#8B6914] dark:text-[#E6C98F] relative z-10" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#E6C98F] text-xs font-semibold mb-3 border border-[#E6C98F] dark:border-[#8B6914]/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Zero Inbox Achieved</span>
        </div>
        <h3 className="text-[#2C2C2C] dark:text-white font-serif font-bold text-2xl mb-2 tracking-tight">Your Inbox is Clear</h3>
        <p className="text-[#6B6B6B] dark:text-slate-400 text-sm max-w-md font-sans leading-relaxed">
          No emails found in this view. Enjoy your uninterrupted focus time and curated inbox experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {allMessages.map((email, idx) => (
        <div
          key={email.id}
          className="animate-fade-in"
          style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
        >
          <EmailCard email={email} />
        </div>
      ))}

      {hasNextPage && (
        <div className="pt-6 pb-4 flex justify-center">
          <button
            id="load-more-btn"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="btn-secondary text-sm px-6 py-3 font-semibold shadow-xs dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233] dark:hover:bg-[#222233]"
          >
            {isFetchingNextPage ? (
              <>
                <span className="w-4 h-4 border-2 border-[#6B6B6B] border-t-[#8B6914] rounded-full animate-spin" />
                <span>Loading emails...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#8B6914] dark:text-[#E6C98F]" />
                <span>Load More Emails</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailList;
