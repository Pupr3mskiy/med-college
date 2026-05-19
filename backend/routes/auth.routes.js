const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

// REGISTER



router.post('/register', async (req, res) => {
    ///ПРОВЕРКА НА ПОПАДЕНИЕ ФРОНТА
    console.log('REGISTER HIT');
    console.log('🔥 NEW REGISTER REQUEST');
    console.log('BODY:', req.body);

    const { user_name, email, password } = req.body;

    console.log('PARSED DATA:', {
        user_name,
        email,
        password
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        user_name,
        email,
        password: hashedPassword
    };

    users.push(user);

    console.log('USERS ARRAY:', users);

    res.json({
        message: 'User registered',
        user: {
            user_name,
            email
        }
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
        'SECRET_KEY',
        { expiresIn: '1h' }
    );

    res.json({
        message: 'Login success',
        token,
        user: {
            user_name: user.user_name,
            email: user.email
        }
    });
});

module.exports = router;