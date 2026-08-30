import React, { useState } from 'react';
import {
  BarChart2, Mail, Reply, Star, Archive, Trash2, Sparkles, Zap, TrendingUp, CheckCircle,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Sidebar from '../components/Sidebar';
import ComposeModal from '../components/ComposeModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useAnalytics } from '../hooks/useEmails';

const PERIODS = [7, 14, 30, 90];

const PIE_COLORS = ['#6C63FF', '#00D4FF', '#00C896', '#F59E0B', '#EF4444', '#A5B4FC'];

const StatCard = ({ icon: Icon, label, value, subtext, gradient }) => (
  <div className="card p-6 border border-[#222233] bg-[#111118] hover:border-[#6C63FF]/40 transition-all duration-300 relative overflow-hidden group shadow-xl">
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-mono uppercase tracking-wider text-[#888899]">{label}</span>
      <div className="w-10 h-10 rounded-xl bg-[#161622] border border-[#222233] flex items-center justify-center text-[#00D4FF] group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-3xl font-bold text-white tracking-tight font-mono mb-1">{value}</p>
    {subtext && <p className="text-xs text-[#888899] font-normal">{subtext}</p>}
  </div>
);

const customTooltipStyle = {
  contentStyle: {
    background: '#111118',
    border: '1px solid #222233',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#E0E0E6',
    boxShadow: '0 10px 25px -5px rgba(108, 99, 255, 0.2)',
    fontFamily: 'Space Grotesk, sans-serif',
  },
  cursor: { fill: 'rgba(108, 99, 255, 0.08)' },
};

const AnalyticsPage = () => {
  const [days, setDays] = useState(30);
  const [showCompose, setShowCompose] = useState(false);
  const { data, isLoading } = useAnalytics(days);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F] font-sans antialiased bg-dot-pattern">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222233] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] text-white">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">AI Email Analytics</h1>
                  <p className="text-xs text-[#888899] font-mono mt-0.5">// Intelligence Insights & Velocity</p>
                </div>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-1.5 bg-[#111118] border border-[#222233] p-1.5 rounded-2xl">
              {PERIODS.map(d => (
                <button
                  key={d}
                  id={`period-${d}`}
                  onClick={() => setDays(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    days === d
                      ? 'bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-lg shadow-[#6C63FF]/30'
                      : 'text-[#888899] hover:text-white'
                  }`}
                >
                  {d} Days
                </button>
              ))}
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
                  gradient="from-[#6C63FF] to-[#00D4FF]"
                />
                <StatCard
                  icon={Reply}
                  label="Replies Sent"
                  value={data.summary.replied}
                  subtext="Smart & manual drafts"
                  gradient="from-[#00D4FF] to-[#00C896]"
                />
                <StatCard
                  icon={Sparkles}
                  label="AI Summaries"
                  value={data.summary.summarized}
                  subtext="Google Gemini processings"
                  gradient="from-[#6C63FF] to-[#A5B4FC]"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Reply Conversion"
                  value={`${data.replyRate}%`}
                  subtext="Inbox velocity rate"
                  gradient="from-[#00C896] to-amber-400"
                />
              </div>

              {/* Daily Activity Chart Card */}
              {data.dailyActivity?.length > 0 && (
                <div className="card p-6 border border-[#222233] bg-[#111118] shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">Daily AI & Inbox Activity</h3>
                      <p className="text-xs text-[#888899]">Actions performed over the last {days} days</p>
                    </div>
                    <span className="text-xs font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-3 py-1 rounded-full border border-[#00D4FF]/30">
                      Live Dynamic Tracking
                    </span>
                  </div>

                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data.dailyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222233" />
                      <XAxis dataKey="date" tick={{ fill: '#888899', fontSize: 11 }} tickFormatter={d => d.slice(5)} />
                      <YAxis tick={{ fill: '#888899', fontSize: 11 }} />
                      <Tooltip {...customTooltipStyle} />
                      <Area type="monotone" dataKey="count" stroke="#00D4FF" strokeWidth={3} fill="url(#colorActivity)" name="Actions" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Action Breakdown Grid */}
              {data.actionBreakdown?.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <div className="card p-6 border border-[#222233] bg-[#111118] shadow-2xl">
                    <h3 className="text-base font-bold text-white tracking-tight mb-4">Action Volume by Type</h3>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={data.actionBreakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222233" />
                        <XAxis dataKey="action" tick={{ fill: '#888899', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#888899', fontSize: 11 }} />
                        <Tooltip {...customTooltipStyle} />
                        <Bar dataKey="count" fill="#6C63FF" radius={[6, 6, 0, 0]} name="Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Donut Chart */}
                  <div className="card p-6 border border-[#222233] bg-[#111118] shadow-2xl">
                    <h3 className="text-base font-bold text-white tracking-tight mb-4">Distribution Ratio</h3>
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
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#111118" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip {...customTooltipStyle} />
                        <Legend formatter={v => <span style={{ color: '#888899', fontSize: 12, fontFamily: 'Space Grotesk' }}>{v}</span>} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Summary Highlights */}
              <div className="card p-6 border border-[#222233] bg-[#111118] shadow-2xl">
                <h3 className="text-base font-bold text-white tracking-tight mb-4">// Inbox Operations Overview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Archive, label: 'Archived', value: data.summary.archived, color: 'text-[#00D4FF]' },
                    { icon: Trash2, label: 'Deleted', value: data.summary.deleted, color: 'text-red-400' },
                    { icon: Star, label: 'Starred', value: data.summary.starred, color: 'text-amber-400' },
                    { icon: Mail, label: 'Sent', value: data.summary.sent, color: 'text-[#00C896]' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-[#161622] rounded-2xl p-4 border border-[#222233]">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-xs text-[#888899] font-mono">{label}</span>
                      </div>
                      <p className="text-2xl font-bold text-white font-mono">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <BarChart2 className="w-12 h-12 text-[#222233] mx-auto mb-3" />
              <p className="text-[#888899]">No analytics recorded for this time range.</p>
            </div>
          )}
        </div>
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default AnalyticsPage;
