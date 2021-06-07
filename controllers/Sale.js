const rescue = require('express-rescue');
const Sale = require('../services/Sale');

const HTTP_OK = 200;
// const HTTP_Created = 201;

const getAll = rescue(async (req, res) => {
  const sales = await Sale.getAll();

  res.status(HTTP_OK).json(sales);
});

// const findById = rescue(async (req, res, next) => {
//   const { id } = req.params;

//   const productID = await Product.findById(id);

//   if (productID.error) return next(productID);

//   res.status(HTTP_OK).json(productID);
// });

const create = rescue(async (req, res, next) => {
  const items = req.body;

  const newSale = await Sale.create(items);

  if (newSale.error) return next(newSale);

  res.status(HTTP_OK).json(newSale);
});

// const update = rescue(async (req, res, next) => {
//   const { name, quantity } = req.body;
//   const { id } = req.params;

//   const updateProduct = await Product.update(id, name, quantity);

//   if (updateProduct.error) return next(updateProduct);

//   res.status(HTTP_OK).json(updateProduct);
// });

// const exclude = rescue(async (req, res, next) => {
// 	const { id } = req.params;

// 	const excludeProduct = await Product.exclude(id);

// 	if (excludeProduct.error) return next(excludeProduct);

//   res.status(HTTP_OK).json(excludeProduct);
// });

module.exports = {
  getAll,
  //  findById,
  create,
  //  update,
  //  exclude,
};