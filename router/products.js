const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const ProductsController = require('../controllers/Products');

router.post('/', middlewares.validateProduct ,ProductsController.create);
router.get('/:id', ProductsController.getById);
router.get('/', ProductsController.getAll);
router.put('/:id', middlewares.validateProduct, ProductsController.edit);
router.delete('/:id', ProductsController.remove);

module.exports = router;
