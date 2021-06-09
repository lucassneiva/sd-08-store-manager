const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.post('/sales', salesController.create);
router.put('/sales/:id', salesController.update);
router.delete('/sales/:id', salesController.exclude);

module.exports = router;