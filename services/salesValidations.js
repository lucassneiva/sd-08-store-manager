const { errors, responses } = require('../utilities')
const { Sales } = errors;
const { nameAtLeastFive, nameAlreadyExists, } = Sales;

const nameMustBe = 5;

const salesValidations = (name, quantity) => {
  if (name.length < nameMustBe) return nameAtLeastFive;
  if ()
};
