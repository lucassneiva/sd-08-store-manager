const Product = require('../../services/Products');
const { ERROR_TYPES } = require('../../utils/consts');

module.exports = async (req, res, next) => {
  const {name} = req.body;
  const { eSame } = ERROR_TYPES;
  const search  = await Product.searchByName(name);
  if (search !== null) {
    return res
      .status(eSame.status)
      .json({err: eSame.err });
  }
  next();
};
