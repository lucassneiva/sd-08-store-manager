module.exports = (req, _res, next) => {
  const { notFound } = req.params;
  next({
    code: 'not_found',
    message: `Method: ${req.method} - Path: '/${notFound}' is not supported`,
  });
};
