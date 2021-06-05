const ProductsService = require('../services/ProductsService');
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;

const registerProduct = async (req, resp) => {
  const { name, quantity } = req.body;

  const product =  await ProductsService.registerProduct(name, quantity);

  if(product.code) return resp.status(product.code).json(product.message);

  resp.status(HTTP_STATUS_CREATED).json(product);
};

const getAllProducts = async (_req, resp) => {
  const allProducts = await ProductsService.getAllProducts();

  resp.status(HTTP_STATUS_OK).json(allProducts);
};

const getProductByID = async (req, resp) => {
  const { id } = req.params;

  const productId = await ProductsService.getProductByID(id);
  if(productId.code) return resp.status(productId.code).json(productId.message);

  resp.status(HTTP_STATUS_OK).json(productId);
};

const updateProductByID = async (req, resp) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdate = await ProductsService.updateProductByID(id, name, quantity);
  if(productUpdate.code) return resp.status(productUpdate.code)
    .json(productUpdate.message);

  resp.status(HTTP_STATUS_OK).json(productUpdate);
};

const deleteProductByID = async (req, resp) => {
  const { id } = req.params;

  const productdelete = await ProductsService.deleteProductByID(id);
  if(productdelete.code) return resp.status(productdelete.code)
    .json(productdelete.message);

  resp.status(HTTP_STATUS_OK).json(productdelete);
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID
};
