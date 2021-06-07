const { getById } = require('../../models/produto/produtosModel');

const validaId = async (req, _res, next) => {
  const {id} = req.params;
  const QDD = 422;
  const resp = await getById(id);
  if (!resp) {
    next({ status: QDD, message: 'Wrong id format' });
  }

  next();
};

module.exports = validaId;
