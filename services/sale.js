const Joi = require('@hapi/joi');

const Sale = require('../models/sale');
const qtt = require('../models/product');

const valid = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required()
});

const create = async (items) => {
  const { error } = valid.validate(items);

  if (error) { 
    return {
      status: 422,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' }
    };
  };

  const { productId } = items[0];
  const { name, quantity } = await qtt.getById(productId);
  const itemqtt = quantity - items[0].quantity;
  const zero = 0;

  if (itemqtt < zero) {
    return {
      status: 404,
      code: 'stock_problem',
      error: { message: 'Such amount is not permitted to sell' }
    };
  }

  await qtt.update(productId, name, itemqtt);
  const otherSale = await Sale.create(items);

  return otherSale;
};

const getAll = async () => {
  const sales = await Sale.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await Sale.getById(id);

  if (!sale) {
    return {
      status: 404,
      code: 'not_found',
      error: { message: 'Sale not found' }
    };
  }

  return sale;
};

const update = async(id, name) => {
  const { error } = valid.validate( name );

  if (error) { 
    return {
      status: 422,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' }};
  };

  const updateSale = await Sale.update(id, name);

  return updateSale;
};

const deleteById = async (id) => {
  const deletedSale = await Sale.getById(id);
  const result = await Sale.deleteById(id);

  if (!result) { 
    return {
      status: 422,
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' } };
  };

  const { productId, quantity } = deletedSale.itensSold[0];
  const product = await qtt.getById(productId);
  const itemQuantity = product.quantity + quantity;
  await qtt.update(productId, product.name, itemQuantity);

  return deletedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById
};