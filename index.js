const express = require('express');
const productRoute = require('./routes/products');
const errorMiddleware = require('./middlewares/error');
const app = express();
app.use(express.json());
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);
app.listen(PORT, () => {
  console.log(`Listen at port ${PORT}`);
});

app.use(errorMiddleware);