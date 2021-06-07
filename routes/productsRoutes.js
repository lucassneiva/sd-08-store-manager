const express = require('express');
const router = express.Router();

const productControler = require('../controllers/productControler');

router.get('/', productControler.allproducts);
// router.get('/:id','');
router.post('/', productControler.insertProduct);
// router.put('/:id');
// router.delete('/:id');

module.exports = router;