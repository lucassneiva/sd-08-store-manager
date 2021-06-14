const { ObjectId } = require('mongodb');

const idValid = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }
  return 'Validated';
};

module.exports = idValid;
