const { supabase } = require('../config/supabase');

const ActivityLog = {
  // ── Insert a single activity record ────────────────────────────────────────
  // Matches the previous Mongoose interface: ActivityLog.create({ userId, action, … })
  async create({ userId, action, emailId, emailSubject = '(No subject)', metadata = {} }) {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert({
        user_id:       userId,
        action,
        email_id:      emailId,
        email_subject: emailSubject,
        metadata,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // ── Fetch all logs for a user within a time window ─────────────────────────
  async findByUserSince(userId, since) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('action, timestamp')
      .eq('user_id', userId)
      .gte('timestamp', since)
      .order('timestamp', { ascending: true });
    if (error) throw error;
    return data;
  },
};

module.exports = ActivityLog;
