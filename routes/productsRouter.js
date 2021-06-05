const express = require('express');
const {
  getAll, add, getById, update, exclude
} = require('../controllers/productsController');

const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getById);
router.post('/products', add,);
router.put('/products/:id', update);
router.delete('/products/:id', exclude);

module.exports = router;
