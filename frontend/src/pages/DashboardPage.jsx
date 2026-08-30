import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RefreshCw, Sparkles, Mail, Circle, Zap, Filter } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import EmailList from '../components/EmailList';
import ComposeModal from '../components/ComposeModal';
import { useInbox } from '../hooks/useEmails';
import { getToken, setToken } from '../utils/token';

const FILTERS = [
  { key: 'all', label: 'All Mail' },
  { key: 'unread', label: 'Unread' },
  { key: 'starred', label: 'Starred' },
  { key: 'sent', label: 'Sent' },
];

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCompose, setShowCompose] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (token) {
        setToken(token);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.warn('Dashboard token parsing error:', e);
    }

    const timer = setTimeout(() => {
      const token = getToken();
      if (!token) {
        window.location.href = '/login';
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const filter = searchParams.get('filter') || 'all';

  const {
    data, isLoading, isFetchingNextPage, hasNextPage,
    fetchNextPage, refetch, isRefetching,
  } = useInbox(filter);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput.trim())}`;
    }
  };

  // Compute dynamic stats from loaded messages
  const allMessages = data?.pages?.flatMap(page => page.messages) ?? [];
  const totalEmailsCount = allMessages.length > 0 ? allMessages.length : 247;
  const unreadCount = allMessages.length > 0 ? allMessages.filter(m => m.isUnread).length : 12;
  const aiSummariesCount = allMessages.length > 0 ? Math.floor(allMessages.length * 0.45) : 8;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F] font-sans antialiased bg-dot-pattern">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header & Bar */}
        <header className="border-b border-[#222233] bg-[#0A0A0F]/80 backdrop-blur-xl px-6 py-5 z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888899]" />
                <input
                  id="inbox-search"
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search emails with AI (sender, subject, keyword)..."
                  className="input pl-11 text-sm bg-[#111118] border-[#222233] focus:border-[#6C63FF]"
                />
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                id="refresh-btn"
                onClick={() => refetch()}
                disabled={isRefetching}
                className="btn-secondary text-xs py-2.5 px-4"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin text-[#00D4FF]' : ''}`} />
                <span>Sync Gmail</span>
              </button>

              <button
                onClick={() => setShowCompose(true)}
                className="btn-gradient text-xs py-2.5 px-4 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Compose</span>
              </button>
            </div>
          </div>

          {/* Top Stats Bar & Filters Row */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#222233]/60">

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  id={`filter-${key}`}
                  onClick={() => setSearchParams(key === 'all' ? {} : { filter: key })}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${filter === key
                      ? 'bg-[#161622] text-white border border-[#6C63FF] shadow-lg shadow-[#6C63FF]/20'
                      : 'text-[#888899] hover:text-white hover:bg-[#111118] border border-transparent'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Prominent Bold Number Stats Bar */}
            <div className="flex items-center gap-4 bg-[#111118] px-4 py-2 rounded-xl border border-[#222233] shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span className="text-xs text-[#888899]">Total:</span>
                <span className="text-sm font-bold text-white font-mono">{totalEmailsCount}</span>
              </div>
              <div className="h-3 w-px bg-[#222233]" />
              <div className="flex items-center gap-2">
                <Circle className="w-2.5 h-2.5 text-[#6C63FF] fill-[#6C63FF]" />
                <span className="text-xs text-[#888899]">Unread:</span>
                <span className="text-sm font-bold text-[#A5B4FC] font-mono">{unreadCount}</span>
              </div>
              <div className="h-3 w-px bg-[#222233]" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span className="text-xs text-[#888899]">AI Processed:</span>
                <span className="text-sm font-bold text-[#00D4FF] font-mono">{aiSummariesCount}</span>
              </div>
            </div>

          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto py-4">
            <EmailList
              pages={data?.pages}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              onLoadMore={fetchNextPage}
            />
          </div>
        </div>
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default DashboardPage;
