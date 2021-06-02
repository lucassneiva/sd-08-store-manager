const express = require('express');
const rescue = require('express-rescue');
const { productController } = require('../controllers');
const { form: { verifyForm, verifyExistProduct }} = require('../Middlewares');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', verifyForm, verifyExistProduct, rescue(productController.post));
router.put('/:id', verifyForm, productController.edit);
router.delete('/:id', productController.delete);

module.exports = router;
