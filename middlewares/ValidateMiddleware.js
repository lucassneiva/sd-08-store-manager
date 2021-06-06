const ProductService = require('../services/ProductsService');
const ProductSchema = require('../schemas/ProductSchema');

const validateProduct = async(request, response, next) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  let data = null;

  if(!id) data = ProductService.getAll;

  const { code, message } = await ProductSchema.validate(name, quantity, data);

  if (message) return response.status(code).json({
    err: { code: 'invalid_data', message } });

  next();
};

module.exports = {
  validateProduct,
};
