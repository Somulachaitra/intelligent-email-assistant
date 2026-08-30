const express = require('express');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  summarize, generateReply, toneReply, classify, explain,
  extractActions, detectSpam, detectPriority, grammarCorrect, suggestSubject,
} = require('../controllers/aiController');

const router = express.Router();
router.use(requireAuth);

const emailBodyValidator = body('emailBody').notEmpty().withMessage('Email body is required').trim();

router.post('/summarize', [emailBodyValidator], validate, summarize);
router.post('/reply', [emailBodyValidator], validate, generateReply);
router.post('/tone-reply', [
  emailBodyValidator,
  body('tone').isIn(['professional', 'friendly', 'formal', 'concise']).withMessage('Invalid tone'),
], validate, toneReply);
router.post('/classify', [emailBodyValidator], validate, classify);
router.post('/explain', [emailBodyValidator], validate, explain);
router.post('/extract-actions', [emailBodyValidator], validate, extractActions);
router.post('/detect-spam', [emailBodyValidator], validate, detectSpam);
router.post('/detect-priority', [emailBodyValidator], validate, detectPriority);
router.post('/grammar', [
  body('emailBody').notEmpty().withMessage('Email body is required').trim(),
], validate, grammarCorrect);
router.post('/suggest-subject', [
  body('emailBody').notEmpty().withMessage('Email body is required').trim(),
], validate, suggestSubject);

module.exports = router;
