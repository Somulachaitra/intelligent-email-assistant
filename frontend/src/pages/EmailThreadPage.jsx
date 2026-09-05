import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Archive, Trash2, MailOpen, Mail,
  Reply, ChevronDown, ChevronUp, Command,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AISummaryPanel from '../components/AISummaryPanel';
import AIReplyEditor from '../components/AIReplyEditor';
import ActionItemsPanel from '../components/ActionItemsPanel';
import ComposeModal from '../components/ComposeModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ThemeToggle from '../components/ThemeToggle';
import { useEmail, useToggleStar, useToggleRead, useArchiveEmail, useTrashEmail } from '../hooks/useEmails';
import { extractSenderName, formatEmailDate, getInitials } from '../utils/formatters';

const MessageItem = ({ message, isExpanded, onToggle }) => {
  const senderName = extractSenderName(message.from);
  const initials = getInitials(senderName);
  const fullDateTooltip = message.date ? new Date(message.date).toLocaleString() : '';

  return (
    <div className={`bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] rounded-2xl overflow-hidden transition-all duration-200 ${isExpanded ? 'shadow-md dark:shadow-none' : 'cursor-pointer hover:border-[#8B6914]/40'}`}>
      {/* Message Header */}
      <div
        className={`flex items-start gap-4 p-6 ${!isExpanded ? 'cursor-pointer' : ''}`}
        onClick={!isExpanded ? onToggle : undefined}
      >
        <div className="w-11 h-11 rounded-full bg-[#8B6914] text-white border border-[#8B6914]/30 flex items-center justify-center text-xs font-serif font-bold shrink-0 shadow-xs">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-serif font-bold text-[#2C2C2C] dark:text-white text-lg tracking-tight">{senderName}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans text-[#6B6B6B] dark:text-slate-400 cursor-help" title={fullDateTooltip}>
                {formatEmailDate(message.date)}
              </span>
              <button onClick={onToggle} className="text-[#6B6B6B] dark:text-slate-400 hover:text-[#2C2C2C] dark:hover:text-white p-1">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isExpanded && <p className="text-xs text-[#6B6B6B] dark:text-slate-400 truncate mt-1">{message.snippet}</p>}
          {isExpanded && (
            <p className="text-xs font-sans text-[#6B6B6B] dark:text-slate-400 mt-1">To: {message.to}</p>
          )}
        </div>
      </div>

      {/* Message Body */}
      {isExpanded && (
        <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118]">
          <div className="pt-4 text-sm sm:text-base text-[#2C2C2C] dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {message.body || message.snippet}
          </div>
        </div>
      )}
    </div>
  );
};

const EmailThreadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReply, setShowReply] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState(new Set());

  const { data: thread, isLoading, error } = useEmail(id, 'thread');
  const { mutate: toggleStar, isPending: isStarring } = useToggleStar();
  const { mutate: toggleRead } = useToggleRead();
  const { mutate: archive } = useArchiveEmail();
  const { mutate: trash } = useTrashEmail();

  const messages = thread?.messages || [];
  const latestMessage = messages[messages.length - 1];
  const firstMessage = messages[0];
  const mainSenderName = latestMessage ? extractSenderName(latestMessage.from) : 'Sender';

  // Keyboard shortcuts handler: 'R' to reply, 'S' to star
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      const isInput = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      );
      if (isInput) return;

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setShowReply(prev => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        if (latestMessage) {
          e.preventDefault();
          toggleStar({ id: latestMessage.id, starred: !latestMessage.isStarred });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [latestMessage, toggleStar]);

  const toggleMessage = (msgId) => {
    setExpandedMessages(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  if (isLoading) return (
    <div className="flex h-screen overflow-hidden bg-[#F5F0E8] dark:bg-[#0A0A0F]">
      <Sidebar onCompose={() => setShowCompose(true)} />
      <main className="flex-1 overflow-y-auto p-6">
        <LoadingSkeleton type="thread" />
      </main>
    </div>
  );

  if (error || !thread) return (
    <div className="flex h-screen overflow-hidden bg-[#F5F0E8] dark:bg-[#0A0A0F]">
      <Sidebar onCompose={() => setShowCompose(true)} />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] rounded-2xl max-w-md shadow-sm">
          <p className="text-[#6B6B6B] dark:text-slate-400 mb-4">Failed to load email thread.</p>
          <button onClick={() => navigate(-1)} className="btn-secondary text-sm mx-auto dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233]">
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F0E8] dark:bg-[#0A0A0F] font-sans antialiased bg-dot-pattern transition-colors duration-300 animate-fade-in">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 flex overflow-hidden">
        {/* Main Conversation Column */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-[#E8E0D0] dark:border-[#222233]">

          {/* Thread Header */}
          <div className="border-b border-[#E8E0D0] dark:border-[#222233] bg-white/90 dark:bg-[#111118]/90 backdrop-blur-xl px-6 sm:px-10 py-6 transition-colors duration-300">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4 min-w-0">
                <button
                  id="back-btn"
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] text-[#6B6B6B] dark:text-slate-300 hover:text-[#2C2C2C] dark:hover:text-white border border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914]/40 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-[#8B6914] dark:text-[#E6C98F] uppercase tracking-wider">Conversation with</span>
                    <span className="text-xs text-[#6B6B6B] dark:text-slate-400">({messages.length} messages)</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight truncate mt-0.5">
                    {mainSenderName}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 truncate font-medium mt-1">
                    Subject: {firstMessage?.subject || '(No Subject)'}
                  </p>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="shrink-0">
                <ThemeToggle />
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2.5 flex-wrap pt-3 border-t border-[#E8E0D0] dark:border-[#222233]">
              <button
                id="star-thread-btn"
                onClick={() => latestMessage && toggleStar({ id: latestMessage.id, starred: !latestMessage.isStarred })}
                disabled={isStarring}
                className={`btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233] ${latestMessage?.isStarred ? 'text-[#8B6914] dark:text-[#E6C98F] border-[#E6C98F] dark:border-[#8B6914]/40 bg-[#FAF4E6] dark:bg-[#8B6914]/20' : ''}`}
                title="Press S to star"
              >
                <Star className={`w-3.5 h-3.5 ${latestMessage?.isStarred ? 'fill-[#8B6914] dark:fill-[#E6C98F]' : ''}`} />
                <span>{latestMessage?.isStarred ? 'Starred' : 'Star (S)'}</span>
              </button>

              <button id="archive-btn" onClick={() => latestMessage && archive(latestMessage.id)} className="btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233]">
                <Archive className="w-3.5 h-3.5" />
                <span>Archive</span>
              </button>

              <button id="trash-btn" onClick={() => latestMessage && trash(latestMessage.id)} className="btn-danger text-xs py-2 px-3">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <button
                id="mark-read-btn"
                onClick={() => latestMessage && toggleRead({ id: latestMessage.id, read: latestMessage.isUnread })}
                className="btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233]"
              >
                {latestMessage?.isUnread ? (
                  <><MailOpen className="w-3.5 h-3.5" /><span>Mark read</span></>
                ) : (
                  <><Mail className="w-3.5 h-3.5" /><span>Mark unread</span></>
                )}
              </button>

              <button
                id="reply-btn"
                onClick={() => setShowReply(r => !r)}
                className="btn-gradient text-xs py-2 px-4 ml-auto shadow-sm font-semibold animate-pulse-gently"
                title="Press R to reply"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Reply with AI (R)</span>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 max-w-4xl mx-auto w-full">
            {messages.map((msg, idx) => (
              <MessageItem
                key={msg.id}
                message={msg}
                isExpanded={idx === messages.length - 1 || expandedMessages.has(msg.id)}
                onToggle={() => toggleMessage(msg.id)}
              />
            ))}
          </div>
        </div>

        {/* AI Assistant Sidebar Panel */}
        {latestMessage && (
          <div className="w-96 shrink-0 bg-[#FAF7F2]/90 dark:bg-[#111118]/90 backdrop-blur-xl border-l border-[#E8E0D0] dark:border-[#222233] border-l-[#8B6914]/40 overflow-y-auto p-6 space-y-6 transition-colors duration-300">
            <AISummaryPanel email={latestMessage} />
            <ActionItemsPanel email={latestMessage} />
            {showReply && (
              <AIReplyEditor
                email={latestMessage}
                onClose={() => setShowReply(false)}
              />
            )}
          </div>
        )}
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default EmailThreadPage;
