const express = require('express');
const { handleError } = require('./Middlewares');
const router = require('./router');
const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', router.productRouter);
app.use(handleError.logError);

app.listen(PORT, () => {
  console.log('servidor rodando');
});
