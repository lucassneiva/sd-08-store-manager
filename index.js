const app = require('express')();
require('dotenv').config();
const ProductsRouter = require('./routes/productsRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.listen(process.env.PORT);
