const express = require('express');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { getTemplates, createTemplate, updateTemplate, deleteTemplate } = require('../controllers/templateController');

const router = express.Router();
router.use(requireAuth);

const templateValidators = [
  body('name').notEmpty().withMessage('Template name is required').trim(),
  body('body').notEmpty().withMessage('Template body is required').trim(),
  body('category').optional().isIn(['general', 'reply', 'follow-up', 'introduction', 'other']),
];

router.get('/', getTemplates);
router.post('/', templateValidators, validate, createTemplate);
router.put('/:id', templateValidators, validate, updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
