const express = require('express');
const app = express();
const handleErrors = require('./middleware/handleErrors');

const RouterProducts = require('./routes/productsRoutes');

app.use(express.json());
app.use('/products', RouterProducts);
app.use(handleErrors);

// não remova esse endpoint, e para o avaliador funcionar
/* Ok jovem, não será deletado */
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, ()=> console.log(`Estamos no ar na porta ${port}`));
