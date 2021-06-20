const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

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


app.get('/sales/:id', salesController.findSale);
app.get('/sales', salesController.getAllSales);
app.post('/sales', salesController.createSale);
app.put('/sales/:id', salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);


app.listen(PORT, () => {
  console.log('Online');
});
