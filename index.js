const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const DEFAULT_PORT = 3000; 
const PORT = process.env.PORT || DEFAULT_PORT;
const middlewareError = require('./middlewares/error');
const products = require('./controllers/Products');
const sales = require('./controllers/Sales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.put('/products/:id', products.updateItem);
app.get('/products/:id', products.findById);
app.delete('/products/:id',products.deleteItem);
app.get('/products', products.findAll);
app.post('/products',products.createProduct);

app.get('/sales/:id', sales.findById);
app.post('/sales', sales.createSale);
app.get('/sales', sales.findAll);



app.use(middlewareError.error);
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
