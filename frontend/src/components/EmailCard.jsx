import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import {
  formatEmailDate, extractSenderName, getInitials,
  truncate,
} from '../utils/formatters';
import { useToggleStar } from '../hooks/useEmails';

const EmailCard = ({ email }) => {
  const navigate = useNavigate();
  const { mutate: toggleStar, isPending: isStarring } = useToggleStar();

  const senderName = extractSenderName(email.from);
  const initials = getInitials(senderName);
  const isUnread = email.isUnread;

  const handleClick = () => {
    navigate(`/email/${email.threadId || email.id}?messageId=${email.id}`);
  };

  const handleStar = (e) => {
    e.stopPropagation();
    toggleStar({ id: email.id, starred: !email.isStarred });
  };

  // Generate badge style based on category / priority
  const getBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('priority') || cat.includes('important')) {
      return 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/40';
    }
    if (cat.includes('work') || cat.includes('business')) {
      return 'bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#E6C98F] border-[#E6C98F] dark:border-[#8B6914]/40';
    }
    if (cat.includes('personal')) {
      return 'bg-[#F7F5F2] dark:bg-[#222233] text-[#5C4A32] dark:text-slate-300 border-[#D6C8B7] dark:border-slate-700';
    }
    if (cat.includes('newsletter') || cat.includes('promotions')) {
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40';
    }
    return 'bg-[#FAF7F2] dark:bg-[#1A1A24] text-[#6B6B6B] dark:text-slate-400 border-[#E8E0D0] dark:border-[#222233]';
  };

  const fullDateTooltip = email.date ? new Date(email.date).toLocaleString() : '';

  return (
    <div
      id={`email-${email.id}`}
      onClick={handleClick}
      className={`p-4 sm:p-5 cursor-pointer transition-all duration-200 group relative overflow-hidden rounded-2xl
        ${isUnread 
          ? 'bg-white dark:bg-[#111118] border-l-4 border-l-[#8B6914] border-y border-r border-[#E8E0D0] dark:border-[#222233] shadow-md dark:shadow-none' 
          : 'bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914]/40 dark:hover:border-[#8B6914]/60 hover:shadow-md dark:hover:shadow-none'}
        hover:-translate-y-0.5`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar with warm gold background */}
        <div className="w-11 h-11 rounded-full bg-[#8B6914] text-white flex items-center justify-center text-xs font-serif font-bold shrink-0 shadow-xs border border-[#8B6914]/30">
          {initials}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 truncate">
              <span className={`text-sm truncate font-serif ${isUnread ? 'font-bold text-[#2C2C2C] dark:text-white' : 'font-semibold text-[#5C4A32] dark:text-slate-300'}`}>
                {senderName}
              </span>
              {isUnread && (
                <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded bg-[#8B6914] text-white shrink-0">
                  NEW
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              {email.category && (
                <span className={`badge text-[11px] hidden sm:inline-flex ${getBadgeClass(email.category)}`}>
                  {email.category}
                </span>
              )}
              <span className="text-xs font-sans text-[#6B6B6B] dark:text-slate-400 cursor-help" title={fullDateTooltip}>
                {formatEmailDate(email.date)}
              </span>
            </div>
          </div>

          <h3 className={`text-sm truncate mb-1 ${isUnread ? 'font-bold text-[#2C2C2C] dark:text-white font-serif' : 'font-medium text-[#2C2C2C] dark:text-slate-200'}`}>
            {email.subject || '(No Subject)'}
          </h3>

          <p className="text-xs text-[#6B6B6B] dark:text-slate-400 truncate font-normal leading-relaxed">
            {truncate(email.snippet, 95)}
          </p>
        </div>

        {/* Actions & Unread Indicator */}
        <div className="flex flex-col items-center gap-3 shrink-0 ml-1">
          {isUnread && (
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B6914]" title="Unread email" />
          )}
          <button
            id={`star-${email.id}`}
            onClick={handleStar}
            disabled={isStarring}
            className={`p-1.5 rounded-lg transition-all ${
              email.isStarred
                ? 'text-[#8B6914] dark:text-[#E6C98F] bg-[#FAF4E6] dark:bg-[#8B6914]/20 border border-[#E6C98F] dark:border-[#8B6914]/40'
                : 'text-[#A3A3A3] dark:text-slate-500 hover:text-[#8B6914] dark:hover:text-[#E6C98F] hover:bg-[#FAF7F2] dark:hover:bg-[#222233] opacity-0 group-hover:opacity-100'
            }`}
            title={email.isStarred ? 'Unstar' : 'Star'}
          >
            <Star className={`w-4 h-4 ${email.isStarred ? 'fill-[#8B6914] dark:fill-[#E6C98F]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
