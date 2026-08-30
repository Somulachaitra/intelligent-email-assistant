import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Circle, Sparkles, AlertCircle } from 'lucide-react';
import {
  formatEmailDate, extractSenderName, getInitials,
  getAvatarColor, truncate, getCategoryStyle,
} from '../utils/formatters';
import { useToggleStar } from '../hooks/useEmails';

const EmailCard = ({ email }) => {
  const navigate = useNavigate();
  const { mutate: toggleStar, isPending: isStarring } = useToggleStar();

  const senderName = extractSenderName(email.from);
  const initials = getInitials(senderName);
  const avatarColor = getAvatarColor(email.from);
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
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    }
    if (cat.includes('work') || cat.includes('business')) {
      return 'bg-[#6C63FF]/15 text-[#A5B4FC] border-[#6C63FF]/30';
    }
    if (cat.includes('personal')) {
      return 'bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]/30';
    }
    if (cat.includes('newsletter') || cat.includes('promotions')) {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
    return 'bg-[#222233] text-[#888899] border-[#333348]';
  };

  return (
    <div
      id={`email-${email.id}`}
      onClick={handleClick}
      className={`card p-4 sm:p-5 cursor-pointer transition-all duration-200 group relative overflow-hidden
        ${isUnread 
          ? 'bg-[#161622] border-l-4 border-l-[#6C63FF] border-y-[#222233] border-r-[#222233] shadow-lg shadow-[#6C63FF]/5' 
          : 'bg-[#111118] border border-[#222233] hover:border-[#333348]'}
        hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6C63FF]/10`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-md ${avatarColor}`}>
          {initials}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-sm truncate ${isUnread ? 'font-bold text-white' : 'font-semibold text-[#CCCCCC]'}`}>
              {senderName}
            </span>
            
            <div className="flex items-center gap-2 shrink-0">
              {email.category && (
                <span className={`badge text-[11px] hidden sm:inline-flex ${getBadgeClass(email.category)}`}>
                  {email.category}
                </span>
              )}
              <span className="text-xs font-mono text-[#888899]">{formatEmailDate(email.date)}</span>
            </div>
          </div>

          <h3 className={`text-sm truncate mb-1 ${isUnread ? 'font-bold text-white' : 'font-medium text-[#E0E0E6]'}`}>
            {email.subject || '(No Subject)'}
          </h3>

          <p className="text-xs text-[#888899] truncate font-normal leading-relaxed">
            {truncate(email.snippet, 90)}
          </p>
        </div>

        {/* Actions & Unread Indicator */}
        <div className="flex flex-col items-center gap-3 shrink-0 ml-1">
          {isUnread && (
            <span className="w-2.5 h-2.5 rounded-full bg-[#6C63FF] shadow-[0_0_10px_#6C63FF]" title="Unread" />
          )}
          <button
            id={`star-${email.id}`}
            onClick={handleStar}
            disabled={isStarring}
            className={`p-1.5 rounded-lg transition-all ${
              email.isStarred
                ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
                : 'text-[#55556A] hover:text-amber-400 hover:bg-[#1A1A26] opacity-0 group-hover:opacity-100'
            }`}
            title={email.isStarred ? 'Unstar' : 'Star'}
          >
            <Star className={`w-4 h-4 ${email.isStarred ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
