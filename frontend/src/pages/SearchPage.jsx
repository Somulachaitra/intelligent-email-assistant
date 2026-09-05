import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import EmailList from '../components/EmailList';
import ComposeModal from '../components/ComposeModal';
import ThemeToggle from '../components/ThemeToggle';
import { useSearchEmails } from '../hooks/useEmails';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCompose, setShowCompose] = useState(false);
  const [input, setInput] = useState(searchParams.get('q') || '');

  const query = searchParams.get('q') || '';
  const { data, isLoading } = useSearchEmails(query);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setSearchParams({ q: input.trim() });
  };

  const handleClear = () => {
    setInput('');
    setSearchParams({});
  };

  const fakePages = data ? [{ messages: data.messages, nextPageToken: null }] : undefined;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F0E8] dark:bg-[#0A0A0F] font-sans antialiased bg-dot-pattern transition-colors duration-300 animate-fade-in">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#E8E0D0] dark:border-[#222233] bg-white/90 dark:bg-[#111118]/90 backdrop-blur-xl px-6 py-6 shadow-xs transition-colors duration-300">
          <div className="max-w-4xl flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight mb-3">AI Search Engine</h1>
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B] dark:text-slate-400" />
                  <input
                    id="search-input"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Search by sender, subject, keywords, or natural language query..."
                    className="input pl-11 text-sm bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white placeholder-[#6B6B6B] dark:placeholder-slate-400 focus:border-[#8B6914] dark:focus:border-[#8B6914]"
                    autoFocus
                  />
                  {input && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] dark:text-slate-400 hover:text-[#2C2C2C] dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button id="search-submit-btn" type="submit" className="btn-gradient text-sm px-6 py-3 font-semibold shadow-xs">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </form>
              {query && (
                <p className="text-xs text-[#6B6B6B] dark:text-slate-400 font-mono mt-3">
                  {isLoading ? 'Scanning Gmail API...' : `Found ${data?.messages?.length || 0} matching emails for "${query}"`}
                </p>
              )}
            </div>

            <div className="shrink-0 mt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {query ? (
            <div className="max-w-6xl mx-auto py-6">
              <EmailList
                pages={fakePages}
                isLoading={isLoading}
                isFetchingNextPage={false}
                hasNextPage={false}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] flex items-center justify-center mb-4 shadow-sm">
                <Search className="w-8 h-8 text-[#8B6914] dark:text-[#E6C98F]" />
              </div>
              <h3 className="text-[#2C2C2C] dark:text-white font-serif font-bold text-xl mb-1">Search Your Intelligent Inbox</h3>
              <p className="text-[#6B6B6B] dark:text-slate-400 text-sm max-w-md font-sans leading-relaxed">Type a sender name, topic, or keyword above to instantly retrieve messages matching your query.</p>
            </div>
          )}
        </div>
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default SearchPage;
