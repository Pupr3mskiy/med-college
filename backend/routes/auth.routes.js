const express = require('express');
const jwt = require('jsonwebtoken');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

const {
    register,
    login
} = require('../controllers/auth.controller');

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', isAuth, (req, res) => {

    const token = jwt.sign(
        {
            user_id: req.token.user_id,
            email: req.token.email,
            role: req.token.role,
            user_name: req.token.user_name
        },
        'SECRET_KEY',
        {
            expiresIn: '1h'
        }
    );

    res.json({
        token
    });
});

module.exports = router;