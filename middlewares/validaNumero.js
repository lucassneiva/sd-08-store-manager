const validaNumero = async (req, res, next) => {
  const quantidade = req.body.quantity;
  const ZERO = 0;
  const OBRIGATORIO = 422;

  if (Number(quantidade) < ZERO) {
    return res.status(OBRIGATORIO)
      .json({ err: {
        code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
      }});    
  }
  if (Number(quantidade) == ZERO) {
    return res.status(OBRIGATORIO)
      .json({ err: {
        code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
      }});    
  }
  if (typeof(quantidade) !== 'number') {
    return res.status(OBRIGATORIO)
      .json({ err: {
        code: 'invalid_data', message: '"quantity" must be a number'
      }});    
  }

  next();
};

module.exports = validaNumero;
