const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const salesRoutes = require('./src/routes/salesRoutes');

const errorMiddleware = require('./src/middlewares/error');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRoutes);
app.use(salesRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log('Ouvindo a porta 3000!');
});
