const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.delete('/:id', salesController.remove);
router.post('/', salesController.create);
router.get('/:id', salesController.getById);
router.get('/', salesController.getAll);
router.put('/:id', salesController.update);

module.exports = router;
