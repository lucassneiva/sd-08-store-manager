const allsales = async(req, res, next) => {
  try {
    const status = 200;
    const result = await productModel.getAll();
    res.status(status).send(results); 
  } catch (error) {console.error(error);
    const statuserr = 500;
    res.status(statuserr).json({message: error.message});

  }
};

module.exports = {
  allsales,
};