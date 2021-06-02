const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.findById);
router.put('/:id', productController.update);

module.exports = router;
