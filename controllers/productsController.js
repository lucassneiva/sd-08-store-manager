const { addProduct } = require('../services/products');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const postProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const result = await addProduct(name, quantity);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }
    
    return res
      .status(HTTP_STATUS_CREATED)
      .send(result);
  } catch (error) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
};

module.exports = { postProduct };
