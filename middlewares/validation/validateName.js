module.exports = (req, res, next) => {
  const {name} = req.body;
  const SHORTEST_NAME_ALLOWED = 6;
  const UNPROCESSABLE = 422;

  if (name.length <= SHORTEST_NAME_ALLOWED ) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long' 
      }
    });
  }
  next();
};
