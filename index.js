const express = require('express');
const Router = require('./controllers/router');

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/products', Router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Funcionando na porta ${PORT}`));
