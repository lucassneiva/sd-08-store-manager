const nameExist = (nameResult) => {
  const ZERO = 0;
  if (nameResult.length > ZERO) return false;

  return true;
};
const quantityIsNumber = (quantity) => {
  if (typeof quantity !== 'number') return false;


  return true;
};
const validInsertQuantity = (quantity) => {
  if (!quantity || quantity < 1) return false;

  return true;
};


const validName = (name) => {
  const MIN_CHARACTERS_NAME = 5;

  if (!name || name.length < MIN_CHARACTERS_NAME) return false;

  return true;
};

/* const validProduct = (id) => {
  const result = null;
  if (id.length > result) return false;
  return true;
  
} */

module.exports = {nameExist,quantityIsNumber,validInsertQuantity,validName}; 