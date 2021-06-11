const express = require('express');
require('dotenv').config();

const app = express();
// const PORT = process.env.PORT;
const PORT = 3000;

const Products = require('./controllers/ProductsController');
const Sales = require('./controllers/SalesController');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.get('/products/:id', Products.getById);
app.post('/products', Products.create);
app.put('/products/:id', Products.update);
app.delete('/products/:id', Products.remove);

app.post('/sales', Sales.create);
app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.getById);
app.put('/sales/:id', Sales.update);
app.delete('/sales/:id', Sales.remove);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));