const UNPROCESSABLE_ENTITY_STATUS = 422;

const quantityValidationInArray = (req, res, next) => {
  const array = req.body;
  console.log(array);

  const invalidObjects = array
    .find(({ quantity }) => typeof quantity !== 'number' || quantity <= 0);

  if (invalidObjects) {
    res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: "invalid_data",
        message: "Wrong product ID or invalid quantity",
      },
    });
  }

  return next();
};

module.exports = quantityValidationInArray;
