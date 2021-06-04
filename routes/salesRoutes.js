const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/', saleController.create);
router.get('/', saleController.getAll);
router.get('/:id', saleController.findById);
router.put('/:id', saleController.update);
router.delete('/:id', saleController.exclude);

module.exports = router;
