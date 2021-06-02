const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/products');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsControllers.create);

app.get('/products', productsControllers.getAll);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', productsControllers.update);

app.delete('/products/:id', productsControllers.erase);

app.listen(PORT, () => console.log('App funcionando'));
