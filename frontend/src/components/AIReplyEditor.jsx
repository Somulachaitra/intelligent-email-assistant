import React, { useState } from 'react';
import { Send, Sparkles, Wand2, CheckCircle, RefreshCw } from 'lucide-react';
import { useGenerateReply, useToneReply, useGrammarCorrect } from '../hooks/useAI';
import { useReplyEmail } from '../hooks/useEmails';

const TONES = [
  { key: 'professional', label: 'Professional' },
  { key: 'friendly', label: 'Friendly' },
  { key: 'formal', label: 'Formal' },
  { key: 'concise', label: 'Concise' },
];

const AIReplyEditor = ({ email, onClose }) => {
  const [tone, setTone] = useState('professional');
  const [draft, setDraft] = useState('');
  const [grammarChecked, setGrammarChecked] = useState(false);

  const generateReply = useGenerateReply();
  const toneReply = useToneReply();
  const grammarCorrect = useGrammarCorrect();
  const sendReply = useReplyEmail(email.id);

  const handleGenerateReply = async () => {
    try {
      const result = await toneReply.mutateAsync({
        emailBody: email.body,
        subject: email.subject,
        senderName: email.from,
        tone,
      });
      setDraft(result.reply);
      setGrammarChecked(false);
    } catch { }
  };

  const handleGrammarCheck = async () => {
    if (!draft) return;
    try {
      const result = await grammarCorrect.mutateAsync({ emailBody: draft });
      setDraft(result.corrected);
      setGrammarChecked(true);
    } catch { }
  };

  const handleSend = async () => {
    if (!draft.trim()) return;
    try {
      await sendReply.mutateAsync({
        threadId: email.threadId,
        to: email.from,
        subject: email.subject,
        body: draft,
        messageId: email.id,
      });
      setDraft('');
      if (onClose) onClose();
    } catch { }
  };

  const isGenerating = generateReply.isPending || toneReply.isPending;

  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118]">
        <div className="p-1.5 rounded-lg bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#E6C98F]">
          <Wand2 className="w-4 h-4" />
        </div>
        <span className="text-sm font-serif font-bold text-[#2C2C2C] dark:text-white tracking-wide">AI Smart Reply Composer</span>
      </div>

      <div className="p-5 space-y-5 bg-[#FAF7F2] dark:bg-[#111118]">
        {/* Tone Selector Pills */}
        <div>
          <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-wider mb-2.5 block">
            Tone Persona
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TONES.map(({ key, label }) => (
              <button
                key={key}
                id={`tone-${key}`}
                onClick={() => setTone(key)}
                className={`py-2 px-3 rounded-full text-xs font-semibold tracking-wide transition-all border text-center ${
                  tone === key
                    ? 'bg-[#8B6914] text-white border-[#8B6914] shadow-xs'
                    : 'bg-white dark:bg-[#1A1A24] text-[#6B6B6B] dark:text-slate-400 border-[#E8E0D0] dark:border-[#222233] hover:text-[#2C2C2C] dark:hover:text-white hover:border-[#8B6914]/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          id="generate-reply-btn"
          onClick={handleGenerateReply}
          disabled={isGenerating}
          className="w-full btn-gradient text-sm py-3 font-semibold shadow-xs"
        >
          {isGenerating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Drafting {tone} response...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Draft ({tone})</span>
            </>
          )}
        </button>

        {/* Draft Editor Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-wider block">
              Response Draft
            </label>
            {grammarChecked && (
              <span className="text-xs text-emerald-800 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                Grammar Verified
              </span>
            )}
          </div>

          <textarea
            id="reply-draft-textarea"
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setGrammarChecked(false); }}
            placeholder="AI will generate a draft response here based on your selected tone..."
            rows={7}
            className="textarea-glowing bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white placeholder-[#6B6B6B] dark:placeholder-slate-400"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            id="grammar-check-btn"
            onClick={handleGrammarCheck}
            disabled={!draft || grammarCorrect.isPending}
            className="btn-secondary text-xs py-2.5 flex-1 justify-center dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233]"
          >
            {grammarCorrect.isPending ? (
              <span className="w-3.5 h-3.5 border-2 border-[#6B6B6B] border-t-[#8B6914] rounded-full animate-spin" />
            ) : grammarChecked ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-[#8B6914] dark:text-[#E6C98F]" />
            )}
            <span>{grammarChecked ? 'Grammar Checked' : 'Fix Grammar'}</span>
          </button>

          <button
            id="send-reply-btn"
            onClick={handleSend}
            disabled={!draft.trim() || sendReply.isPending}
            className="btn-gradient text-xs py-2.5 flex-1 justify-center font-bold"
          >
            {sendReply.isPending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Send Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIReplyEditor;
