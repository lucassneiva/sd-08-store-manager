const saveMe = (callback) => async (...args) => {
  try {
    return callback(...args);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = saveMe;
