const router = require('express').Router();
const indexRouter = require('./indexRouter');
const ProductsRouter = require('./ProductsRouter');
const SalesRouter = require('./SalesRouter');

router.use('/', indexRouter);
router.use('/products', ProductsRouter);
router.use('/sales', SalesRouter);

module.exports = router;
