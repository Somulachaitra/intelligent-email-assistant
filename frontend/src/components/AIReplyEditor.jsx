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
    <div className={`card border border-[#222233] bg-[#111118] overflow-hidden shadow-2xl transition-all duration-300 ${isGenerating ? 'animate-pulse-glow' : ''}`}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#222233] bg-[#161622]/60">
        <div className="p-1.5 rounded-lg bg-[#6C63FF]/20 text-[#6C63FF]">
          <Wand2 className="w-4 h-4 text-[#00D4FF]" />
        </div>
        <span className="text-sm font-bold text-white tracking-wide">AI Smart Reply Editor</span>
      </div>

      <div className="p-5 space-y-5">
        {/* Tone Selector Pills */}
        <div>
          <label className="text-xs font-bold text-[#888899] uppercase tracking-wider mb-2.5 block font-mono">
            Select Tone Persona
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TONES.map(({ key, label }) => (
              <button
                key={key}
                id={`tone-${key}`}
                onClick={() => setTone(key)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all border text-center ${
                  tone === key
                    ? 'bg-[#161622] text-[#00D4FF] border-[#00D4FF] shadow-lg shadow-[#00D4FF]/20 scale-[1.02]'
                    : 'bg-[#111118] text-[#888899] border-[#222233] hover:text-white hover:border-[#333348]'
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
          className="w-full btn-gradient text-sm py-3 font-semibold"
        >
          {isGenerating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synthesizing {tone} reply...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Draft ({tone})</span>
            </>
          )}
        </button>

        {/* Draft Editor Textarea with Glowing Purple Border on Focus */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#888899] uppercase tracking-wider block font-mono">
              Email Response Body
            </label>
            {grammarChecked && (
              <span className="text-xs text-[#00C896] flex items-center gap-1 font-mono">
                <CheckCircle className="w-3.5 h-3.5" />
                Grammar Verified
              </span>
            )}
          </div>

          <textarea
            id="reply-draft-textarea"
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setGrammarChecked(false); }}
            placeholder="AI will generate a draft here based on tone, or write your custom reply..."
            rows={8}
            className="textarea-glowing"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            id="grammar-check-btn"
            onClick={handleGrammarCheck}
            disabled={!draft || grammarCorrect.isPending}
            className="btn-secondary text-xs py-2.5 flex-1 justify-center"
          >
            {grammarCorrect.isPending ? (
              <span className="w-3.5 h-3.5 border-2 border-[#888899] border-t-[#6C63FF] rounded-full animate-spin" />
            ) : grammarChecked ? (
              <CheckCircle className="w-3.5 h-3.5 text-[#00C896]" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-[#A5B4FC]" />
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
