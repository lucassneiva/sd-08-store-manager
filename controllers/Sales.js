const Sales = require('../services/Sales');
const Products = require('../services/Products');

const code = {
  OK: 200,
  not_found: 404,
  unprocessable_entity: 422,
};

const getAll = async (_req, res) => {
  const sales = await Sales.getAll();
  res.status(code.OK).json({ sales });
};

const newSale = async (req, res) => {
  const productsArray = req.body;
  
  const update = await Products.updateQuantityPost(productsArray);

  const addNewSale = await Sales.newSale(productsArray);

  if (update.err) return res.status(code.not_found).json(update);
  res.status(code.OK).json(addNewSale);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findSale = await Sales.findById(id);

  if (findSale.err) return res.status(code.not_found).json(findSale);
  res.status(code.OK).json(findSale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const modifiedSale = req.body;
  const updateSale = await Sales.updateSale(id, modifiedSale);
  res.status(code.OK).json(updateSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const findSale = await Sales.findById(id);

  const deleteSale = await Sales.deleteSale(id);
  if (deleteSale.err) return res.status(code.unprocessable_entity).json(deleteSale);

  await Products.updateQuantityDelete(findSale);

  res.status(code.OK).json(findSale);
};

module.exports = {
  getAll,
  newSale,
  findById,
  updateSale,
  deleteSale,
};
