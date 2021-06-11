const { findByName } = require('../services/products.service');
const { ERROR_TYPES } = require('../common/erroTypes');

module.exports = async (req, res, cb) => {
  const { name } = req.body;
  const { eSame } = ERROR_TYPES;
  const searchResult = await findByName(name);
  if (searchResult) {
    return res.status(eSame.status).json({ err: eSame.err });
  }
};
