const gmailService = require('../services/gmailService');
const ActivityLog = require('../models/ActivityLog');

/**
 * Helper: log a user action to MongoDB
 */
const logAction = async (userId, action, emailId, emailSubject = '', metadata = {}) => {
  try {
    await ActivityLog.create({ userId, action, emailId, emailSubject, metadata });
  } catch (err) {
    console.warn('Activity log write failed:', err.message);
  }
};

/**
 * GET /api/emails — Fetch inbox (paginated)
 */
const getInbox = async (req, res, next) => {
  try {
    const { pageToken, maxResults = 20, filter } = req.query;

    let labelIds = ['INBOX'];
    if (filter === 'starred') labelIds = ['STARRED'];
    else if (filter === 'sent') labelIds = ['SENT'];
    else if (filter === 'unread') labelIds = ['INBOX', 'UNREAD'];

    const result = await gmailService.listMessages(req.user, {
      pageToken,
      maxResults: parseInt(maxResults),
      labelIds,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/emails/search — Search emails
 */
const searchEmails = async (req, res, next) => {
  try {
    const { q, maxResults = 20 } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query is required' });

    const messages = await gmailService.searchMessages(req.user, q, parseInt(maxResults));
    res.json({ messages });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/emails/:id — Get a single email or thread
 */
const getEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type = 'message' } = req.query;

    let data;
    if (type === 'thread') {
      data = await gmailService.getThread(req.user, id);
    } else {
      data = await gmailService.getMessage(req.user, id);
      // Mark as read when opened
      if (data.isUnread) {
        await gmailService.modifyLabels(req.user, id, { removeLabelIds: ['UNREAD'] });
        await logAction(req.user._id, 'read', id, data.subject);
      }
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/emails/send — Send a new email
 */
const sendEmail = async (req, res, next) => {
  try {
    const { to, subject, body, cc } = req.body;
    const result = await gmailService.sendMessage(req.user, { to, subject, body, cc });
    await logAction(req.user._id, 'sent', result.id || 'new', subject);
    res.json({ message: 'Email sent successfully', data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/emails/:id/reply — Reply to an email thread
 */
const replyEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { threadId, to, subject, body, messageId } = req.body;

    const result = await gmailService.replyToThread(req.user, {
      threadId,
      to,
      subject,
      body,
      messageId,
    });

    await logAction(req.user._id, 'replied', id, subject);
    res.json({ message: 'Reply sent successfully', data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/emails/:id/star — Toggle star on email
 */
const toggleStar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { starred } = req.body;

    const labelChange = starred
      ? { addLabelIds: ['STARRED'] }
      : { removeLabelIds: ['STARRED'] };

    await gmailService.modifyLabels(req.user, id, labelChange);
    await logAction(req.user._id, starred ? 'starred' : 'unstarred', id);
    res.json({ message: `Email ${starred ? 'starred' : 'unstarred'}`, starred });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/emails/:id/read — Toggle read/unread
 */
const toggleRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const labelChange = read
      ? { removeLabelIds: ['UNREAD'] }
      : { addLabelIds: ['UNREAD'] };

    await gmailService.modifyLabels(req.user, id, labelChange);
    if (read) await logAction(req.user._id, 'read', id);
    res.json({ message: `Email marked as ${read ? 'read' : 'unread'}`, read });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/emails/:id — Move email to trash
 */
const trashEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    await gmailService.trashMessage(req.user, id);
    await logAction(req.user._id, 'deleted', id);
    res.json({ message: 'Email moved to trash' });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/emails/:id/archive — Archive email (remove INBOX label)
 */
const archiveEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    await gmailService.modifyLabels(req.user, id, { removeLabelIds: ['INBOX'] });
    await logAction(req.user._id, 'archived', id);
    res.json({ message: 'Email archived' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInbox,
  searchEmails,
  getEmail,
  sendEmail,
  replyEmail,
  toggleStar,
  toggleRead,
  trashEmail,
  archiveEmail,
};
