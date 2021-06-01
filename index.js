const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.add);

app.get('/products', Products.getAll);
app.get('/products/:id', Products.getById);

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
