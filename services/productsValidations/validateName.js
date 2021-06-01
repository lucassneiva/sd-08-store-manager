const isValidName = (name) => {
  const minimumNameSize = 6;
  if (name.length < minimumNameSize) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
        status: 422,
      },
    };
  }
  return {};
};

module.exports = isValidName;
