const Products = require('../models/Products');

const create = async (name, quantity) => await Products.create(name, quantity);
const searchByName = async (name) => await Products.searchByName(name);

module.exports = {create, searchByName};
