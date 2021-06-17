const router = require('express').Router();

const ProductsController = require('../controllers/productsController');

router.post('/', ProductsController.create);
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.exclude);




module.exports = router;
