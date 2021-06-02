const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const {
  validateProduct,
  validateIfNameExists
} = require('../middlewares/productsMiddleware');

const router = express.Router();

router.post('/products',
  validateProduct,
  validateIfNameExists,
  productsControllers.createProduct);
router.get('/products', productsControllers.getAllProduct);

module.exports = router;
