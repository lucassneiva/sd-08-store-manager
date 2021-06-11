const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', async (req, res) => await productController.create(req, res));

module.exports = router;
