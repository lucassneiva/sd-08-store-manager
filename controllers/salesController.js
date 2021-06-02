const service = require('../service/salesService');
const fail = 422;
const success = 201;
const success2 = 200;

const createSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const addedSale = await service.createSale(itensSold);
    res.status(success2).json(addedSale);
  } catch (err) {
    res.status(fail).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      },
    });
  }
};

module.exports = {
  createSale,
};
