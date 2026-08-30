const { supabase } = require('../config/supabase');

// ─── Row → camelCase normalizer ───────────────────────────────────────────────
const format = (row) => {
  if (!row) return null;
  return {
    _id:       row.id,
    id:        row.id,
    userId:    row.user_id,
    name:      row.name,
    subject:   row.subject,
    body:      row.body,
    category:  row.category,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const EmailTemplate = {
  // ── List all templates for a user ──────────────────────────────────────────
  // Replaces: EmailTemplate.find({ userId }).sort({ createdAt: -1 })
  async find({ userId }) {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(format);
  },

  // ── Create a template ──────────────────────────────────────────────────────
  async create({ userId, name, subject = '', body, category = 'general' }) {
    const { data, error } = await supabase
      .from('email_templates')
      .insert({ user_id: userId, name, subject, body, category })
      .select()
      .single();
    if (error) throw error;
    return format(data);
  },

  // ── Update a template (only the owner can update) ──────────────────────────
  // Replaces: EmailTemplate.findOneAndUpdate({ _id, userId }, data, { new: true })
  async findOneAndUpdate({ _id, userId }, updates) {
    const payload = {};
    if (updates.name     !== undefined) payload.name     = updates.name;
    if (updates.subject  !== undefined) payload.subject  = updates.subject;
    if (updates.body     !== undefined) payload.body     = updates.body;
    if (updates.category !== undefined) payload.category = updates.category;

    const { data, error } = await supabase
      .from('email_templates')
      .update(payload)
      .eq('id', _id)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) throw error;
    return format(data);
  },

  // ── Delete a template (only the owner can delete) ──────────────────────────
  // Replaces: EmailTemplate.findOneAndDelete({ _id, userId })
  async findOneAndDelete({ _id, userId }) {
    const { data, error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', _id)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) throw error;
    return format(data);
  },
};

module.exports = EmailTemplate;
