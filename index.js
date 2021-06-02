const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');
const Middlewares = require('./middlewares');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.newProduct);
app.get('/products', ProductsController.getAllProducts);
app.get('/products/:id', ProductsController.getProductById);
app.put('/products/:id', ProductsController.updateProductById);
app.delete('/products/:id', ProductsController.deleteProductById);

app.post('/sales', SalesController.addNewSale);

app.use(Middlewares.error);

app.listen('3000', () => console.log('App Online On Port 3000'));