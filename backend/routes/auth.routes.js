const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    res.send('Логин');
});

router.post('/register', (req, res) => {
    res.send('Регистрация');
});

module.exports = router;