const err = {
  message: 'Wrong product ID or invalid quantity'
};

const verifyQuantity = async (requestSales) => {
  const one = 1;

  return requestSales.map((sale) => {
    if (sale.quantity < one || typeof sale.quantity !== 'number') 
      throw new Error(err.message);
  });
};

module.exports = { verifyQuantity };