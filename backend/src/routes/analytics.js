const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { getAnalytics } = require('../controllers/analyticsController');

const router = express.Router();
router.use(requireAuth);

router.get('/', getAnalytics);

module.exports = router;
