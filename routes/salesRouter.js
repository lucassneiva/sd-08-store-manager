const express = require('express');
const {
  getAll, add, getById, update, exclude
} = require('../controllers/salesController');

const router = express.Router();

router.get('/sales', getAll);
router.get('/sales/:id', getById);
router.post('/sales', add);
router.put('/sales/:id', update);
router.delete('/sales/:id', exclude);

module.exports = router;
