const Sale = require('../models/Sales');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  async create(request, response) {
    try {
      const sale = await Sale.insertMany({ itensSold: [...request.body] });

      return response.status(HTTP_OK_STATUS).send(...sale);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};
