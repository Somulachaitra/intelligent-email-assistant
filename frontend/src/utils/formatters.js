import { formatDistanceToNow, format, parseISO, isValid } from 'date-fns';

/**
 * Formats an email date string into a relative or absolute format
 */
export const formatEmailDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (!isValid(date)) return dateStr;
    const now = new Date();
    const diffHours = (now - date) / (1000 * 60 * 60);
    if (diffHours < 24) return formatDistanceToNow(date, { addSuffix: true });
    if (diffHours < 24 * 7) return format(date, 'EEE, MMM d');
    return format(date, 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
};

/**
 * Extracts the display name from an email "From" header
 * e.g. "John Doe <john@example.com>" → "John Doe"
 */
export const extractSenderName = (from) => {
  if (!from) return 'Unknown';
  const match = from.match(/^([^<]+)\s*</);
  if (match) return match[1].trim();
  const emailMatch = from.match(/([^@]+)@/);
  if (emailMatch) return emailMatch[1].replace(/[._]/g, ' ');
  return from.split('@')[0] || from;
};

/**
 * Extracts the email address from a "From" header
 */
export const extractEmail = (from) => {
  if (!from) return '';
  const match = from.match(/<([^>]+)>/);
  return match ? match[1] : from;
};

/**
 * Generates initials avatar text from a name or email
 */
export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Generates a deterministic background color from a string
 */
const AVATAR_COLORS = [
  'bg-violet-600', 'bg-blue-600', 'bg-teal-600', 'bg-green-600',
  'bg-orange-600', 'bg-pink-600', 'bg-red-600', 'bg-indigo-600',
];
export const getAvatarColor = (str) => {
  if (!str) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

/**
 * Truncates text to a max length
 */
export const truncate = (str, max = 100) => {
  if (!str) return '';
  return str.length <= max ? str : str.slice(0, max) + '…';
};

/**
 * Category badge styling
 */
export const getCategoryStyle = (category) => {
  const styles = {
    Work: 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
    Personal: 'bg-violet-900/60 text-violet-300 border border-violet-700/50',
    Finance: 'bg-green-900/60 text-green-300 border border-green-700/50',
    Newsletter: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
    Spam: 'bg-red-900/60 text-red-300 border border-red-700/50',
    Social: 'bg-pink-900/60 text-pink-300 border border-pink-700/50',
    Other: 'bg-dark-700 text-dark-300 border border-dark-600',
  };
  return styles[category] || styles.Other;
};

/**
 * Priority badge styling
 */
export const getPriorityStyle = (priority) => {
  const styles = {
    high: 'text-red-400',
    medium: 'text-amber-400',
    low: 'text-dark-400',
  };
  return styles[priority] || styles.low;
};
