const express = require('express');
const bodyParser = require('body-parser');

const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');

const { validateMiddleware } = require('./schemas/ProductSchema');
const { validateSaleMiddleware } = require('./schemas/SaleSchema');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);
app.put('/products/:id', validateMiddleware, Products.updateProduct);
app.delete('/products/:id', Products.deleteProduct);
app.post('/products', validateMiddleware, Products.newProduct);

app.get('/sales', Sales.getAll);
app.post('/sales', validateSaleMiddleware, Sales.newSale);
app.get('/sales/:id', Sales.findById);
app.put('/sales/:id', validateSaleMiddleware, Sales.updateSale);
app.delete('/sales/:id', Sales.deleteSale);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
