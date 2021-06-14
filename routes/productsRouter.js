const router = require('express').Router();

const ProductsController = require('../controllers/productsController');

router.post('/', ProductsController.create);
router.get('/', ProductsController.getAll);




module.exports = router;
