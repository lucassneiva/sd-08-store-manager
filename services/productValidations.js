const { errors, responses } = require('../utilities');
const { Products } = errors;
// const { nameAtLeastFive, nameAlreadyExists, quantityMustBeANumber, quantityOneOrMore } = Products;

const nameMustBe = 5;
const minimumQuantity = 1;

const productsValidations = (name, quantity) => {
  if (name.length < nameMustBe) return Products.nameAtLeastFive;
  if (typeof quantity !== 'number') return Products.quantityMustBeANumber;
  if (quantity < minimumQuantity) return Products.quantityOneOrMore;
};
