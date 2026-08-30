const aiService = require('../services/aiService');
const ActivityLog = require('../models/ActivityLog');

const logAction = async (userId, action, emailId, emailSubject = '') => {
  try {
    await ActivityLog.create({ userId, action, emailId, emailSubject });
  } catch (err) {
    console.warn('Activity log write failed:', err.message);
  }
};

/** POST /api/ai/summarize */
const summarize = async (req, res, next) => {
  try {
    const { emailBody, subject, emailId } = req.body;
    const result = await aiService.summarizeEmail(emailBody, subject);
    await logAction(req.user._id, 'summarized', emailId || 'unknown', subject);
    res.json({ summary: result });
  } catch (error) { next(error); }
};

/** POST /api/ai/reply */
const generateReply = async (req, res, next) => {
  try {
    const { emailBody, subject, senderName } = req.body;
    const result = await aiService.generateReply(emailBody, subject, senderName);
    res.json({ reply: result });
  } catch (error) { next(error); }
};

/** POST /api/ai/tone-reply */
const toneReply = async (req, res, next) => {
  try {
    const { emailBody, subject, senderName, tone } = req.body;
    const result = await aiService.generateToneReply(emailBody, subject, senderName, tone);
    res.json({ reply: result });
  } catch (error) { next(error); }
};

/** POST /api/ai/classify */
const classify = async (req, res, next) => {
  try {
    const { emailBody, subject, sender } = req.body;
    const result = await aiService.classifyEmail(emailBody, subject, sender);
    res.json(result);
  } catch (error) { next(error); }
};

/** POST /api/ai/explain */
const explain = async (req, res, next) => {
  try {
    const { emailBody, subject } = req.body;
    const result = await aiService.explainEmail(emailBody, subject);
    res.json({ explanation: result });
  } catch (error) { next(error); }
};

/** POST /api/ai/extract-actions */
const extractActions = async (req, res, next) => {
  try {
    const { emailBody, subject } = req.body;
    const result = await aiService.extractActions(emailBody, subject);
    res.json(result);
  } catch (error) { next(error); }
};

/** POST /api/ai/detect-spam */
const detectSpam = async (req, res, next) => {
  try {
    const { emailBody, subject, sender } = req.body;
    const result = await aiService.detectSpam(emailBody, subject, sender);
    res.json(result);
  } catch (error) { next(error); }
};

/** POST /api/ai/detect-priority */
const detectPriority = async (req, res, next) => {
  try {
    const { emailBody, subject, sender } = req.body;
    const result = await aiService.detectPriority(emailBody, subject, sender);
    res.json(result);
  } catch (error) { next(error); }
};

/** POST /api/ai/grammar */
const grammarCorrect = async (req, res, next) => {
  try {
    const { emailBody } = req.body;
    const result = await aiService.grammarCorrect(emailBody);
    res.json({ corrected: result });
  } catch (error) { next(error); }
};

/** POST /api/ai/suggest-subject */
const suggestSubject = async (req, res, next) => {
  try {
    const { emailBody } = req.body;
    const result = await aiService.suggestSubject(emailBody);
    res.json({ subjects: result });
  } catch (error) { next(error); }
};

module.exports = {
  summarize, generateReply, toneReply, classify, explain,
  extractActions, detectSpam, detectPriority, grammarCorrect, suggestSubject,
};
