const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {  res.send('okok');});
// router.get('/:id','');
router.post('/', (req, res) => {  res.send('captao caverna');});
// router.put('/:id');
// router.delete('/:id');

module.exports = router;