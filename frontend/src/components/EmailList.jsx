import React from 'react';
import EmailCard from './EmailCard';
import LoadingSkeleton from './LoadingSkeleton';
import { Inbox, Sparkles } from 'lucide-react';

const EmailList = ({ pages, isLoading, isFetchingNextPage, hasNextPage, onLoadMore }) => {
  if (isLoading) return <LoadingSkeleton type="email" count={8} />;

  const allMessages = pages?.flatMap(page => page.messages) ?? [];

  if (allMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-[#161622] border border-[#222233] flex items-center justify-center mb-4 shadow-xl">
          <Inbox className="w-8 h-8 text-[#888899]" />
        </div>
        <h3 className="text-white font-bold text-lg mb-1">Your Inbox is Clear</h3>
        <p className="text-[#888899] text-sm max-w-sm">No emails found in this category. Sit back and enjoy your productive day!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {allMessages.map((email, idx) => (
        <div
          key={email.id}
          className="animate-fade-in"
          style={{ animationDelay: `${Math.min(idx * 50, 500)}ms` }}
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
            className="btn-secondary text-sm px-6 py-3 font-semibold"
          >
            {isFetchingNextPage ? (
              <>
                <span className="w-4 h-4 border-2 border-[#888899] border-t-[#6C63FF] rounded-full animate-spin" />
                <span>Loading emails...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
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
