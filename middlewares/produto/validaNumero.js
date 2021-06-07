const validaNumero = async (req, res, next) => {
  const quantidade = req.body.quantity;
  const ZERO = 0;
  const QDD = 422;

  if (Number(quantidade) < ZERO) {
    next({ status: QDD, message: '"quantity" must be larger than or equal to 1' });    
  }
  if (Number(quantidade) == ZERO) {
    next({ status: QDD, message: '"quantity" must be larger than or equal to 1' });    
  }
  if (typeof(quantidade) !== 'number') {
    next({ status: QDD, message: '"quantity" must be a number'});    
  }

  next();
};

module.exports = validaNumero;
