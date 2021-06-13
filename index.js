const express = require('express');

const app = express();

const handleErrors = require('./middleware/handleErrors');
const routes = require('./routes');

app.use(express.json());
app.use('/products', routes.products);
app.use('/sales', routes.sales);
app.use(handleErrors);

// não remova esse endpoint, e para o avaliador funcionar
/* Ok jovem, não será deletado */
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, ()=> console.log(`Estamos no ar na porta ${port}`));
