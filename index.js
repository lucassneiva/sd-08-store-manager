const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');

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
app.put('/products/:id', Products.updateById);
app.delete('/products/:id', Products.deleteById);

app.post('/sales', Sales.add);

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
