const express = require('express');
const bodyParser = require('body-parser');

const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', Products);

app.use('/sales', Sales);

const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
