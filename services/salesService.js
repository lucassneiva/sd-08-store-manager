const err = {
  message: 'Wrong product ID or invalid quantity'
};

const isQuantityValid = async (sales) => {
  const MIN_QUANTITY = 1;

  return sales.map((sale) => {
    if (sale.quantity < MIN_QUANTITY || typeof sale.quantity !== 'number') 
      throw new Error(err.message);
  });
};

module.exports = { isQuantityValid };
