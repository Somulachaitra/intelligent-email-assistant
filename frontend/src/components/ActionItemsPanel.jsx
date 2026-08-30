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
    high: 'text-red-400 bg-red-950/30 border-red-800/40',
    medium: 'text-amber-400 bg-amber-950/30 border-amber-800/40',
    low: 'text-[#888899] bg-[#161622] border-[#222233]',
  };

  return (
    <div className={`card border border-[#222233] bg-[#111118] overflow-hidden shadow-xl transition-all ${extractActions.isPending ? 'animate-pulse-glow' : ''}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#222233] bg-[#161622]/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#00C896]/20 text-[#00C896]">
            <CheckSquare className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-wide">Action Items & Deadlines</span>
        </div>
        <button onClick={() => setExpanded(e => !e)} className="text-[#888899] hover:text-white transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="p-5 space-y-4">
          {!data && (
            <button
              id="extract-actions-btn"
              onClick={handleExtract}
              disabled={extractActions.isPending}
              className="w-full btn-secondary text-xs py-3 justify-center font-semibold border-[#222233] hover:border-[#00C896]/50"
            >
              {extractActions.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#00C896]" />
                  <span>Extracting tasks with Claude AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#00C896]" />
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
                  <p className="text-[11px] font-bold text-[#00C896] uppercase tracking-widest mb-3 font-mono">
                    // Extracted Tasks ({data.actionItems.length})
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
                          <span className="font-semibold text-white">{item.task}</span>
                          {item.dueDate && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-[#00D4FF]">
                              <Calendar className="w-3 h-3" />
                              <span>Due: {item.dueDate}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 border border-white/10 shrink-0">
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#888899] italic">No explicit tasks found in this email.</p>
              )}

              {/* Dates */}
              {data.dates?.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-[#00D4FF] uppercase tracking-widest mb-3 font-mono">
                    // Key Dates & Events ({data.dates.length})
                  </p>
                  <div className="space-y-2">
                    {data.dates.map((d, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#161622] border border-[#222233] text-xs">
                        <span className="text-[#CCCCCC]">{d.description}</span>
                        <div className="flex items-center gap-1.5 font-mono text-[#00D4FF] font-semibold">
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
                className="text-xs text-[#888899] hover:text-white transition-colors block pt-2"
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
