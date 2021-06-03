const express = require('express');
const { productsRoute, salesRoute } = require('./routes');
const port = 3000;

const app = express();

app.use(express.json());
app.use(productsRoute);
app.use(salesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('Online'));