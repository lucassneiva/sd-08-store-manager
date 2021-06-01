const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT || PORT, () => console.log('Fala que eu te escuto!'));
