const { errors, responses } = require('../utilities')
const { Products, Sales } = errors;
const { nameAtLeastFive } = Products;

const nameMustBe = 5;

const validations = (name, quantity) => {
  if (name.length < nameMustBe) return { response: nameAtLeastFive.response }
}
