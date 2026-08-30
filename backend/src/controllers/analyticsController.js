const ActivityLog = require('../models/ActivityLog');

// ─── GET /api/analytics ───────────────────────────────────────────────────────
const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id; // UUID from Supabase
    const days = Math.min(parseInt(req.query.days) || 30, 365);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Single query — all user logs in the window
    const logs = await ActivityLog.findByUserSince(userId, since);

    // ── Count by action type ──────────────────────────────────────────────────
    const actionMap = {};
    logs.forEach(({ action }) => {
      actionMap[action] = (actionMap[action] || 0) + 1;
    });

    // ── Group by day (YYYY-MM-DD) ─────────────────────────────────────────────
    const dailyMap = {};
    logs.forEach(({ timestamp }) => {
      const day = timestamp.slice(0, 10); // "2024-06-15T…" → "2024-06-15"
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    });

    const dailyActivity = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    const actionBreakdown = Object.entries(actionMap)
      .sort(([, a], [, b]) => b - a)
      .map(([action, count]) => ({ action, count }));

    const readCount    = actionMap.read    || 0;
    const repliedCount = actionMap.replied || 0;
    const replyRate    = readCount > 0
      ? ((repliedCount / readCount) * 100).toFixed(1)
      : '0.0';

    res.json({
      period: `${days} days`,
      summary: {
        totalActions: logs.length,
        read:        readCount,
        replied:     repliedCount,
        sent:        actionMap.sent        || 0,
        starred:     actionMap.starred     || 0,
        archived:    actionMap.archived    || 0,
        deleted:     actionMap.deleted     || 0,
        summarized:  actionMap.summarized  || 0,
        classified:  actionMap.classified  || 0,
      },
      replyRate,
      dailyActivity,
      actionBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics };
