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
};

module.exports = idValid;
