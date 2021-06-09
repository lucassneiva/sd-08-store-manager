//DISCLAIMER: projeto realizado inspirado nas aulas ao vivo da T8 com o mestre Moreira, com acréscimos visualizados no Course (ex.: colocar o OPTIONS separado)

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/productsRouter');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log('Online!');
});