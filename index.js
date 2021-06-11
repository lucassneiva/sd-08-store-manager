const bodyParser = require('body-parser');
const express = require('express');
const productRouter = require('./routes/products.routes');
const { DEFAULT_PORT } = require('./common/defs');


const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
