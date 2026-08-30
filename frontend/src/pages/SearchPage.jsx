import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import EmailList from '../components/EmailList';
import ComposeModal from '../components/ComposeModal';
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
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F] font-sans antialiased bg-dot-pattern">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#222233] bg-[#0A0A0F]/80 backdrop-blur-xl px-6 py-6">
          <div className="max-w-4xl">
            <h1 className="text-xl font-bold text-white tracking-tight mb-3">AI Search Engine</h1>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888899]" />
                <input
                  id="search-input"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Search by sender, subject, keywords, or natural language query..."
                  className="input pl-11 text-sm bg-[#111118] border-[#222233] focus:border-[#6C63FF]"
                  autoFocus
                />
                {input && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888899] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button id="search-submit-btn" type="submit" className="btn-gradient text-sm px-6 py-3 font-semibold">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
            {query && (
              <p className="text-xs text-[#888899] font-mono mt-3">
                {isLoading ? 'Scanning Gmail API...' : `Found ${data?.messages?.length || 0} matching emails for "${query}"`}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {query ? (
            <div className="max-w-6xl mx-auto py-4">
              <EmailList
                pages={fakePages}
                isLoading={isLoading}
                isFetchingNextPage={false}
                hasNextPage={false}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-[#161622] border border-[#222233] flex items-center justify-center mb-4 shadow-xl">
                <Search className="w-8 h-8 text-[#00D4FF]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Search Your Intelligent Inbox</h3>
              <p className="text-[#888899] text-sm max-w-md">Type a sender name, topic, or keyword above to instantly retrieve messages matching your query.</p>
            </div>
          )}
        </div>
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default SearchPage;
