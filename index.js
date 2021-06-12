const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/productController');
const sales = require('./controllers/saleController');

const app = express();

const PORT_NUMBER = 3000;

app.use(bodyParser.json());

app.listen(PORT_NUMBER, () => console.log('Listen to port 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// PRODUCTS

app.get('/products', products.getAllProducts);
app.get('/products/:id', products.getProductbyId);
app.post('/products', products.addProduct);
app.put('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);

// SALES

app.post('/sales', sales.addSales);
app.get('/sales', sales.getAllSales);
app.get('/sales/:id', sales.getSaleById);
app.put('/sales/:id', sales.updateSale);
app.delete('/sales/:id', sales.deleteSale);

// GET ERRORS
app.use((error, _req, res, _next) => {
  console.log('-----------------------------------------------------');
  console.log(error);
  console.log('-----------------------------------------------------');
  const resp = {
    err: {
      code: error.code,
      message: error.error.message
    }
  };
  res.status(error.status).json(resp);
});
