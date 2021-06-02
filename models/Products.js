const mongoose = require('../database');

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  }
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;
