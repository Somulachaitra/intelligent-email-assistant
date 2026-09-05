import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, AlertTriangle, ShieldAlert, Zap, HelpCircle } from 'lucide-react';
import { useSummarize, useDetectSpam, useDetectPriority, useExplain } from '../hooks/useAI';

const AISummaryPanel = ({ email }) => {
  const [summary, setSummary] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [spam, setSpam] = useState(null);
  const [priority, setPriority] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const summarize = useSummarize();
  const detectSpam = useDetectSpam();
  const detectPriority = useDetectPriority();
  const explainEmail = useExplain();

  const handleSummarize = async () => {
    try {
      const result = await summarize.mutateAsync({
        emailBody: email.body,
        subject: email.subject,
        emailId: email.id,
      });
      setSummary(result.summary);
      setExpanded(true);
    } catch { /* toast handled in hook */ }
  };

  const handleExplain = async () => {
    try {
      const result = await explainEmail.mutateAsync({ emailBody: email.body, subject: email.subject });
      setExplanation(result.explanation);
    } catch { }
  };

  const handleSpamCheck = async () => {
    try {
      const result = await detectSpam.mutateAsync({
        emailBody: email.body, subject: email.subject, sender: email.from,
      });
      setSpam(result);
    } catch { }
  };

  const handlePriorityCheck = async () => {
    try {
      const result = await detectPriority.mutateAsync({
        emailBody: email.body, subject: email.subject, sender: email.from,
      });
      setPriority(result);
    } catch { }
  };

  const isLoading = summarize.isPending || detectSpam.isPending || detectPriority.isPending || explainEmail.isPending;

  return (
    <div className={`bg-[#FAF7F2] dark:bg-[#111118] border-l-4 border-l-[#8B6914] border-y border-r border-[#E8E0D0] dark:border-[#222233] rounded-2xl shadow-sm overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#E6C98F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-serif font-bold text-[#2C2C2C] dark:text-white tracking-wide">AI Executive Intelligence</span>
        </div>
        <button onClick={() => setExpanded(e => !e)} className="text-[#6B6B6B] dark:text-slate-400 hover:text-[#2C2C2C] dark:hover:text-white transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="p-5 space-y-4 bg-[#FAF7F2] dark:bg-[#111118]">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              id="ai-summarize-btn"
              onClick={handleSummarize}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233] hover:border-[#8B6914]/50"
            >
              {summarize.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#6B6B6B] border-t-[#8B6914] rounded-full animate-spin" />
              ) : <Sparkles className="w-3.5 h-3.5 text-[#8B6914] dark:text-[#E6C98F]" />}
              <span>Summarize</span>
            </button>

            <button
              id="ai-explain-btn"
              onClick={handleExplain}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233] hover:border-[#8B6914]/50"
            >
              {explainEmail.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#6B6B6B] border-t-[#8B6914] rounded-full animate-spin" />
              ) : <HelpCircle className="w-3.5 h-3.5 text-[#5C4A32] dark:text-amber-200/80" />}
              <span>Explain</span>
            </button>

            <button
              id="ai-spam-btn"
              onClick={handleSpamCheck}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233] hover:border-[#8B6914]/50"
            >
              {detectSpam.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#6B6B6B] border-t-[#8B6914] rounded-full animate-spin" />
              ) : <ShieldAlert className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
              <span>Spam Check</span>
            </button>

            <button
              id="ai-priority-btn"
              onClick={handlePriorityCheck}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 dark:bg-[#1A1A24] dark:text-slate-200 dark:border-[#222233] hover:border-[#8B6914]/50"
            >
              {detectPriority.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#6B6B6B] border-t-[#8B6914] rounded-full animate-spin" />
              ) : <Zap className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />}
              <span>Priority</span>
            </button>
          </div>

          {/* Spam Warning Alert */}
          {spam && (spam.isSpam || spam.isPhishing || spam.riskLevel === 'high' || spam.riskLevel === 'critical') && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  {spam.isPhishing ? 'Phishing Threat Detected' : 'Suspicious Email Detected'}
                </p>
                <p className="text-xs text-rose-800 dark:text-rose-300 mt-1 leading-relaxed">{spam.recommendation}</p>
              </div>
            </div>
          )}

          {spam && spam.riskLevel === 'none' && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 animate-fade-in">
              <span className="text-emerald-800 dark:text-emerald-300 text-xs font-semibold">Verified Safe: Zero phishing or spam indicators found</span>
            </div>
          )}

          {/* Priority Detection Card */}
          {priority && (
            <div className={`p-4 rounded-xl border animate-fade-in ${
              priority.priority === 'high' ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-200' :
              priority.priority === 'medium' ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200' :
              'bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className={`w-4 h-4 ${priority.priority === 'high' ? 'text-rose-700 dark:text-rose-400' : priority.priority === 'medium' ? 'text-amber-700 dark:text-amber-400' : 'text-[#6B6B6B] dark:text-slate-400'}`} />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">{priority.priority} Priority Level</span>
              </div>
              <p className="text-xs leading-relaxed mt-1">{priority.reason}</p>
              <p className="text-[11px] text-[#6B6B6B] dark:text-slate-400 font-mono mt-2">Recommended Response: {priority.suggestedResponseTime}</p>
            </div>
          )}

          {/* AI Summary Results */}
          {summary && (
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] animate-fade-in space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs font-serif font-bold text-[#8B6914] dark:text-[#E6C98F] uppercase tracking-widest">Executive Summary</p>
                <span className="text-[10px] font-mono text-[#6B6B6B] dark:text-slate-400">Gemini 2.5</span>
              </div>
              <div className="space-y-2">
                {summary.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#2C2C2C] dark:text-slate-200 leading-relaxed font-sans">
                    <span className="text-[#8B6914] dark:text-[#E6C98F] font-bold shrink-0 mt-0.5">•</span>
                    <span>{line.replace(/^[•\-*]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation Results */}
          {explanation && (
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] animate-fade-in space-y-2 shadow-xs">
              <p className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-widest">Context Breakdown</p>
              <p className="text-xs text-[#2C2C2C] dark:text-slate-200 leading-relaxed font-sans">{explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISummaryPanel;
