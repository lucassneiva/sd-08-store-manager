const router = require('express').Router();

const ProductController = require('../controllers/productsController');

router.get('/', ProductController.getAll);




module.exports = router;
