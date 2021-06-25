const { postProduct } = require('../controllers/productsController');

const express = require('express');
const router = express.Router();

router.post('/', postProduct);

module.exports = router;
