const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/productController');

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
app.post('/products', products.addProduct);

// GET ERRORS
app.use((error, _req, res, _next) => {
  console.log(error);
  const resp = {
    err: {
      code: error.code,
      message: error.error.message
    }
  };
  res.status(error.status).json(resp);
});
