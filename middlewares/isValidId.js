const { ObjectId } = require('mongodb');
const {
  resolveRequestProduct, resolveRequestSales } = require('../schema/resolveRequest');

const isValidId = async (req, _res, next) => {
  const { id } = req.params;
  const { path } = req.route;
  if ((!id || !ObjectId.isValid(id)) && path === '/sales/:id') {
    return next(resolveRequestSales({ sales: { idInvalid: true }}));
  }
  if (!id || !ObjectId.isValid(id)) return next(resolveRequestProduct('invalid_id'));
  return next(); 
};

module.exports = isValidId;
