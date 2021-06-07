const middlewareError = require('./middlewareError');

const {
  validaNome,
  validaNumero,
  validaId,
  validaExiste,
} = require('../middlewares/produto');

const {
  validaNumeroVenda,
} = require('../middlewares/venda');


module.exports = {
  middlewareError,
  validaNome,
  validaNumero,
  validaId,
  validaExiste,
  validaNumeroVenda,
};
