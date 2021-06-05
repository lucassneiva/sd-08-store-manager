/* eslint-disable no-magic-numbers */
// hello-msc/middlewares/error.js
module.exports = (err, req, res, _next) => {
  // Qualquer erro será recebido sempre por esse middleware, então a primeira coisa que fazemos
  // é identificar qual o tipo do erro.

  // Se for um erro do Joi, sabemos que trata-se de um erro de validação
  if (err.isJoi) {
    console.log(err);
    // Logo, respondemos com o status 400 Bad Request
    return res.status(422)
      // E com a mensagem gerada pelo Joi
      .json({ err: { message: err.details[0].message, code: 'invalid_data' } });
  }

  // Caso não seja um erro do Joi, pode ser um erro de domínio ou um erro inesperado.
  // Construímos, então, um mapa que conecta um erro de domínio a um status HTTP.
  const statusByErrorCode = {
    notFound: 404, // Erros do tipo `notFound` retornam status 404 Not Found
    alreadyExists: 409, // Erros do tipo `alreadyExists` retornam status 409 Conflict
    // Podemos adicionar quantos códigos novos desejarmos
  };

  // Buscamos o status adequado para o erro que estamos tratando.
  // Caso não haja um status para esse código, assumimos que é
  // um erro desconhecido e utilizamos o status 500 Internal Server Error
  const status = statusByErrorCode[err.code] || 500;

  // Por último, retornamos o status e a mensagem de erro para o client
  res.status(status).json({ error: { message: err.message } });
};
