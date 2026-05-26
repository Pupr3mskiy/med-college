const express = require('express');
const router = express.Router();

const aboutData = require('../about.json');

router.get('/', (req, res) => {
    res.json(aboutData);
});

module.exports = router;