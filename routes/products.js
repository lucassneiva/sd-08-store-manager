const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const router = express.Router();

router.get('/:id', productsControllers.getProductById);
router.get('/', productsControllers.getAllProducts);
router.post('/', productsControllers.insertAProduct);
router.put('/:id', productsControllers.updateProduct);

module.exports = router;
