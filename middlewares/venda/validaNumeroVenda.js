const validaNumeroVenda = async (req, res, next) => {
  const corpo = req.body;
  const quantidade = corpo[0].quantity;
  const ZERO = 0;
  const QDD = 422;
  const MSG = 'Wrong product ID or invalid quantity';

  if (Number(quantidade) < ZERO) {
    next({ status: QDD, message: MSG });    
  }
  if (Number(quantidade) === ZERO) {
    next({ status: QDD, message: MSG });    
  }
  if (typeof(quantidade) !== 'number') {
    next({ status: QDD, message: MSG });    
  }

  next();
};

module.exports = validaNumeroVenda;
