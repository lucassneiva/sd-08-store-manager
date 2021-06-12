const objErrorGenerator = (statusCode, code, message) =>{
  return { 
    statusCode, 
    code,
    message,
    error: true
  };
};

module.exports = objErrorGenerator;
