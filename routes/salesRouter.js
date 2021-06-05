const express = require('express');
const { addsSales } = require('../controllers/salesController');
const router = express.Router();

router.post('/', addsSales);

module.exports = router;
