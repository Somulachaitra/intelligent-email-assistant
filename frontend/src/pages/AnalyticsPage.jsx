import React, { useState } from 'react';
import {
  BarChart2, Mail, Reply, Star, Archive, Trash2, Sparkles, TrendingUp,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Sidebar from '../components/Sidebar';
import ComposeModal from '../components/ComposeModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ThemeToggle from '../components/ThemeToggle';
import { useAnalytics } from '../hooks/useEmails';

const PERIODS = [7, 14, 30, 90];

const PIE_COLORS = ['#8B6914', '#5C4A32', '#B8860B', '#D6AA56', '#059669', '#E11D48'];

const StatCard = ({ icon: Icon, label, value, subtext, gradient }) => (
  <div className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md dark:hover:shadow-none">
    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#6B6B6B] dark:text-slate-400">{label}</span>
      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] flex items-center justify-center text-[#8B6914] dark:text-[#E6C98F] group-hover:scale-105 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-3xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight mb-1">{value}</p>
    {subtext && <p className="text-xs text-[#6B6B6B] dark:text-slate-400 font-normal">{subtext}</p>}
  </div>
);

const customTooltipStyle = {
  contentStyle: {
    background: '#111118',
    border: '1px solid #222233',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    fontFamily: 'Inter, sans-serif',
  },
  cursor: { fill: 'rgba(139, 105, 20, 0.06)' },
};

const AnalyticsPage = () => {
  const [days, setDays] = useState(30);
  const [showCompose, setShowCompose] = useState(false);
  const { data, isLoading } = useAnalytics(days);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F0E8] dark:bg-[#0A0A0F] font-sans antialiased bg-dot-pattern transition-colors duration-300 animate-fade-in">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E0D0] dark:border-[#222233] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#8B6914] text-white shadow-xs">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight">AI Email Analytics</h1>
                  <p className="text-xs text-[#6B6B6B] dark:text-slate-400 font-mono mt-0.5">Intelligence Insights & Executive Velocity</p>
                </div>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Period Selector */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] p-1.5 rounded-2xl shadow-xs">
                {PERIODS.map(d => (
                  <button
                    key={d}
                    id={`period-${d}`}
                    onClick={() => setDays(d)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      days === d
                        ? 'bg-[#8B6914] text-white shadow-xs'
                        : 'text-[#6B6B6B] dark:text-slate-400 hover:text-[#2C2C2C] dark:hover:text-white'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton type="analytics" />
          ) : data ? (
            <>
              {/* Top Bold Number Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={Mail}
                  label="Emails Read"
                  value={data.summary.read}
                  subtext="Tracked in inbox"
                  gradient="from-[#8B6914] to-[#5C4A32]"
                />
                <StatCard
                  icon={Reply}
                  label="Replies Sent"
                  value={data.summary.replied}
                  subtext="Smart & manual drafts"
                  gradient="from-[#5C4A32] to-[#B8860B]"
                />
                <StatCard
                  icon={Sparkles}
                  label="AI Summaries"
                  value={data.summary.summarized}
                  subtext="Google Gemini processings"
                  gradient="from-[#B8860B] to-[#8B6914]"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Reply Conversion"
                  value={`${data.replyRate}%`}
                  subtext="Inbox velocity rate"
                  gradient="from-[#8B6914] to-emerald-600"
                />
              </div>

              {/* Daily Activity Chart Card */}
              {data.dailyActivity?.length > 0 && (
                <div className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight">Daily AI & Inbox Activity</h3>
                      <p className="text-xs text-[#6B6B6B] dark:text-slate-400">Actions performed over the last {days} days</p>
                    </div>
                    <span className="text-xs font-mono text-[#8B6914] dark:text-[#E6C98F] bg-[#FAF4E6] dark:bg-[#8B6914]/20 px-3 py-1 rounded-full border border-[#E6C98F] dark:border-[#8B6914]/40 font-semibold">
                      Live Dynamic Tracking
                    </span>
                  </div>

                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data.dailyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B6914" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#8B6914" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" />
                      <XAxis dataKey="date" tick={{ fill: '#6B6B6B', fontSize: 11 }} tickFormatter={d => d.slice(5)} />
                      <YAxis tick={{ fill: '#6B6B6B', fontSize: 11 }} />
                      <Tooltip {...customTooltipStyle} />
                      <Area type="monotone" dataKey="count" stroke="#8B6914" strokeWidth={2.5} fill="url(#colorActivity)" name="Actions" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Action Breakdown Grid */}
              {data.actionBreakdown?.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <div className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm">
                    <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight mb-4">Action Volume by Type</h3>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={data.actionBreakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" />
                        <XAxis dataKey="action" tick={{ fill: '#6B6B6B', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#6B6B6B', fontSize: 11 }} />
                        <Tooltip {...customTooltipStyle} />
                        <Bar dataKey="count" fill="#8B6914" radius={[6, 6, 0, 0]} name="Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Donut Chart */}
                  <div className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm">
                    <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight mb-4">Distribution Ratio</h3>
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={data.actionBreakdown}
                          cx="50%" cy="50%"
                          innerRadius={65} outerRadius={95}
                          paddingAngle={4}
                          dataKey="count"
                          nameKey="action"
                        >
                          {data.actionBreakdown.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#FFFFFF" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip {...customTooltipStyle} />
                        <Legend formatter={v => <span style={{ color: '#6B6B6B', fontSize: 12, fontFamily: 'Inter' }}>{v}</span>} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Summary Highlights */}
              <div className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm">
                <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white tracking-tight mb-4">Inbox Operations Overview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Archive, label: 'Archived', value: data.summary.archived, color: 'text-[#5C4A32] dark:text-amber-200/80' },
                    { icon: Trash2, label: 'Deleted', value: data.summary.deleted, color: 'text-rose-700 dark:text-rose-400' },
                    { icon: Star, label: 'Starred', value: data.summary.starred, color: 'text-[#8B6914] dark:text-[#E6C98F]' },
                    { icon: Mail, label: 'Sent', value: data.summary.sent, color: 'text-emerald-700 dark:text-emerald-400' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-[#FAF7F2] dark:bg-[#1A1A24] rounded-2xl p-4 border border-[#E8E0D0] dark:border-[#222233]">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-xs text-[#6B6B6B] dark:text-slate-400 font-mono">{label}</span>
                      </div>
                      <p className="text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <BarChart2 className="w-12 h-12 text-[#E8E0D0] dark:text-slate-700 mx-auto mb-3" />
              <p className="text-[#6B6B6B] dark:text-slate-400">No analytics recorded for this time range.</p>
            </div>
          )}
        </div>
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default AnalyticsPage;
