const mongoose = require('../database');

const SalesSchema = new mongoose.Schema({
  itensSold: [{
    productId: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  }],
});

const Sale = mongoose.model('Sale', SalesSchema);

module.exports = Sale;
