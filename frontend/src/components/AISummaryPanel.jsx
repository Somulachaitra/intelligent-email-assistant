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
    <div className={`card border-l-4 border-l-[#6C63FF] border-y-[#222233] border-r-[#222233] shadow-xl overflow-hidden transition-all duration-300 ${isLoading ? 'animate-pulse-glow' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#222233] bg-[#161622]/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#6C63FF]/20 text-[#00D4FF]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-wide">AI Assistant ✨</span>
        </div>
        <button onClick={() => setExpanded(e => !e)} className="text-[#888899] hover:text-white transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="p-5 space-y-4 bg-[#111118]">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              id="ai-summarize-btn"
              onClick={handleSummarize}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 hover:border-[#6C63FF]/50"
            >
              {summarize.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#888899] border-t-[#6C63FF] rounded-full animate-spin" />
              ) : <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />}
              <span>Summarize</span>
            </button>

            <button
              id="ai-explain-btn"
              onClick={handleExplain}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 hover:border-[#6C63FF]/50"
            >
              {explainEmail.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#888899] border-t-[#6C63FF] rounded-full animate-spin" />
              ) : <HelpCircle className="w-3.5 h-3.5 text-[#A5B4FC]" />}
              <span>Explain</span>
            </button>

            <button
              id="ai-spam-btn"
              onClick={handleSpamCheck}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 hover:border-[#6C63FF]/50"
            >
              {detectSpam.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#888899] border-t-[#6C63FF] rounded-full animate-spin" />
              ) : <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />}
              <span>Spam Check</span>
            </button>

            <button
              id="ai-priority-btn"
              onClick={handlePriorityCheck}
              disabled={isLoading}
              className="btn-secondary text-xs py-2 px-3 hover:border-[#6C63FF]/50"
            >
              {detectPriority.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-[#888899] border-t-[#6C63FF] rounded-full animate-spin" />
              ) : <Zap className="w-3.5 h-3.5 text-red-400" />}
              <span>Priority</span>
            </button>
          </div>

          {/* Spam Warning Alert */}
          {spam && (spam.isSpam || spam.isPhishing || spam.riskLevel === 'high' || spam.riskLevel === 'critical') && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950/40 border border-red-800/60 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-300">
                  {spam.isPhishing ? '🎣 Phishing Threat Detected' : '⚠️ Suspicious Email Detected'}
                </p>
                <p className="text-xs text-red-400 mt-1 leading-relaxed">{spam.recommendation}</p>
              </div>
            </div>
          )}

          {spam && spam.riskLevel === 'none' && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#00C896]/10 border border-[#00C896]/30 animate-fade-in">
              <span className="text-[#00C896] text-xs font-semibold">✅ Verified Safe: Zero phishing or spam indicators found</span>
            </div>
          )}

          {/* Priority Detection Card */}
          {priority && (
            <div className={`p-4 rounded-xl border animate-fade-in ${
              priority.priority === 'high' ? 'bg-red-950/30 border-red-800/40' :
              priority.priority === 'medium' ? 'bg-amber-950/30 border-amber-800/40' :
              'bg-[#161622] border-[#222233]'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className={`w-4 h-4 ${priority.priority === 'high' ? 'text-red-400' : priority.priority === 'medium' ? 'text-amber-400' : 'text-[#888899]'}`} />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{priority.priority} Priority Level</span>
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed mt-1">{priority.reason}</p>
              <p className="text-[11px] text-[#888899] font-mono mt-2">Recommended Response: {priority.suggestedResponseTime}</p>
            </div>
          )}

          {/* AI Summary Results */}
          {summary && (
            <div className="p-4 rounded-xl bg-[#161622] border border-[#222233] animate-fade-in space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gradient uppercase tracking-widest">// AI Executive Summary</p>
                <span className="text-[10px] font-mono text-[#888899]">claude-sonnet-4-6</span>
              </div>
              <div className="space-y-2">
                {summary.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#E0E0E6] leading-relaxed">
                    <span className="text-[#00D4FF] font-bold shrink-0 mt-0.5">•</span>
                    <span>{line.replace(/^[•\-*]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation Results */}
          {explanation && (
            <div className="p-4 rounded-xl bg-[#161622] border border-[#222233] animate-fade-in space-y-2">
              <p className="text-xs font-bold text-[#A5B4FC] uppercase tracking-widest">// Plain English Breakdown</p>
              <p className="text-xs text-[#E0E0E6] leading-relaxed">{explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISummaryPanel;
