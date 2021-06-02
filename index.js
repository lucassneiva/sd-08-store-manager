require('dotenv').config();
const express = require('express');
const app = express();
const middlewares = require('./middlewares');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./router/products'));
app.use('/sales', require('./router/sales'));

app.use(middlewares.error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
