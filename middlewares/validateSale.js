module.exports = (sale) => {
  const err = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };
  for (let index = 1; index <= sale.length; index += 1) {
    const { productId, quantity } = sale[index - 1];
    if (typeof quantity === 'string' || quantity < 1) return err;
  }
  return null;
};
