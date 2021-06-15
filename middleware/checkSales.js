const STATUS_422 = 422;
const STATUS_404 = 404;
const ID_LENGTH = 24;

const {
  getSaleByID
} = require('../models/salesModels');


function checkSalesCadastre(req, res, next) {
  const sales = req.body;
  // sales.forEach( sale => {
  if( sales[0].quantity < 1 ) {
    return res.status(STATUS_422).send(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity'
        }
      }
    );
  };
  // });

  // sales.forEach( sale => {
  if( typeof sales[0].quantity !== 'number' ) {
    return res.status(STATUS_422).send(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity'
        }
      }
    );
  };
  // });

  next();
}

function checkID(req, res, next) {
  const { id } = req.params;
  if( id.length !== ID_LENGTH )
    return res.status(STATUS_422).send(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong sale ID format'
        }
      }
    );
  next();
};

async function checkIfSaleExist(req, res, next) {
  const { id } = req.params;
  console.log(id);
  const sale = await getSaleByID(id);
  console.log("atra   ", sale);
  if(!sale) {
    console.log("não existe");
    return res.status(STATUS_404).json(
      {
        'err': {
          'code': 'not_found',
          'message': 'Sale not found'
        }
      }
    );
  }
  next();
};

module.exports = { checkSalesCadastre, checkID, checkIfSaleExist };
