import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/token';

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
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="bg-[#111118] p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-[#222233]">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✉️</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          YOUR INBOX.
        </h1>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] bg-clip-text text-transparent mb-4">
          SUPERCHARGED.
        </h2>
        <p className="text-[#888899] mb-8">
          Sign in with Google to access your intelligent inbox
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <p className="text-[#888899] text-xs mt-6">
          We use Google OAuth 2.0. Your password is never shared.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
