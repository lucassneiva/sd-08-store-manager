const express = require('express');
const rescue = require('express-rescue');
const { productController } = require('../controllers');
const { form: { verifyForm }} = require('../Middlewares');

const router = express.Router();

router.post('/', verifyForm, rescue(productController.post));

module.exports = router;
