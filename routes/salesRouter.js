const express = require('express');
const {
  addsSales, getsAllSales, getsSale, updatesSale
} = require('../controllers/salesController');
const router = express.Router();

router.post('/', addsSales);

router.get('/', getsAllSales);

router.get('/:id', getsSale);

router.put('/:id', updatesSale);

module.exports = router;
