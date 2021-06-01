const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.newSale);
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.delete('/sales/:id', salesController.exclude);


module.exports = router;
