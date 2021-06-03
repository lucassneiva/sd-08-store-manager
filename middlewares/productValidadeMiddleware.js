const Product = require('../services/Products');
const { STATUS_422 } = require('../utils/consts');

module.exports = async (req, res, next) => {
  const {name} = req.body;
  const search  = await Product.searchByName(name);
  if (search !== null) {
    return res
      .status(STATUS_422)
      .json({err: { code: 'invalid_data', message: 'Product already exists' } });
  }
  next();
};
