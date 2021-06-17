const router = require('express').Router();
const SalesController = require('../controllers/salesController');

router.post('/', SalesController.create);
router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getById);


module.exports = router;
