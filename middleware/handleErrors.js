// const genericError = {
//   statusCode: 500,
//   error: 'Internal Server Error',
//   message: 'An internal server error occurred'
// };

function handleErrors(err, _req, res, _next) {  

  const { statusCode, message, err: error } = err;

  return res.status(statusCode).json({ err: { message, code: error }});

}
module.exports = handleErrors;
