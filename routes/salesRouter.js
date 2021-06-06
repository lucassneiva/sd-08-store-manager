const express = require('express');
const {
  addsSales, getsAllSales, getsSale, updatesSale, deletesSale
} = require('../controllers/salesController');
const router = express.Router();

router.post('/', addsSales);

router.get('/', getsAllSales);

router.get('/:id', getsSale);

router.put('/:id', updatesSale);

router.delete('/:id', deletesSale);

module.exports = router;
