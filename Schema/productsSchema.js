const MIN_LENGTH = 5;

const validate = async (name, _quantity) => {
  if (name.length < MIN_LENGTH) return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  };
  return;
};

module.exports = {
  validate
};
