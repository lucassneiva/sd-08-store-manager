function handleErrors(err, _req, res, _next) {  
  console.log(err);

  const { statusCode, message, code } = err;

  return res.status(statusCode).json({ err: { message, code }});

}
module.exports = handleErrors;
