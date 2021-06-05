const router = require('express').Router();
const indexRouter = require('./indexRouter');
const ProductsRouter = require('./ProductsRouter');

router.use('/', indexRouter);
router.use('/products', ProductsRouter);

module.exports = router;
