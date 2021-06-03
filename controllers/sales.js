const { response } = require('express');
const SalesServices = require('../services/sales');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;

const create = async( req, res) => {
  const itensSold = req.body;

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

const read = async (_req, res) => {
  SalesServices.read()
    .then(response => res.status(STATUS_OK).json({ sales: response}))
    .catch(err => {
      console.log(err, 'read');
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

const readById = async (req, res) => {
  const { id } = req.params;

  SalesServices.readById(id)
    .then(data => {
      res.status(STATUS_OK).json(data);
    })
    .catch((err) => {
      console.log(err, 'readById');
      res
        .status(NOT_FOUND)
        .json(
          {
            err: {
              code: 'not_found',
              message: err.message,
            }
          }
        );
    });
};

const update = async (req, res) => {
  const { id } = req.params;
  const newItensSold = req.body;

  SalesServices.update(id, newItensSold)
    .then((response) => {
      console.log(response);
      res.status(STATUS_OK).json(response);})
    .catch((err) => {
      console.log(err, 'update');
      res
        .status(UNPROCESSABLE)
        .json({
          err: {
            code: 'invalid_data',
            message: err.message
          }
        });
    });
};

const deleteSale = (req, res) => {
  const { id } = req.params;

  SalesServices.deleteSale(id)
    .then(response => {
      res
        .status(STATUS_OK)
        .json(response);
    })
    .catch(err => {
      console.log(err, 'delete');
      res
        .status(UNPROCESSABLE)
        .json({
          err: {
            code: 'invalid_data',
            message: err.message
          }
        });
    });
};

module.exports = {
  create,
  read,
  readById,
  update,
  deleteSale,
};