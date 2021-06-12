const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');


router.delete('/:id', productsController.remove);
router.post('/', productsController.create);
router.get('/:id', productsController.getById);
router.get('/', productsController.getAll);
router.put('/:id', productsController.update);

module.exports = router;