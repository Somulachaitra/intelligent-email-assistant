import React, { useEffect, useState } from 'react';
import { Mail, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { getToken } from '../utils/token';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      window.location.href = '/dashboard';
      return;
    }
    setLoading(false);
  }, []);

  const handleGoogleLogin = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/auth/google`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-[#8B6914] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#0A0A0F] flex flex-col lg:flex-row overflow-hidden font-sans text-[#2C2C2C] dark:text-white transition-colors duration-300 animate-fade-in">
      {/* Left Side: Warm Cream Editorial Hero */}
      <div className="lg:w-7/12 bg-[#F5F0E8] dark:bg-[#0A0A0F] bg-grain-overlay p-8 lg:p-20 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E8E0D0] dark:border-[#222233]">
        {/* Top Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B6914] flex items-center justify-center shadow-md text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#8B6914] dark:text-[#E6C98F] uppercase font-mono">Intelligent Assistant</span>
              <p className="text-sm font-serif font-bold text-[#2C2C2C] dark:text-white leading-none">Curated Inbox</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Center Editorial Hero Text */}
        <div className="my-16 lg:my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF4E6] dark:bg-[#8B6914]/20 border border-[#E6C98F] dark:border-[#8B6914]/40 text-[#8B6914] dark:text-[#E6C98F] text-xs font-semibold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Executive Productivity</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight leading-[1.15] mb-6">
            Your Inbox, <br />
            <span className="italic font-normal text-[#8B6914] dark:text-[#E6C98F]">Elevated.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C4A32] dark:text-slate-300 leading-relaxed font-sans font-normal max-w-md">
            Transform email chaos into clarity. Summarize conversations, draft tailored replies, and conquer action items with warm, refined intelligence.
          </p>

          <div className="mt-10 pt-8 border-t border-[#E8E0D0] dark:border-[#222233] flex items-center gap-8">
            <div>
              <p className="text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">10x</p>
              <p className="text-xs text-[#6B6B6B] dark:text-slate-400">Faster Triage</p>
            </div>
            <div className="h-8 w-px bg-[#E8E0D0] dark:bg-[#222233]" />
            <div>
              <p className="text-2xl font-serif font-bold text-[#8B6914] dark:text-[#E6C98F]">100%</p>
              <p className="text-xs text-[#6B6B6B] dark:text-slate-400">Privacy First</p>
            </div>
            <div className="h-8 w-px bg-[#E8E0D0] dark:bg-[#222233]" />
            <div>
              <p className="text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">Gemini 2.5</p>
              <p className="text-xs text-[#6B6B6B] dark:text-slate-400">AI Engine</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div className="text-xs text-[#6B6B6B] dark:text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8B6914] dark:text-[#E6C98F]" />
          <span>OAuth 2.0 Direct Access &bull; Encrypted &bull; No passwords saved</span>
        </div>
      </div>

      {/* Right Side: Clean White Sign-In Card with Gold Left Border */}
      <div className="lg:w-5/12 bg-white dark:bg-[#111118] flex items-center justify-center p-8 lg:p-16 relative transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-[#111118] border-l-4 border-l-[#8B6914] border-y border-r border-[#E8E0D0] dark:border-[#222233] rounded-2xl shadow-xl dark:shadow-none p-8 sm:p-10 transition-all duration-300">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-[#6B6B6B] dark:text-slate-400 mt-2 leading-relaxed">
              Sign in with your Google account to access your personalized executive inbox.
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            id="google-signin-btn"
            className="w-full flex items-center justify-center gap-3 bg-[#FAF7F2] dark:bg-[#1A1A24] hover:bg-[#F5F0E8] dark:hover:bg-[#222233] text-[#2C2C2C] dark:text-white font-semibold py-3.5 px-6 rounded-xl border border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914] hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">Continue with Google</span>
            <ArrowRight className="w-4 h-4 text-[#8B6914] dark:text-[#E6C98F] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-auto" />
          </button>

          <div className="mt-8 pt-6 border-t border-[#E8E0D0] dark:border-[#222233] text-center">
            <p className="text-xs text-[#6B6B6B] dark:text-slate-400 leading-relaxed">
              By continuing, you connect your Gmail account securely using Google's official APIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
