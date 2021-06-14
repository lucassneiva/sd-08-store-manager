const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.addProducts);

app.get('/products', ProductsController.getAll);

app.get('/products/:id', ProductsController.getAllById);

app.put('/products/:id', ProductsController.updateProduct);

app.delete('/products/:id', ProductsController.deleteProduct);

app.post('/sales', SalesController.addSale);

app.get('/sales', SalesController.getAll);

app.get('/sales/:id', SalesController.getAllById);

app.put('/sales/:id', SalesController.updateSale);

app.delete('/sales/:id', SalesController.deleteSale);

app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
