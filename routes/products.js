const express = require('express');

const bodyParser = require('body-parser');

const controllers = require('../controllers/ProductControllers');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', controllers.create);
router.get('/', controllers.getAllProducts);
router.get('/:id', controllers.getProductById);
router.put('/:id', controllers.updateById);
router.delete('/:id', controllers.deleteById);

module.exports = router;
