const { ObjectId } = require("mongodb");

const idValidation = (req, res, next) => {
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    req.params.id = ObjectId(id);
    return next();
  }

  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });

};

module.exports = idValidation;
