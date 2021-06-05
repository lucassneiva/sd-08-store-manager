const validLength = (name) => {
  const MINLENGTH = 5;
  return name.length >= MINLENGTH;
};

const validAmount = (amount) => {
  const NULO = 0;
  const amountNumber = Number(amount);
  if (isNaN(amountNumber)) {
    return 'IsNaN';
  } if (amountNumber <= NULO) {
    return 'IsLessOrEqual0';
  }
};

module.exports = {
  validLength,
  validAmount
};