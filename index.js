const express = require( 'express');

const {
  createProductController,
  getAllProductsController,
  getByIdProductsController,
  updateProductController,
  deleteProductController,
} = require('./controllers/productsCrontoller');

const {
  createSalesController,
  getByIdSalesController,
  getAllSalesController,
  updateSalesController,
} = require('./controllers/salesController');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductController);

app.get('/products/:id', getByIdProductsController);

app.get('/products', getAllProductsController);

app.put('/products/:id', updateProductController);

app.delete('/products/:id', deleteProductController);

app.post('/sales', createSalesController);

app.get('/sales', getAllSalesController);

app.get('/sales/:id', getByIdSalesController);

app.put('/sales/:id', updateSalesController);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
