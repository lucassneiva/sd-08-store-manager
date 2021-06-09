const express = require('express');

const bodyParser = require('body-parser');

const controllers = require('../controllers/SalesControllers');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', controllers.create);
router.get('/', controllers.getAllSales);
router.get('/:id', controllers.getSaleById);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.deleteById);

module.exports = router;
