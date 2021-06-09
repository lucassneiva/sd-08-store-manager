const unprocessableEntity = 422;
const code = 'invalid_data';

module.exports = (err, _req, res, _next) => {
  if (err) {
    return res.status(unprocessableEntity).json({ 
      err: {
        code,
        message: err,
      }
    });
  }
};
