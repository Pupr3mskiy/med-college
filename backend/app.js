const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

// REGISTER
router.post('/register', async (req, res) => {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        email,
        password: hashedPassword
    };

    users.push(user);

    res.json({
        message: 'User registered',
        users
    });
});

// LOGIN
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: 'Wrong password'
        });
    }

    const token = jwt.sign(
        { email: user.email },
        'SECRET_KEY'
    );

    res.json({
        message: 'Login success',
        token
    });
});

module.exports = router;