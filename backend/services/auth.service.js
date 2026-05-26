const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');

    const registerUser = async (user_name, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const role = email === 'admin@mail.ru' ? 'admin' : 'student';

        const result = await pool.query(
        `
        INSERT INTO users (user_name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id, user_name, email, role
        `,
        [user_name, email, hashedPassword, role]
        );

        return result.rows[0];
    };

    const loginUser = async (email, password) => {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user) {
        throw new Error('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordCorrect) {
            throw new Error('Wrong password');
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role,
                user_name: user.user_name
            },
            'SECRET_KEY',
            { expiresIn: '1h' }
        );

        return {
            token,
            user: {
                user_name: user.user_name,
                email: user.email,
                role: user.role
            }
        };
    };

    module.exports = {
    registerUser,
    loginUser
    };