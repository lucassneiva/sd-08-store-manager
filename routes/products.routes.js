const router = require('express').Router();

const useControllers = require('../controllers/products.controller');
const { productValidations, requestValidations } = require('../middlewares');

// router.get('/', useControllers.test);

router.get('/', useControllers.list);

router.post('/', requestValidations, productValidations, useControllers.add);

router.get('/:id', useControllers.find);

router.put('/:id', requestValidations, useControllers.update);

router.delete('/:id', useControllers.remove);

module.exports = router;
