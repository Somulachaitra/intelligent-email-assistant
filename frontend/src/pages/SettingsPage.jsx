import React, { useState } from 'react';
import { Trash2, Plus, FileText, LogOut, ShieldCheck, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ComposeModal from '../components/ComposeModal';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useTemplates, useCreateTemplate, useDeleteTemplate } from '../hooks/useEmails';
import { getInitials } from '../utils/formatters';
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F0E8] dark:bg-[#0A0A0F] font-sans antialiased bg-dot-pattern transition-colors duration-300 animate-fade-in">
      <Sidebar onCompose={() => setShowCompose(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8E0D0] dark:border-[#222233] pb-6">
            <div>
              <h1 className="text-2xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight">Account & Templates</h1>
              <p className="text-xs text-[#6B6B6B] dark:text-slate-400 font-mono mt-1">Manage Executive Profile, Response Templates, & Security Protocols</p>
            </div>
            <ThemeToggle />
          </div>

          {/* User Profile Section */}
          <section className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm">
            <h2 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white mb-5 flex items-center gap-2">
              <User className="w-4 h-4 text-[#8B6914] dark:text-[#E6C98F]" />
              <span>Connected Google Account</span>
            </h2>
            {user && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233]">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full ring-4 ring-[#8B6914]/30 shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#8B6914] text-white flex items-center justify-center text-xl font-serif font-bold shrink-0">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[#2C2C2C] dark:text-white font-serif font-bold text-xl">{user.name}</p>
                  <p className="text-[#6B6B6B] dark:text-slate-400 text-xs font-mono">{user.email}</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 mt-2">
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
          <section className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8B6914] dark:text-[#E6C98F]" />
                  <span>Email Response Templates</span>
                </h2>
                <p className="text-xs text-[#6B6B6B] dark:text-slate-400 mt-0.5">Pre-written templates for AI reply workflows</p>
              </div>

              <button
                id="new-template-btn"
                onClick={() => setShowNewTemplate(n => !n)}
                className="btn-gradient text-xs py-2 px-4 font-semibold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Template</span>
              </button>
            </div>

            {/* New Template Form */}
            {showNewTemplate && (
              <form onSubmit={handleCreateTemplate} className="mb-6 p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 mb-1.5 block">Template Identifier *</label>
                    <input
                      className="input text-sm bg-white dark:bg-[#111118] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white"
                      value={templateForm.name}
                      onChange={e => setTemplateForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Sales Intro Follow-up"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 mb-1.5 block">Category</label>
                    <select
                      className="input text-sm bg-white dark:bg-[#111118] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white"
                      value={templateForm.category}
                      onChange={e => setTemplateForm(f => ({ ...f, category: e.target.value }))}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c} className="bg-white dark:bg-[#111118] text-[#2C2C2C] dark:text-white capitalize">{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 mb-1.5 block">Default Subject Line (Optional)</label>
                  <input
                    className="input text-sm bg-white dark:bg-[#111118] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white"
                    value={templateForm.subject}
                    onChange={e => setTemplateForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Email subject..."
                  />
                </div>
                <div>
                  <label className="text-xs font-serif font-bold text-[#5C4A32] dark:text-slate-300 mb-1.5 block">Template Body Text *</label>
                  <textarea
                    className="textarea-glowing bg-white dark:bg-[#111118] border-[#E8E0D0] dark:border-[#222233] text-[#2C2C2C] dark:text-white"
                    rows={5}
                    value={templateForm.body}
                    onChange={e => setTemplateForm(f => ({ ...f, body: e.target.value }))}
                    placeholder="Write your template text..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={createTemplate.isPending} className="btn-gradient text-xs py-2.5 px-5 font-semibold shadow-xs">
                    {createTemplate.isPending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    Save Template
                  </button>
                  <button type="button" onClick={() => setShowNewTemplate(false)} className="btn-secondary text-xs py-2.5 px-4 dark:bg-[#111118] dark:text-slate-300 dark:border-[#222233]">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Templates List */}
            {loadingTemplates ? (
              <div className="space-y-3">
                {[1, 2].map(i => <div key={i} className="h-16 rounded-2xl shimmer dark:bg-[#1A1A24]" />)}
              </div>
            ) : templates?.length === 0 ? (
              <div className="text-center py-10 bg-[#FAF7F2] dark:bg-[#1A1A24] rounded-2xl border border-[#E8E0D0] dark:border-[#222233]">
                <FileText className="w-10 h-10 text-[#8B6914] dark:text-[#E6C98F] mx-auto mb-2 opacity-60" />
                <p className="text-[#6B6B6B] dark:text-slate-400 text-sm">No saved templates yet. Click "Create Template" to add one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {templates?.map(t => (
                  <div key={t._id} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] hover:border-[#8B6914]/40 transition-all group">
                    <div className="p-2 rounded-xl bg-[#FAF4E6] dark:bg-[#8B6914]/20 text-[#8B6914] dark:text-[#E6C98F] shrink-0 mt-0.5 border border-[#E6C98F] dark:border-[#8B6914]/40">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-serif font-bold text-[#2C2C2C] dark:text-white">{t.name}</span>
                        <span className="badge badge-purple text-[10px] font-mono capitalize">{t.category}</span>
                      </div>
                      {t.subject && <p className="text-xs text-[#6B6B6B] dark:text-slate-400 mt-1 font-mono">Subject: {t.subject}</p>}
                      <p className="text-xs text-[#5C4A32] dark:text-slate-300 truncate mt-1 leading-relaxed">{t.body.substring(0, 100)}…</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setShowCompose(true)}
                        className="text-xs btn-secondary py-1.5 px-3 dark:bg-[#111118] dark:text-slate-200 dark:border-[#222233]"
                      >Use</button>
                      <button
                        id={`delete-template-${t._id}`}
                        onClick={() => deleteTemplate.mutate(t._id)}
                        className="text-[#6B6B6B] dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-400 p-1.5 transition-colors"
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
          <section className="p-6 border border-[#E8E0D0] dark:border-[#222233] bg-white dark:bg-[#111118] rounded-2xl shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Security & Encryption Standards</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6B6B6B] dark:text-slate-400">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] flex items-start gap-2.5">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                <span>Google OAuth 2.0 SSL handshake — zero raw passwords stored</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] flex items-start gap-2.5">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                <span>AES-256 encrypted refresh tokens stored securely</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] flex items-start gap-2.5">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                <span>HttpOnly session cookies protected against XSS vulnerability</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] flex items-start gap-2.5">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                <span>Google Gemini AI processing executed via server proxy</span>
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
