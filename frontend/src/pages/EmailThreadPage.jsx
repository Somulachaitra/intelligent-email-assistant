import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Archive, Trash2, MailOpen, Mail,
  Reply, ChevronDown, ChevronUp, Sparkles, User,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AISummaryPanel from '../components/AISummaryPanel';
import AIReplyEditor from '../components/AIReplyEditor';
import ActionItemsPanel from '../components/ActionItemsPanel';
import ComposeModal from '../components/ComposeModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useEmail, useToggleStar, useToggleRead, useArchiveEmail, useTrashEmail } from '../hooks/useEmails';
import { extractSenderName, formatEmailDate, getInitials, getAvatarColor } from '../utils/formatters';

const MessageItem = ({ message, isExpanded, onToggle }) => {
  const senderName = extractSenderName(message.from);
  const initials = getInitials(senderName);
  const avatarColor = getAvatarColor(message.from);

  return (
    <div className={`card border-[#222233] bg-[#111118] overflow-hidden transition-all duration-200 ${isExpanded ? 'shadow-xl' : 'cursor-pointer hover:border-[#333348]'}`}>
      {/* Message Header */}
      <div
        className={`flex items-start gap-4 p-5 ${!isExpanded ? 'cursor-pointer' : ''}`}
        onClick={!isExpanded ? onToggle : undefined}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-md ${avatarColor}`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-white text-base tracking-tight">{senderName}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#888899]">{formatEmailDate(message.date)}</span>
              <button onClick={onToggle} className="text-[#888899] hover:text-white p-1">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isExpanded && <p className="text-xs text-[#888899] truncate mt-1">{message.snippet}</p>}
          {isExpanded && (
            <p className="text-xs font-mono text-[#888899] mt-1">To: {message.to}</p>
          )}
        </div>
      </div>

      {/* Message Body */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-[#222233]/60 bg-[#0A0A0F]/40">
          <div className="pt-5 text-sm text-[#E0E0E6] leading-relaxed whitespace-pre-wrap font-sans">
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

  const toggleMessage = (msgId) => {
    setExpandedMessages(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  if (isLoading) return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F]">
      <Sidebar onCompose={() => setShowCompose(true)} />
      <main className="flex-1 overflow-y-auto p-6">
        <LoadingSkeleton type="thread" />
      </main>
    </div>
  );

  if (error || !thread) return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F]">
      <Sidebar onCompose={() => setShowCompose(true)} />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 glass-card max-w-md">
          <p className="text-[#888899] mb-4">Failed to load email thread.</p>
          <button onClick={() => navigate(-1)} className="btn-secondary text-sm mx-auto">
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F] font-sans antialiased bg-dot-pattern">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 flex overflow-hidden">
        {/* Main Conversation Column */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-[#222233]">

          {/* Thread Header */}
          <div className="border-b border-[#222233] bg-[#0A0A0F]/90 backdrop-blur-xl px-6 py-5">
            <div className="flex items-center gap-4 mb-3">
              <button
                id="back-btn"
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl bg-[#161622] text-[#888899] hover:text-white border border-[#222233] hover:border-[#6C63FF]/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 min-w-0">
                {/* Large Bold Sender Name at Top */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">// Conversation with</span>
                  <span className="text-xs font-mono text-[#888899]">({messages.length} messages)</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate mt-0.5">
                  {mainSenderName}
                </h1>
                <p className="text-xs text-[#888899] truncate font-medium mt-1">
                  Subject: {firstMessage?.subject || '(No Subject)'}
                </p>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2.5 flex-wrap pt-2 border-t border-[#222233]/60">
              <button
                id="star-thread-btn"
                onClick={() => latestMessage && toggleStar({ id: latestMessage.id, starred: !latestMessage.isStarred })}
                disabled={isStarring}
                className={`btn-secondary text-xs py-2 px-3 ${latestMessage?.isStarred ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' : ''}`}
              >
                <Star className={`w-3.5 h-3.5 ${latestMessage?.isStarred ? 'fill-amber-400' : ''}`} />
                <span>{latestMessage?.isStarred ? 'Starred' : 'Star'}</span>
              </button>

              <button id="archive-btn" onClick={() => latestMessage && archive(latestMessage.id)} className="btn-secondary text-xs py-2 px-3">
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
                className="btn-secondary text-xs py-2 px-3"
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
                className="btn-gradient text-xs py-2 px-4 ml-auto"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Reply with AI</span>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
          <div className="w-96 shrink-0 bg-[#0A0A0F]/80 backdrop-blur-xl overflow-y-auto p-5 space-y-5">
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
