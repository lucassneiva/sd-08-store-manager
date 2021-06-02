const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const Routes = require('./routes');

app.use(bodyParser.json());

const PORT = 3000;

app.use('/products', Routes.productsRoute);
app.use('/sales', Routes.salesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`listen at port ${PORT}`));
