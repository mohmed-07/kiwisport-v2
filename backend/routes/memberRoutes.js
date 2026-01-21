const express = require('express');
const router = express.Router();
const { addMember } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addMember);

module.exports = router;