const express = require('express');
const productsRouter = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
