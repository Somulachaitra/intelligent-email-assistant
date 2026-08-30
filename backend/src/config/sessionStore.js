const session = require('express-session');
const { supabase } = require('./supabase');

class SupabaseSessionStore extends session.Store {
  async get(sid, callback) {
    try {
      const { data, error } = await supabase
        .from('session')
        .select('sess, expire')
        .eq('sid', sid)
        .maybeSingle();

      if (error) {
        console.warn('Supabase session get warning:', error.message);
        return callback(null, null);
      }

      if (!data) return callback(null, null);

      // Parse expiration date cleanly with UTC fallback
      let expireDate;
      if (data.expire) {
        const expStr = String(data.expire);
        expireDate = (!expStr.endsWith('Z') && !expStr.includes('+'))
          ? new Date(expStr + 'Z')
          : new Date(expStr);
      }

      // Check if session has expired
      if (expireDate && expireDate.getTime() < Date.now()) {
        await this.destroy(sid, () => {});
        return callback(null, null);
      }

      return callback(null, data.sess);
    } catch (err) {
      console.error('Supabase session get error:', err.message);
      return callback(null, null);
    }
  }

  async set(sid, sess, callback = () => {}) {
    try {
      const maxAge = sess.cookie?.maxAge || 7 * 24 * 60 * 60 * 1000;
      const expire = new Date(Date.now() + maxAge).toISOString();

      const { error } = await supabase
        .from('session')
        .upsert(
          {
            sid,
            sess,
            expire,
          },
          { onConflict: 'sid' }
        );

      if (error) {
        console.error('Supabase session set error:', error.message);
      }
      return callback(null);
    } catch (err) {
      console.error('Supabase session set exception:', err.message);
      return callback(null);
    }
  }

  async destroy(sid, callback = () => {}) {
    try {
      await supabase.from('session').delete().eq('sid', sid);
      return callback(null);
    } catch (err) {
      console.error('Supabase session destroy error:', err.message);
      return callback(null);
    }
  }

  async touch(sid, sess, callback = () => {}) {
    return this.set(sid, sess, callback);
  }
}

module.exports = SupabaseSessionStore;
