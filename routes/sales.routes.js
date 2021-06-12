const router = require('express').Router();

const useControllers = require('../controllers/Sales');
const { requestValidations } = require('../middlewares/Sales');

router.post('/', requestValidations, useControllers.add);

router.get('/', useControllers.list);

router.get('/:id', useControllers.find);

router.put('/:id', requestValidations, useControllers.update);

router.delete('/:id', useControllers.remove);

module.exports = router;
