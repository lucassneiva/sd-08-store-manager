const express = require('express');
const { addsSales, getsAllSales, getsSale } = require('../controllers/salesController');
const router = express.Router();

router.post('/', addsSales);

router.get('/', getsAllSales);

router.get('/:id', getsSale);

module.exports = router;
