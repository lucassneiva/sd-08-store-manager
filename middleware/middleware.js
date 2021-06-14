const { findProduct } = require('../models/models');

const STATUS_422 = 422;
const NAME_LENGTH = 5;
const MINIMUM_QUANTITY = 1;
const ID_LENGTH = 24;

async function checkProduct(req, res, next) {
  const {name, quantity } = req.body;
  if ( name.length < NAME_LENGTH ) {
    return res.status(STATUS_422).json(
      {
        'err': {
          'code': 'invalid_data',
          'message': '\"name\" length must be at least 5 characters long'
        }
      }
    );
  }

  const productFinded = await findProduct({name});

  if (productFinded) {
    return res.status(STATUS_422).json(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Product already exists'
        }
      }
    );
  }

  if (quantity < MINIMUM_QUANTITY) {
    return res.status(STATUS_422).json(
      {
        'err': {
          'code': 'invalid_data',
          'message': '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if ( typeof quantity !== 'number') {
    return res.status(STATUS_422).json(
      {
        'err': {
          'code': 'invalid_data',
          'message': '\"quantity\" must be a number'
        }
      }
    );
  }

  next();
}

function checkID(req, res, next) {
  const { id } = req.params;
  if( id.length !== ID_LENGTH )
    return res.status(STATUS_422).send(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong id format'
        }
      }
    );
  next();
};

module.exports = { checkProduct, checkID };
