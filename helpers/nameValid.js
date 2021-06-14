const NAME_LENGTH = 5;

const nameValid = (name) => {
  if (typeof name !== 'string' || name.length < NAME_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }
  return 'Validated';
};

module.exports = nameValid;
