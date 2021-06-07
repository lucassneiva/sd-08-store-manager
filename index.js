const express = require('express');
const { port } = require('./.env').api;
const { errorHandler, notFoundHandler } = require('./middlewares');
const { Products, Sales } = require('./routes');

const app = express();

app.use(express.json());

app.use('/products', Products);
app.use('/sales', Sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/:notFound', notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`App running on PORT: ${port}`));
