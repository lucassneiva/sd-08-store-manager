const { 
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../services/productServices');

const {
  UNPROCESSABLE,
  CREATED,
  OK
} = require('./constants');

const addsProduct = async(req, res) => {
  const { name, quantity } = req.body;
  const addedProduct = await addProduct(name, quantity);
  if(addedProduct.err) {
    return res.status(UNPROCESSABLE).json(addedProduct);
  };
  res.status(CREATED).json(addedProduct);
};

const getsAllProducts = async(_req, res) => {
  const allProducts = await getAllProducts();
  return res.status(OK).json({products: allProducts});
};

const getsProductsById = async(req, res) => {
  const {id} = req.params;
  const productById = await getProductById(id);
  
  if(productById.err) {
    return res.status(UNPROCESSABLE).json(productById);
  }
  res.status(OK).json(productById);
};

const updatesProduct = async(req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;

  const updatedProduct = await updateProduct(id, name, quantity);

  if(updatedProduct.err) return res.status(UNPROCESSABLE).json(updatedProduct);

  res.status(OK).json(updatedProduct);
};

const deletesProduct = async(req, res) => {
  const {id} = req.params;
  const deletedProduct = await deleteProduct(id);

  if(deletedProduct.err) return res.status(UNPROCESSABLE).json(deletedProduct);

  res.status(OK).json(deleteProduct);
};

module.exports = {
  addsProduct,
  getsAllProducts,
  getsProductsById,
  updatesProduct,
  deletesProduct,
};
