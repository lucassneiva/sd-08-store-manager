const ProductsModel = require('../models/products');

const isNameInvalid = (name) => {
  return ProductsModel.read()
    .then((data) => {
      const MIN_LENGTH_NAME = 6;
      const thisNameExists = data.some((product) => product.name === name);
  
      if(name.length < MIN_LENGTH_NAME) {
        return {
          errorStatus: 422,
          json: {
            err: {
              code: 'invalid_data',
              message: '\"name\" length must be at least 5 characters long'
            }
          },
        };
      }
  
      if(thisNameExists) {
        return {
          errorStatus: 422,
          json: {
            err: {
              code: 'invalid_data',
              message: 'Product already exists'
            }
          },
        };
      }
  
      return false;
    });
};
// const isNameInvalid = async (name) => {
//   const products = await ProductsModel.read();
//   const MIN_LENGTH_NAME = 6;
//   const thisNameExists = await products.some((product) => product.name === name);

//   if(name.length < MIN_LENGTH_NAME) {
//     return {
//       errorStatus: 422,
//       json: {
//         err: {
//           code: 'invalid_data',
//           message: '\"name\" length must be at least 5 characters long'
//         }
//       },
//     };
//   }

//   if(thisNameExists) {
//     return {
//       errorStatus: 422,
//       json: {
//         err: {
//           code: 'invalid_data',
//           message: 'Product already exists'
//         }
//       },
//     };
//   }

//   return false;
// };

const isQuantityInvalid = (quantity) => {
  const MIN_QUANTITY = 1;

  if(typeof quantity !== 'number') {
    return {
      errorStatus: 422,
      json: {
        err: {
          code: 'invalid_data',
          message: '\"Quantity\" must be a number'
        }
      },
    };
  }

  if(quantity < MIN_QUANTITY) {
    return {
      errorStatus: 422,
      json: {
        err: {
          code: 'invalid_data',
          message: '\"Quantity\" must be larger than or equal to 1'
        }
      },
    };
  }

  return false;
};





const create =  async ({name, quantity}) => {

  const invalidName = await isNameInvalid(name);

  if (invalidName) return invalidName;

  const invalidQuantity = isQuantityInvalid(quantity);
  if(invalidQuantity) return invalidQuantity;

  const productInserted = await ProductsModel
    .create({name, quantity});

  return productInserted;
};

const read = () => ProductsModel.read();

module.exports = {
  create,
  read,
};