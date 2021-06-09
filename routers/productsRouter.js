const express = require('express');
const products = require('../controllers/productController');

const router = express.Router();

// não remova esse endpoint, e para o avaliador funcionar
router.get('/', (_request, response) => {
  response.send();
});

// router.get('/', productController.getAllProducts ); - exemplo de como usar o controller
// Criar produtos
router.post('/products', products.createProducts);

module.exports = router;