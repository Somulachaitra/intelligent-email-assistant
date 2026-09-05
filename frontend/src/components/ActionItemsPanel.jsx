import React, { useState } from 'react';
import { CheckSquare, Calendar, ChevronDown, ChevronUp, Loader2, Sparkles } from 'lucide-react';
import { useExtractActions } from '../hooks/useAI';

const ActionItemsPanel = ({ email }) => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const extractActions = useExtractActions();

  const handleExtract = async () => {
    try {
      const result = await extractActions.mutateAsync({
        emailBody: email.body,
        subject: email.subject,
      });
      setData(result);
    } catch { }
  };

  const priorityColors = {
    high: 'text-rose-900 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
    medium: 'text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
    low: 'text-[#5C4A32] dark:text-slate-200 bg-white dark:bg-[#1A1A24] border-[#E8E0D0] dark:border-[#222233]',
  };

  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] rounded-2xl overflow-hidden shadow-sm transition-all">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <CheckSquare className="w-4 h-4" />
          </div>
          <span className="text-sm font-serif font-bold text-[#2C2C2C] dark:text-white tracking-wide">Action Items & Key Dates</span>
        </div>
        <button onClick={() => setExpanded(e => !e)} className="text-[#6B6B6B] dark:text-slate-400 hover:text-[#2C2C2C] dark:hover:text-white transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="p-5 space-y-4 bg-[#FAF7F2] dark:bg-[#111118]">
          {!data && (
            <button
              id="extract-actions-btn"
              onClick={handleExtract}
              disabled={extractActions.isPending}
              className="w-full btn-secondary text-xs py-3 justify-center font-semibold dark:bg-[#1A1A24] dark:text-slate-200 border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914]/50"
            >
              {extractActions.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#8B6914] dark:text-[#E6C98F]" />
                  <span>Extracting tasks with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#8B6914] dark:text-[#E6C98F]" />
                  <span>Extract Tasks & Deadlines</span>
                </>
              )}
            </button>
          )}

          {data && (
            <div className="space-y-4 animate-fade-in">
              {/* Action Items */}
              {data.actionItems?.length > 0 ? (
                <div>
                  <p className="text-[11px] font-serif font-bold text-[#8B6914] dark:text-[#E6C98F] uppercase tracking-widest mb-3">
                    Actionable Tasks ({data.actionItems.length})
                  </p>
                  <div className="space-y-2">
                    {data.actionItems.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs leading-relaxed ${
                          priorityColors[item.priority] || priorityColors.low
                        }`}
                      >
                        <CheckSquare className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-semibold text-[#2C2C2C] dark:text-white">{item.task}</span>
                          {item.dueDate && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-sans font-semibold text-[#8B6914] dark:text-[#E6C98F]">
                              <Calendar className="w-3 h-3" />
                              <span>Due: {item.dueDate}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 dark:bg-[#111118]/80 border border-[#E8E0D0] dark:border-[#222233] shrink-0 font-semibold">
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#6B6B6B] dark:text-slate-400 italic">No explicit tasks found in this email.</p>
              )}

              {/* Dates */}
              {data.dates?.length > 0 && (
                <div>
                  <p className="text-[11px] font-serif font-bold text-[#5C4A32] dark:text-slate-300 uppercase tracking-widest mb-3">
                    Important Deadlines & Events ({data.dates.length})
                  </p>
                  <div className="space-y-2">
                    {data.dates.map((d, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] text-xs shadow-xs">
                        <span className="text-[#2C2C2C] dark:text-white font-medium">{d.description}</span>
                        <div className="flex items-center gap-1.5 text-[#8B6914] dark:text-[#E6C98F] font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{d.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setData(null)}
                className="text-xs text-[#6B6B6B] dark:text-slate-400 hover:text-[#2C2C2C] dark:hover:text-white transition-colors block pt-2"
              >
                Clear & re-scan
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionItemsPanel;
