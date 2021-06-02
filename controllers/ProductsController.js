const Product = require('../models/Products');

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  async create(request, response) {
    try {
      const product = await Product.create(request.body);

      return response.status(HTTP_CREATED_STATUS).send(product);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};
