const Service = require('../services/SalesServices');

const httpSuccess = 200;

const create = async (req, res) => {
  try {
    const result = await Service.create([{itensSold: req.body}]);
    const newResult = {
      _id: result[0]._id,
      itensSold: result[0].itensSold
    };
    res.status(httpSuccess).json(newResult);
  }catch (e) {
    const data = JSON.parse(e.message);
    res.status(data.http).json({err: data.err});
  }
};

module.exports = {
  create,
};
