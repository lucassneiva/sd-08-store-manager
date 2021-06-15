const STATUS_422 = 422;
const NAME_LENGTH = 5;
const MINIMUM_QUANTITY = 1;
const ID_LENGTH = 24;

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

module.exports = { checkSalesCadastre };
