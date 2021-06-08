const express = require('express');

const bodyParser = require('body-parser');

const controllers = require('../controllers/SalesControllers');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', controllers.create);

module.exports = router;
