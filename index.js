const express = require('express');
const bodyParser = require('body-parser');

const { DEFAULT_PORT } = require('./common/defs');
const productsRouters = require('./routes/products.routes');
const salesRouters = require('./routes/sales.routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouters);

//Sales
app.use('/sales', salesRouters);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
