const express = require('express');
const app = express();
const productsController = require('./controllers/productsController');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', productsController.add);

app.listen(port, () => console.log('App ouvindo a porta 3000!'));
