const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const router = express.Router();

router.post('/', productsControllers.insertAProduct);
router.get('/', productsControllers.getAllProducts);

module.exports = router;
