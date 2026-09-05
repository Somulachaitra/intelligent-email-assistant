import React, { useState } from 'react';
import { X, Send, Sparkles, Wand2, CheckCircle } from 'lucide-react';
import { useSendEmail } from '../hooks/useEmails';
import { useSuggestSubject, useGrammarCorrect } from '../hooks/useAI';
import toast from 'react-hot-toast';

const ComposeModal = ({ onClose, initialTo = '', initialSubject = '', initialBody = '' }) => {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [subjectSuggestions, setSubjectSuggestions] = useState([]);

  const sendEmail = useSendEmail();
  const suggestSubject = useSuggestSubject();
  const grammarCorrect = useGrammarCorrect();

  const handleSuggestSubject = async () => {
    if (!body.trim()) return toast.error('Write your email body first to generate suggestions');
    try {
      const result = await suggestSubject.mutateAsync({ emailBody: body });
      setSubjectSuggestions(result.subjects || []);
    } catch { }
  };

  const handleGrammarCheck = async () => {
    if (!body.trim()) return;
    try {
      const result = await grammarCorrect.mutateAsync({ emailBody: body });
      setBody(result.corrected);
      toast.success('Grammar & tone improved!');
    } catch { }
  };

  const handleSend = async () => {
    if (!to || !subject || !body) return toast.error('Please complete all required fields');
    try {
      await sendEmail.mutateAsync({ to, subject, body });
      onClose();
    } catch { }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C2C2C]/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111118] rounded-3xl border border-[#E8E0D0] dark:border-[#222233] shadow-2xl animate-page-slide flex flex-col max-h-[90vh] overflow-hidden z-10 font-sans transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#E6C98F]">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight">Compose Executive Email</h2>
              <p className="text-xs text-[#6B6B6B] dark:text-slate-400">Smart AI Subject & Grammar Assistant</p>
            </div>
          </div>
          <button
            id="compose-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] text-[#6B6B6B] dark:text-slate-300 hover:text-[#2C2C2C] dark:hover:text-white border border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914]/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto bg-[#FAF7F2] dark:bg-[#111118]">
          {/* Recipient */}
          <div>
            <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-wider mb-1.5 block">
              Recipient Email Address
            </label>
            <input
              id="compose-to"
              type="email"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="input text-sm bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white placeholder-[#6B6B6B] dark:placeholder-slate-400"
            />
          </div>

          {/* Subject Line with AI Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-wider block">
                Subject Line
              </label>
              <button
                id="suggest-subject-btn"
                onClick={handleSuggestSubject}
                disabled={suggestSubject.isPending}
                className="text-xs text-[#8B6914] dark:text-[#E6C98F] hover:text-[#72540E] flex items-center gap-1.5 font-semibold transition-colors"
              >
                {suggestSubject.isPending ? (
                  <span className="w-3 h-3 border border-[#8B6914] border-t-transparent rounded-full animate-spin" />
                ) : <Sparkles className="w-3.5 h-3.5" />}
                <span>AI Subject Generator</span>
              </button>
            </div>
            <input
              id="compose-subject"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="input text-sm bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white placeholder-[#6B6B6B] dark:placeholder-slate-400"
            />
            {/* Subject Suggestions Pills */}
            {subjectSuggestions.length > 0 && (
              <div className="mt-3 space-y-2 animate-fade-in">
                <p className="text-[11px] font-serif font-bold text-[#8B6914] dark:text-[#E6C98F] uppercase tracking-wider">AI Suggested Subjects (click to select):</p>
                {subjectSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setSubject(s); setSubjectSuggestions([]); }}
                    className="w-full text-left text-xs p-3 rounded-xl bg-white dark:bg-[#1A1A24] hover:bg-[#FAF4E6] dark:hover:bg-[#8B6914]/20 text-[#2C2C2C] dark:text-slate-200 transition-colors border border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914]/50 flex items-center gap-2 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8B6914] dark:text-[#E6C98F] shrink-0" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Email Body */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-wider block">
                Message Body
              </label>
              <button
                id="grammar-compose-btn"
                onClick={handleGrammarCheck}
                disabled={grammarCorrect.isPending || !body}
                className="text-xs text-[#5C4A32] dark:text-slate-300 hover:text-[#8B6914] dark:hover:text-[#E6C98F] flex items-center gap-1.5 font-semibold transition-colors"
              >
                {grammarCorrect.isPending ? (
                  <span className="w-3 h-3 border border-[#8B6914] border-t-transparent rounded-full animate-spin" />
                ) : <CheckCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />}
                <span>Improve Grammar & Tone</span>
              </button>
            </div>
            <textarea
              id="compose-body"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your email here..."
              rows={9}
              className="textarea-glowing bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white placeholder-[#6B6B6B] dark:placeholder-slate-400"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118]">
          <button id="compose-cancel-btn" onClick={onClose} className="btn-secondary text-xs py-2.5 px-4 font-semibold dark:bg-[#1A1A24] dark:text-slate-300 dark:border-[#222233]">
            Cancel
          </button>
          <button
            id="compose-send-btn"
            onClick={handleSend}
            disabled={sendEmail.isPending}
            className="btn-gradient text-xs py-2.5 px-6 font-semibold shadow-xs"
          >
            {sendEmail.isPending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : <Send className="w-4 h-4" />}
            <span>Send Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
