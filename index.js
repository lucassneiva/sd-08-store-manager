const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

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


app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
