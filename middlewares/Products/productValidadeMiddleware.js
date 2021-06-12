const Product = require('../../services/Products.service');
const { RESPONSE_ERROR } = require('../../common/erroTypes');

module.exports = async (req, res, next) => {
  const {name} = req.body;
  const { eSame } = RESPONSE_ERROR;
  const search  = await Product.searchByName(name);
  if (search !== null) {
    return res
      .status(eSame.status)
      .json({err: eSame.err });
  }
  next();
};
