const router = require('express').Router();
const ProductsController = require('../controllers/ProductsController');

router.post('/', ProductsController.registerProduct);
router.get('/', ProductsController.getAllProducts);
router.get('/:id',ProductsController.getProductByID);
router.put('/:id', ProductsController.updateProductByID);
router.delete('/:id', ProductsController.deleteProductByID);

module.exports = router;
