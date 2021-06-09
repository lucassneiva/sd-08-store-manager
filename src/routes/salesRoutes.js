const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/sales', salesController.getAll);
router.post('/sales', salesController.create);

module.exports = router;