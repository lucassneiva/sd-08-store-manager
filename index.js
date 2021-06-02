const express = require( 'express');

const {
  createProductController,
  getAllProductsController,
  getByIdProductsController,
  updateProductController,
  deleteProductController,
} = require('./controllers/productsCrontoller');

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

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
