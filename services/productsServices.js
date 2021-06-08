const productsModel = require('../models/productsModel');

const insert = async (name, quantity) => {
  if (!name || !quantity) return false;

  const data = await productsModel.insert(name, quantity);

  return data;
};

module.exports = {
  insert
};
