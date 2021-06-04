const express = require('express');
const productsController = require('./controllers/products');
const salesController = require('./controllers/sales');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.findProduct);
app.post('/products', productsController.createProduct);
app.put('/products/:id', productsController.updateProduct);
app.delete('/products/:id', productsController.deleteProduct);

app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.findSale);
app.post('/sales', salesController.createSale);
app.put('/sales/:id', salesController.updateSale);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
