const express = require('express');

const productRouter = require('./src/controllers/productController');
const saleRouter = require('./src/controllers/saleController');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use('/products', productRouter);

app.use('/sales', saleRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
