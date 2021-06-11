const PRODUCT = {
  _id: '60beb13dd17ae2dec95b598f',
  name: 'Bola de futebol',
  quantity: 10,
};
const OTHER_PRODUCT = {
  _id: '60b6f3afb16f873447e04cf3',
  name: 'Bola de beisebol',
  quantity: 10,
};
const GET_ALL_PRODUCTS = [
  {
    _id: '60beb13dd17ae2dec95b598f',
    name: 'Bola de futebol',
    quantity: 10,
  },
];
const SALE = {
  itensSold: [
    {
      productId: '60beb13dd17ae2dec95b598f',
      quantity: 3,
    },
  ],
  _id: '60bee1b929ec702d7ba5946a',
};
const GET_ALL_SALES = [
  {
    itensSold: [
      {
        productId: '60beb13dd17ae2dec95b598f',
        quantity: 3,
      },
    ],
    _id: '60bee1b929ec702d7ba5946a',
  },
];

const VALID_PRODUCT_ID = '60beb13dd17ae2dec95b598f';
const VALID_SALE_ID = '60bee1b929ec702d7ba5946a';
const INVALID_ID = '9999';

const NOT_FOUND = 'not_found';
const INVALID_DATA = 'invalid_data';
const STOCK_PROBLEM = 'stock_problem';

const INVALID_NAME = '"name" length must be at least 5 characters long';
const INVALID_QNT = '"quantity" must be larger than or equal to 1';
const INVALID_QNT_FORMAT = '"quantity" must be a number';
const INVALID_QNT_SOLD = 'Such amount is not permitted to sell';
const INVALID_ID_MESSAGE = 'Wrong id format';
const INVALID_SALE_ID_MESSAGE = 'Wrong sale ID format';
const PRODUCT_EXISTS = 'Product already exists';
const SALE_NOT_FOUND = 'Sale not found';
const WRONG_SALE_DATA = 'Wrong product ID or invalid quantity';

module.exports = {
  PRODUCT,
  OTHER_PRODUCT,
  GET_ALL_PRODUCTS,
  SALE,
  GET_ALL_SALES,
  VALID_PRODUCT_ID,
  VALID_SALE_ID,
  INVALID_ID,
  NOT_FOUND,
  INVALID_DATA,
  STOCK_PROBLEM,
  INVALID_NAME,
  INVALID_QNT,
  INVALID_QNT_FORMAT,
  INVALID_QNT_SOLD,
  INVALID_ID_MESSAGE,
  INVALID_SALE_ID_MESSAGE,
  PRODUCT_EXISTS,
  SALE_NOT_FOUND,
  WRONG_SALE_DATA,
};
