const ZERO = 0;

module.exports = (action, productsToUpdate, sales) => {
  let updatedProducts;
  switch (action) {
  case 'inc':
    updatedProducts = productsToUpdate.map((prod) => {
      const movedQuantity = sales
        .filter(({ productId }) => String(productId) === String(prod._id))
        .reduce((acc, { quantity }) => acc + quantity, ZERO);
      return { ...prod, quantity: prod.quantity + movedQuantity };
    });
    return { result: updatedProducts };
  case 'dec':
    updatedProducts = productsToUpdate.map((prod) => {
      const movedQuantity = sales
        .filter(({ productId }) => String(productId) === String(prod._id))
        .reduce((acc, { quantity }) => acc + quantity, ZERO);
      if (movedQuantity > prod.quantity) throw { error:
        { code: 'stock_problem', message: 'Such amount is not permitted to sell' }};
      return { ...prod, quantity: prod.quantity - movedQuantity };
    });
    return { result: updatedProducts };
  default:
    return { error: {
      code: 'internal_error',
      message: 'Invalid action passed for "updateProduct" function' } };
  }
};