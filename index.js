const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productsController.findProduct);

app.get('/products', productsController.getAllProducts);

app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);


app.listen(PORT, () => {
  console.log('Online');
});
