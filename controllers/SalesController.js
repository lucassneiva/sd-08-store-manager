const Sale = require('../models/Sales');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  async index(_request, response) {
    try {
      const sales = await Sale.find();

      return response.status(HTTP_OK_STATUS).send({ sales });
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  async indexOne(request, response) {
    const { id } = request.params;

    try {
      const sale = await Sale.findById(id);

      return response.status(HTTP_OK_STATUS).send(sale);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  async create(request, response) {
    try {
      const sale = await Sale.insertMany({ itensSold: [...request.body] });

      return response.status(HTTP_OK_STATUS).send(...sale);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;

      const sale = await Sale.findByIdAndUpdate(id, {
        itensSold: [...request.body]
      }, { new: true });

      return response.status(HTTP_OK_STATUS).send(sale);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const sale = await Sale.findByIdAndRemove(id);

      return response.status(HTTP_OK_STATUS).send(sale);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};
