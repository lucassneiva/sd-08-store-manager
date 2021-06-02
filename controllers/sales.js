const { response } = require('express');
const SalesServices = require('../services/sales');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const UNPROCESSABLE = 422;

const create = async( req, res) => {
  const itensSold = req.body;
  console.log(itensSold);

  SalesServices.create(itensSold)
    .then((response) => res.status(STATUS_OK).json(response))
    .catch((err) => {
      console.log(err);
      res
        .status(UNPROCESSABLE)
        .json(
          {
            err: {
              code: 'invalid_data',
              message: err.message
            }
          }
        );
    });
};

module.exports = {
  create
};