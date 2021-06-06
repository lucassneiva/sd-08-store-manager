const express = require('express');
const router = express.Router();
const { createSale, listAllSales } = require('../controllers/salesController');

router.post('/', createSale);
router.get('/', listAllSales);

module.exports = router;
