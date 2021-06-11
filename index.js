const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

const SalesController = require('./controllers/salesController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./controllers/productsController'));
app.use('/sales', require('./controllers/salesController'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
