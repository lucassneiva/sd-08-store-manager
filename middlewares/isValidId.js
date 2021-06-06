const { ObjectId } = require('mongodb');
const isValid = require('../schema/resolveRequest');

const isValidId = async (req, _res, next) => {
  const { id } = req.params;
  if (!id || !ObjectId.isValid(id)) return next(isValid('invalid_id'));
  return next(); 
};

module.exports = isValidId;
