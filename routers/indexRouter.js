const router = require('express').Router();

// não remova esse endpoint, e para o avaliador funcionar
router.get('/', (_request, response) => {
  response.send();
});

module.exports = router;
