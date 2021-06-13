const app = require('express')();
const ProductsRouter = require('./routes/productsRouter');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.listen(PORT);
