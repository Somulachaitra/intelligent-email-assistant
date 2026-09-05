import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Inbox, Star, Send, FileText, BarChart2, Settings,
  LogOut, Mail, PenSquare, Search, Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/formatters';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { to: '/dashboard', icon: Inbox, label: 'Inbox', badge: true },
  { to: '/dashboard?filter=starred', icon: Star, label: 'Starred' },
  { to: '/dashboard?filter=sent', icon: Send, label: 'Sent' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/settings', icon: FileText, label: 'Templates' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ onCompose, unreadCount = 12 }) => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 h-screen bg-[#F5F0E8] dark:bg-[#0A0A0F] border-r border-[#E8E0D0] dark:border-[#222233] flex flex-col font-sans relative z-20 transition-colors duration-300">
      {/* Brand Header & Theme Toggle */}
      <div className="p-5 border-b border-[#E8E0D0] dark:border-[#222233] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B6914] flex items-center justify-center shadow-md text-white shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight leading-tight">Elevated Mail</h1>
            <p className="text-[11px] font-semibold text-[#8B6914] dark:text-[#D4AF37] uppercase tracking-wider font-mono">Executive AI</p>
          </div>
        </div>
        <ThemeToggle className="shrink-0" />
      </div>

      {/* Gently Pulsing Compose Button */}
      <div className="p-4">
        <button
          id="sidebar-compose-btn"
          onClick={onCompose}
          className="w-full btn-gradient justify-center py-3 text-sm font-semibold tracking-wide shadow-md animate-pulse-gently"
        >
          <PenSquare className="w-4 h-4" />
          <span>Compose</span>
          <Sparkles className="w-3.5 h-3.5 opacity-90 ml-1" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={label}
            to={to}
            id={`nav-${label.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
               ${isActive
                ? 'bg-white dark:bg-[#111118] text-[#8B6914] dark:text-[#D4AF37] border border-[#E8E0D0] dark:border-[#8B6914]/40 shadow-sm font-semibold'
                : 'text-[#6B6B6B] dark:text-[#888899] hover:text-[#2C2C2C] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#161622] hover:border hover:border-[#E8E0D0]/60 dark:hover:border-[#222233]'}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#D4AF37]' : 'text-[#6B6B6B] dark:text-[#888899] group-hover:text-[#2C2C2C] dark:group-hover:text-white'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{label}</span>
                {badge && unreadCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#8B6914] text-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
                {isActive && !badge && (
                  <span className="w-2 h-2 rounded-full bg-[#8B6914] ml-auto" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-[#E8E0D0] dark:border-[#222233] bg-[#FAF7F2] dark:bg-[#111118]/80">
        {user && (
          <div className="flex items-center gap-3 mb-3 p-2.5 rounded-xl bg-white dark:bg-[#161622] border border-[#E8E0D0] dark:border-[#222233] shadow-sm">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-9 h-9 rounded-full ring-2 ring-[#8B6914]/40 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#8B6914] text-white flex items-center justify-center text-xs font-serif font-bold shrink-0">
                {getInitials(user.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#2C2C2C] dark:text-white truncate">{user.name}</p>
              <p className="text-[11px] text-[#6B6B6B] dark:text-[#888899] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          id="logout-btn"
          onClick={logout}
          className="w-full btn-secondary text-xs py-2.5 justify-center hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-200 dark:hover:border-rose-900/50 hover:text-rose-700 dark:hover:text-rose-400"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
