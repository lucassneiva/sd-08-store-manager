const invalid_data_code = 422;
const default_error_code = 400;
const not_found = 404;

const error = (err, _req, res, next) => {
  switch(err.code) {
  case 'invalid_data':
    return res.status(invalid_data_code).json({err});
  case 'not_found':
    return res.status(not_found).json({err});
  default: return res.status(default_error_code).json({
    code: default_error_code,
    message: 'Algo de errado aconteceu',
  });
  };
};

module.exports = error;