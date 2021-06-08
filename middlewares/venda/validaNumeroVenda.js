const validaNumeroVenda = async (req, _res, next) => {
  const corpo = req.body;
  const ZERO = 0;
  for (let index = ZERO; index < corpo.length; index++) {
    const quantidade = corpo[index].quantity;
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
  }

  next();
};

module.exports = validaNumeroVenda;
