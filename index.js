const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = '3000';
const products = require('./controllers/productController');
const sales = require('./controllers/salesController');
const service = require('./services/productServices');
const {
  productsRequestValidate,
  productsSearchValidate } = require('./services/productValidations');
const {
  salesRequestValidate,
  saleIdFound,
  saleIdRequest } = require('./services/salesValidations');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send(`Porta ${PORT} funfando`);
});

// Products endpoints:
app.post('/products', productsRequestValidate, products.create);
app.get('/products', products.getAll);
app.get('/products/:id', productsSearchValidate, products.search);
app.put('/products/:id',
  productsRequestValidate, productsSearchValidate, products.update);
app.delete('/products/:id', productsSearchValidate, products.remove);

// Sales endpoints:
app.post('/sales', salesRequestValidate, sales.create);
app.get('/sales', sales.getAll);
app.get('/sales/:id', saleIdFound, sales.search);
app.put('/sales/:id', salesRequestValidate, saleIdFound, sales.update);
app.delete('/sales/:id', saleIdRequest, sales.remove);

// testing routes
// app.post('/test', products.create);

app.listen(PORT, () => console.log(`Porta ${PORT} funfando`));
