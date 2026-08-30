import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Inbox, Star, Send, FileText, BarChart2, Settings,
  LogOut, Bot, PenSquare, Search, Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials, getAvatarColor } from '../utils/formatters';

const NAV_ITEMS = [
  { to: '/dashboard', icon: Inbox, label: 'Inbox' },
  { to: '/dashboard?filter=starred', icon: Star, label: 'Starred' },
  { to: '/dashboard?filter=sent', icon: Send, label: 'Sent' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/settings', icon: FileText, label: 'Templates' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ onCompose }) => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 h-screen bg-[#0A0A0F] border-r border-[#222233] flex flex-col font-sans relative z-20">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#222233]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#6C63FF]/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-none">INTELLIGENT</h1>
            <p className="text-xs font-semibold text-gradient mt-1 leading-none uppercase tracking-wider">Email Assistant</p>
          </div>
        </div>
      </div>

      {/* Compose Button */}
      <div className="p-4">
        <button
          id="sidebar-compose-btn"
          onClick={onCompose}
          className="w-full btn-gradient justify-center py-3 text-sm font-semibold tracking-wide"
        >
          <PenSquare className="w-4 h-4" />
          <span>Compose</span>
          <Sparkles className="w-3.5 h-3.5 opacity-80" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={label}
            to={to}
            id={`nav-${label.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
               ${isActive
                ? 'bg-[#111118] text-white border border-[#6C63FF]/40 shadow-lg shadow-[#6C63FF]/10'
                : 'text-[#888899] hover:text-white hover:bg-[#111118]/60 hover:border hover:border-[#222233]'}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-[#6C63FF]/20 text-[#00D4FF]' : 'text-[#888899] group-hover:text-white'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] ml-auto shadow-[0_0_8px_#00D4FF]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-[#222233] bg-[#111118]/40">
        {user && (
          <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-[#111118] border border-[#222233]">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-9 h-9 rounded-full ring-2 ring-[#6C63FF]/40 shrink-0"
              />
            ) : (
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(user.name)}`}>
                {getInitials(user.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-[#888899] truncate font-mono">{user.email}</p>
            </div>
          </div>
        )}
        <button
          id="logout-btn"
          onClick={logout}
          className="w-full btn-secondary text-xs py-2.5 justify-center hover:bg-red-950/30 hover:border-red-900/40 hover:text-red-400"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
