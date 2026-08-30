const { supabase } = require('../config/supabase');

// ─── Row → camelCase normalizer ───────────────────────────────────────────────
// Keeps the same interface the rest of the app already uses (req.user.accessToken,
// req.user._id, user.toPublicJSON, etc.) regardless of Supabase's snake_case cols.
const format = (row) => {
  if (!row) return null;
  return {
    // Keep both _id and id so existing controllers using req.user._id still work
    _id:          row.id,
    id:           row.id,
    googleId:     row.google_id,
    email:        row.email,
    name:         row.name,
    picture:      row.picture,
    accessToken:  row.access_token,
    refreshToken: row.refresh_token,
    createdAt:    row.created_at,
    updatedAt:    row.updated_at,
    toPublicJSON() {
      return {
        id:        row.id,
        email:     row.email,
        name:      row.name,
        picture:   row.picture,
        createdAt: row.created_at,
      };
    },
  };
};

const User = {
  // ── Find a user by their UUID (from the session) ──────────────────────────
  async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return format(data);
  },

  // ── Find by Google ID (used in passport strategy) ─────────────────────────
  async findByGoogleId(googleId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', googleId)
      .maybeSingle();
    if (error) throw error;
    return format(data);
  },

  // ── Upsert on google_id (replaces Mongoose findOneAndUpdate + upsert:true) ─
  async upsert({ googleId, email, name, picture, accessToken, refreshToken }) {
    const payload = {
      google_id:    googleId,
      email,
      name,
      picture:      picture || null,
      access_token: accessToken,
    };
    // Only update refresh_token when one is actually provided
    if (refreshToken !== undefined && refreshToken !== null) {
      payload.refresh_token = refreshToken;
    }

    const { data, error } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'google_id' })
      .select()
      .single();
    if (error) throw error;
    return format(data);
  },

  // ── Update a user by ID (used by gmailService when tokens are refreshed) ──
  async findByIdAndUpdate(id, updates) {
    // Translate camelCase updates → snake_case columns
    const payload = {};
    if (updates.accessToken  !== undefined) payload.access_token  = updates.accessToken;
    if (updates.refreshToken !== undefined) payload.refresh_token = updates.refreshToken;

    const { data, error } = await supabase
      .from('users')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return format(data);
  },
};

module.exports = User;
