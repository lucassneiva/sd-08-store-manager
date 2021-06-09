const isValidName = (name) => {
  const size = 5;
  return name.length >= size;
};

const status_422 = 422;

const validateName = (req, res, next) => {
  const name = req.body.name;
  const validName = isValidName(name);
  if (!validName) {
    res.status(status_422).json( {
      err:{
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }});
  }
  return next();
};

const isValidQuantity = (quantity) => {
  const size = 1;
  return quantity >= size;
};

const validateQuantity = (req, res, next) => {
  const quantity = req.body.quantity;
  const validQuantity = isValidQuantity(quantity);
  if (typeof quantity !== 'number') {
    return res.status(status_422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (!validQuantity) {
    return res.status(status_422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
};

module.exports = {
  validateName,
  validateQuantity
};
