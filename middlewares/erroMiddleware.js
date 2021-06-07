module.exports = (err, res, req, next) => {
  const ERROR = 500;
  res.status(ERROR).json({error: 'deu ruim'});
};
