const MIN_LENGTH = 5;

const validate = async (name, _quantity) => {
  if (name.length < MIN_LENGTH) return {
    code: 422,
    message: '"name" length must be at least 5 characters long',
  };
};

module.exports = {
  validate
};
