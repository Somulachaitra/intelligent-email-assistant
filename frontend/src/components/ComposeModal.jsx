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
      {/* Glassmorphism Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0A0A0F] rounded-3xl border border-[#222233] shadow-2xl shadow-[#6C63FF]/20 animate-page-slide flex flex-col max-h-[90vh] overflow-hidden z-10 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222233] bg-[#111118]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#6C63FF]/20 text-[#6C63FF]">
              <Wand2 className="w-5 h-5 text-[#00D4FF]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Compose Email with AI</h2>
              <p className="text-xs text-[#888899] font-mono">// Smart Subject & Grammar Assistance</p>
            </div>
          </div>
          <button
            id="compose-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#161622] text-[#888899] hover:text-white border border-[#222233] hover:border-[#6C63FF]/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto bg-[#0A0A0F]">
          {/* Recipient */}
          <div>
            <label className="text-xs font-bold text-[#888899] uppercase tracking-wider mb-1.5 block font-mono">
              Recipient Email Address
            </label>
            <input
              id="compose-to"
              type="email"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="input text-sm"
            />
          </div>

          {/* Subject Line with AI Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#888899] uppercase tracking-wider block font-mono">
                Subject Line
              </label>
              <button
                id="suggest-subject-btn"
                onClick={handleSuggestSubject}
                disabled={suggestSubject.isPending}
                className="text-xs text-[#00D4FF] hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
              >
                {suggestSubject.isPending ? (
                  <span className="w-3 h-3 border border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
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
              className="input text-sm"
            />
            {/* Subject Suggestions Pills */}
            {subjectSuggestions.length > 0 && (
              <div className="mt-3 space-y-2 animate-fade-in">
                <p className="text-[11px] font-mono text-[#00D4FF] uppercase tracking-wider">// AI Suggested Subjects (click to select):</p>
                {subjectSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setSubject(s); setSubjectSuggestions([]); }}
                    className="w-full text-left text-xs p-3 rounded-xl bg-[#161622] hover:bg-[#1A1A26] text-[#E0E0E6] transition-colors border border-[#222233] hover:border-[#6C63FF]/50 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#6C63FF] shrink-0" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Email Body */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#888899] uppercase tracking-wider block font-mono">
                Message Body
              </label>
              <button
                id="grammar-compose-btn"
                onClick={handleGrammarCheck}
                disabled={grammarCorrect.isPending || !body}
                className="text-xs text-[#A5B4FC] hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
              >
                {grammarCorrect.isPending ? (
                  <span className="w-3 h-3 border border-[#A5B4FC] border-t-transparent rounded-full animate-spin" />
                ) : <CheckCircle className="w-3.5 h-3.5 text-[#00C896]" />}
                <span>Improve Grammar & Tone</span>
              </button>
            </div>
            <textarea
              id="compose-body"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your email here..."
              rows={10}
              className="textarea-glowing"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#222233] bg-[#111118]/80">
          <button id="compose-cancel-btn" onClick={onClose} className="btn-secondary text-xs py-2.5 px-4 font-semibold">
            Cancel
          </button>
          <button
            id="compose-send-btn"
            onClick={handleSend}
            disabled={sendEmail.isPending}
            className="btn-gradient text-xs py-2.5 px-6 font-semibold"
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
