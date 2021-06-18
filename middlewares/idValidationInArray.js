const { getProductsByIds } = require('../services/productService');

const UNPROCESSABLE_ENTITY_STATUS = 422;

const idValidationInArray = async (req, res, next) => {
  const array = req.body;
  const productIds = array.map((id) => id.productId);
  const products = await getProductsByIds(productIds);

  // const invalidId = array.find(({ productId }) => {
  //   const res = allProducts.find(({ _id: id }) => {
  //     const resu = id.toString() === productId;
  //     return resu;
  //   });
  //   return !res;
  // });
  // console.log('invalidId', invalidId);

  // const invalidID = array.filter(
  //   async ({ productId }) => {
  //     const isValidId = ObjectId.isValid(productId);
  //     const product = await getProductById(ObjectId(productId));
  //     // console.log('productId', productId, typeof productId);
  //     // console.log('isValidId', isValidId, typeof isValidId);
  //     // console.log('product', product, typeof product);
  //     const res = !(isValidId && product);
  //     console.log('res', res, typeof res);
  //     return res;
  //   }
  // );

  // console.log('invalidID', invalidID, typeof invalidID);
  // console.log('invalidID', invalidID, typeof invalidID);
  // console.log('invalidID', invalidID, typeof invalidID);
  // console.log('invalidID', invalidID, typeof invalidID);

  // console.log('invalidIDs', invalidIDs, 'aqui');
  if (productIds.length !== products.length) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  return next();
};

module.exports = idValidationInArray;
