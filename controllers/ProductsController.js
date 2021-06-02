const Product = require('../models/Products');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  async index(_request, response) {
    try {
      const products = await Product.find();

      return response.status(HTTP_OK_STATUS).send({ products });
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  async indexOne(request, response) {
    try {
      const { id } = request.params;

      const product = await Product.findOne({ _id: id });

      return response.status(HTTP_OK_STATUS).send(product);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  async create(request, response) {
    try {
      const product = await Product.create(request.body);

      return response.status(HTTP_CREATED_STATUS).send(product);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};
