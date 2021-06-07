const express = require('express');
const RouterProduto = require('./router/produto/router');
const RouterVenda = require('./router/venda/router');
const { middlewareError } = require('./middlewares');

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/products', RouterProduto);

app.use('/sales', RouterVenda);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(middlewareError);

app.listen(PORT, () => console.log(`Funcionando na porta ${PORT}`));
