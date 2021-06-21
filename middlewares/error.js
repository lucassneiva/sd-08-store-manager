const { UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,NOT_FOUND } = require('../services/variableStatus');

const error = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data',message: err.details[0].message } });
  }
  
  if (err.code == NOT_FOUND) {
    return res.status(NOT_FOUND)
      .json({ err: { code: 'not_found',message: err.message } });
  }


  if (err.code == 'stock_problem') {
    return res.status(NOT_FOUND)
      .json({ err: { code: 'stock_problem',message: err.message } });
  }
  

  //  console.log(err.code);
  return res.status(err.code || INTERNAL_SERVER_ERROR)
    .json({ err: { code: 'invalid_data', message: err.message } });;

};

module.exports = {
  error,
};