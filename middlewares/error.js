const UNPROCESSABLE_ENTITY_STATUS = 422;
module.exports = (err, req, res, next) => {
  return res.status(UNPROCESSABLE_ENTITY_STATUS).json(err);
};
