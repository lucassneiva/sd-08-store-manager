const Sale = require('../models/Sales');
const Product = require('../models/Products');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;
const MIN_QUANTITY = 0;

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
    const [{ productId }] = request.body;

    try {
      const sale = await Sale.insertMany({ itensSold: [...request.body] });

      const product = await Product.findById(productId);

      let total = await Sale.aggregate(
        [
          {
            $unwind: '$itensSold'
          },
          {
            $group:
            {
              _id: '$itensSold.productId',
              quantity: { $sum: '$itensSold.quantity' }
            }
          }
        ]
      );

      if (product.quantity - total[0].quantity > MIN_QUANTITY) {
        await Product.findByIdAndUpdate(productId, {
          quantity: product.quantity - total[0].quantity
        }, { new: true });

        return response.status(HTTP_OK_STATUS).send(...sale);
      }

      return response.status(HTTP_NOT_FOUND_STATUS).send({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell'
        }
      });
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

      const sale = await Sale.findById(id);

      const product = await Product.findById(sale.itensSold[0].productId);

      await Product.findByIdAndUpdate(product._id, {
        quantity: product.quantity + sale.itensSold[0].quantity
      }, { new: true });

      const deleteSale = await Sale.findByIdAndRemove(id);

      return response.status(HTTP_OK_STATUS).send(deleteSale);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};
