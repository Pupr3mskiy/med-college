const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/isAuth');
const pool = require('../database/db');

router.get('/:username', isAuth, async (req, res) => {

    try {

        const { username } = req.params;

        const result = await pool.query(
            `
            SELECT
                user_id,
                user_name,
                email,
                role,
                created_at
            FROM users
            WHERE user_name = $1
            `,
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

module.exports = router;