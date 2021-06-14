const router = require('express').Router();

const ProductsController = require('../controllers/productsController');

router.post('/', ProductsController.create);




module.exports = router;
