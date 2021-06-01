const express = require( 'express');

const { createProductController } = require('./controllers/productsCrontoller');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(
  '/products',
  createProductController
);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
