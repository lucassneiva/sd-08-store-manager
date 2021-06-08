const { getByIdVendaModel } = require('../../models/venda/vendasModel');

const validaIdVenda = async (req, _res, next) => {
  const {id} = req.params;
  const QOQ = 404;
  const resp = await getByIdVendaModel(id);
  if (!resp) {
    next({ status: QOQ, message: 'Sale not found' });
  }

  next();
};

module.exports = validaIdVenda;
