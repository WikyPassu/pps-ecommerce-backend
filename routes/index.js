const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Puppyness Pet Caring <3');
});

module.exports = router;