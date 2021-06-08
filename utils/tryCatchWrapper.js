module.exports = (callback, code = 'internal_error') => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (err) {
    console.log(err);
    next({ code, message: err.message });
  }
};
