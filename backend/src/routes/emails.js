const express = require('express');
const { body, query, param } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  getInbox, searchEmails, getEmail, sendEmail, replyEmail,
  toggleStar, toggleRead, trashEmail, archiveEmail,
} = require('../controllers/emailController');

const router = express.Router();

// All email routes require authentication
router.use(requireAuth);

/** GET /api/emails */
router.get('/',
  [query('maxResults').optional().isInt({ min: 1, max: 100 })],
  validate,
  getInbox
);

/** GET /api/emails/search */
router.get('/search',
  [query('q').notEmpty().withMessage('Search query is required').trim()],
  validate,
  searchEmails
);

/** GET /api/emails/:id */
router.get('/:id',
  [param('id').notEmpty().withMessage('Email ID is required')],
  validate,
  getEmail
);

/** POST /api/emails/send */
router.post('/send',
  [
    body('to').isEmail().withMessage('Valid recipient email is required').normalizeEmail(),
    body('subject').notEmpty().withMessage('Subject is required').trim(),
    body('body').notEmpty().withMessage('Email body is required').trim(),
    body('cc').optional().isEmail().normalizeEmail(),
  ],
  validate,
  sendEmail
);

/** POST /api/emails/:id/reply */
router.post('/:id/reply',
  [
    param('id').notEmpty(),
    body('threadId').notEmpty().withMessage('Thread ID is required'),
    body('to').isEmail().withMessage('Valid recipient email is required').normalizeEmail(),
    body('subject').notEmpty().trim(),
    body('body').notEmpty().withMessage('Reply body is required').trim(),
  ],
  validate,
  replyEmail
);

/** PATCH /api/emails/:id/star */
router.patch('/:id/star',
  [
    param('id').notEmpty(),
    body('starred').isBoolean().withMessage('Starred must be a boolean'),
  ],
  validate,
  toggleStar
);

/** PATCH /api/emails/:id/read */
router.patch('/:id/read',
  [
    param('id').notEmpty(),
    body('read').isBoolean().withMessage('Read must be a boolean'),
  ],
  validate,
  toggleRead
);

/** DELETE /api/emails/:id */
router.delete('/:id',
  [param('id').notEmpty()],
  validate,
  trashEmail
);

/** PATCH /api/emails/:id/archive */
router.patch('/:id/archive',
  [param('id').notEmpty()],
  validate,
  archiveEmail
);

module.exports = router;
