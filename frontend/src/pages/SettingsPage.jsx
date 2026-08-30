import React, { useState } from 'react';
import { Trash2, Plus, FileText, LogOut, ShieldCheck, User, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ComposeModal from '../components/ComposeModal';
import { useAuth } from '../context/AuthContext';
import { useTemplates, useCreateTemplate, useDeleteTemplate } from '../hooks/useEmails';
import { getInitials, getAvatarColor } from '../utils/formatters';
import toast from 'react-hot-toast';

const CATEGORIES = ['general', 'reply', 'follow-up', 'introduction', 'other'];

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [showCompose, setShowCompose] = useState(false);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [templateForm, setTemplateForm] = useState({ name: '', subject: '', body: '', category: 'general' });

  const { data: templates, isLoading: loadingTemplates } = useTemplates();
  const createTemplate = useCreateTemplate();
  const deleteTemplate = useDeleteTemplate();

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    if (!templateForm.name || !templateForm.body) return toast.error('Name and body are required');
    try {
      await createTemplate.mutateAsync(templateForm);
      setTemplateForm({ name: '', subject: '', body: '', category: 'general' });
      setShowNewTemplate(false);
    } catch { }
  };

  const avatarColor = getAvatarColor(user?.name || '');

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F] font-sans antialiased bg-dot-pattern">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="border-b border-[#222233] pb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Account & Templates</h1>
            <p className="text-xs text-[#888899] font-mono mt-1">// Manage Profile, Saved Templates, and Security Protocols</p>
          </div>

          {/* User Profile Section */}
          <section className="card p-6 border border-[#222233] bg-[#111118] shadow-xl">
            <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <User className="w-4 h-4 text-[#00D4FF]" />
              <span>Connected Google Account</span>
            </h2>
            {user && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-2xl bg-[#161622] border border-[#222233]">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full ring-4 ring-[#6C63FF]/30 shrink-0" />
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0 ${avatarColor}`}>
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-lg">{user.name}</p>
                  <p className="text-[#888899] text-xs font-mono">{user.email}</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#00C896] bg-[#00C896]/10 border border-[#00C896]/30 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Google OAuth 2.0 Token Authenticated
                  </span>
                </div>
                <button
                  id="disconnect-btn"
                  onClick={logout}
                  className="btn-danger text-xs py-2.5 px-4 font-semibold shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </section>

          {/* Email Templates Manager Section */}
          <section className="card p-6 border border-[#222233] bg-[#111118] shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#6C63FF]" />
                  <span>Email Response Templates</span>
                </h2>
                <p className="text-xs text-[#888899] mt-0.5">Pre-written templates for AI reply workflows</p>
              </div>

              <button
                id="new-template-btn"
                onClick={() => setShowNewTemplate(n => !n)}
                className="btn-gradient text-xs py-2 px-4 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Template</span>
              </button>
            </div>

            {/* New Template Form */}
            {showNewTemplate && (
              <form onSubmit={handleCreateTemplate} className="mb-6 p-5 rounded-2xl bg-[#161622] border border-[#222233] space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#888899] mb-1.5 block font-mono">Template Identifier *</label>
                    <input
                      className="input text-sm"
                      value={templateForm.name}
                      onChange={e => setTemplateForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Sales Intro Follow-up"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#888899] mb-1.5 block font-mono">Category</label>
                    <select
                      className="input text-sm bg-[#111118]"
                      value={templateForm.category}
                      onChange={e => setTemplateForm(f => ({ ...f, category: e.target.value }))}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#111118] text-white capitalize">{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888899] mb-1.5 block font-mono">Default Subject Line (Optional)</label>
                  <input
                    className="input text-sm"
                    value={templateForm.subject}
                    onChange={e => setTemplateForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Email subject..."
                  />
                </div>
                <div>
                  <label className="text-xs text-[#888899] mb-1.5 block font-mono">Template Body Text *</label>
                  <textarea
                    className="textarea-glowing"
                    rows={5}
                    value={templateForm.body}
                    onChange={e => setTemplateForm(f => ({ ...f, body: e.target.value }))}
                    placeholder="Write your template text..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={createTemplate.isPending} className="btn-gradient text-xs py-2.5 px-5 font-semibold">
                    {createTemplate.isPending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    Save Template
                  </button>
                  <button type="button" onClick={() => setShowNewTemplate(false)} className="btn-secondary text-xs py-2.5 px-4">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Templates List */}
            {loadingTemplates ? (
              <div className="space-y-3">
                {[1, 2].map(i => <div key={i} className="h-16 rounded-2xl shimmer" />)}
              </div>
            ) : templates?.length === 0 ? (
              <div className="text-center py-10 bg-[#161622]/40 rounded-2xl border border-[#222233]">
                <FileText className="w-10 h-10 text-[#222233] mx-auto mb-2" />
                <p className="text-[#888899] text-sm">No saved templates yet. Click "Create Template" to add one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {templates?.map(t => (
                  <div key={t._id} className="flex items-start gap-4 p-4 rounded-2xl bg-[#161622] border border-[#222233] hover:border-[#6C63FF]/40 transition-all group">
                    <div className="p-2 rounded-xl bg-[#6C63FF]/20 text-[#6C63FF] shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{t.name}</span>
                        <span className="badge badge-purple text-[10px] font-mono capitalize">{t.category}</span>
                      </div>
                      {t.subject && <p className="text-xs text-[#888899] mt-1 font-mono">Subject: {t.subject}</p>}
                      <p className="text-xs text-[#CCCCCC] truncate mt-1 leading-relaxed">{t.body.substring(0, 100)}…</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setShowCompose(true)}
                        className="text-xs btn-secondary py-1.5 px-3"
                      >Use</button>
                      <button
                        id={`delete-template-${t._id}`}
                        onClick={() => deleteTemplate.mutate(t._id)}
                        className="text-[#888899] hover:text-red-400 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Security Protocols Notice */}
          <section className="card p-6 border border-[#222233] bg-[#111118] shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00C896]" />
              <span>Security & Encryption Standard</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#888899]">
              <div className="p-3.5 rounded-xl bg-[#161622] border border-[#222233] flex items-start gap-2.5">
                <span className="text-[#00C896] font-bold">✓</span>
                <span>Google OAuth 2.0 SSL handshake — zero raw passwords stored</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161622] border border-[#222233] flex items-start gap-2.5">
                <span className="text-[#00C896] font-bold">✓</span>
                <span>AES-256 encrypted refresh tokens stored in Supabase PostgreSQL</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161622] border border-[#222233] flex items-start gap-2.5">
                <span className="text-[#00C896] font-bold">✓</span>
                <span>HttpOnly session cookies protected against XSS vulnerability</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#161622] border border-[#222233] flex items-start gap-2.5">
                <span className="text-[#00C896] font-bold">✓</span>
                <span>Google Gemini AI processing done via secure server proxy</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default SettingsPage;
