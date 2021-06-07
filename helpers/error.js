const error = (message, code = 'invalid_data') => {
  return {
    success: false,
    err: {
      code,
      message
    }
  };
};

module.exports = error;
