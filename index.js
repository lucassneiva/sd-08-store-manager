const express = require('express');
const { productsRouter, salesRouter } = require('./routes');
const PORT = 3000;
const CURRENT_PORT = process.env.PORT || PORT;

const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(CURRENT_PORT, () => { console.log(`Listening on port ${CURRENT_PORT}`); });
