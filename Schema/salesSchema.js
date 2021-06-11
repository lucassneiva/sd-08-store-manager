// const { findByName } = require('../models/productsModel');
const QUANTITY_ZERO = 0;

const validate = async (itensSold) => {
  const errors = itensSold.map(({_productId, quantity}) => {
    if (typeof quantity === 'string') return 1;
    if (quantity <= QUANTITY_ZERO) return 1;
    return QUANTITY_ZERO;
  });

  if (
    errors
      .reduce((total, numero) => total + numero, QUANTITY_ZERO) > QUANTITY_ZERO) return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };
  return;
};

// const productExists = async (name) => {
//   if (await findByName(name)) return {
//     status: 422,
//     err: {
//       code: 'invalid_data',
//       message: 'Product already exists',
//     }
//   };
//   return;
// };

module.exports = {
  validate
};
