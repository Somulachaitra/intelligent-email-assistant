const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment variables');
}

// Use service role key — bypasses Row Level Security for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const connectDB = async () => {
  try {
    // Verify connection by querying a system table
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // PGRST116 = table not found — schema not yet applied, warn but don't crash
      if (error.code === '42P01') {
        console.warn('⚠️  Supabase tables not found. Run the schema.sql migration first.');
      } else {
        throw error;
      }
    }
    console.log('✅ Supabase connected');
  } catch (err) {
    console.error('❌ Supabase connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { supabase, connectDB };
