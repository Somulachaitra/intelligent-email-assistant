import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border border-[#E8E0D0] dark:border-[#222233] hover:scale-110 transition-all ${className}`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
