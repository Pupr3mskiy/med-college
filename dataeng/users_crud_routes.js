const express = require('express');
const router = express.Router();
const pool = require('../database/db');



// GET USERS
router.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = 'asc', search = '' } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const offset = (page - 1) * limit;
        const order = sort === 'asc' ? 'ASC' : 'DESC';

        //  поиск + сортировка + пагинация
        const result = await pool.query(
            `
            SELECT user_id, user_name, email, role, created_at
            FROM users
            WHERE user_name ILIKE $1 OR email ILIKE $1
            ORDER BY user_name ${order}
            LIMIT $2 OFFSET $3
            `,
            [`%${search}%`, limit, offset]
        );/// УБРАТЬ НАХУЙ ЗАПРОСЫ

        // общее количество
        const countResult = await pool.query(
            `
            SELECT COUNT(*) FROM users
            WHERE user_name ILIKE $1 OR email ILIKE $1
            `,
            [`%${search}%`]
        );

        res.json({
            total: parseInt(countResult.rows[0].count),
            page,
            limit,
            data: result.rows
        });

    } catch (err) {
    console.error(err); 
    res.status(500).json({ message: err.message });
}
});
// UPDATE USER
router.put('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { user_name, role } = req.body;

        const result = await pool.query(
            `
            UPDATE users
            SET 
                user_name = COALESCE($1, user_name),
                role = COALESCE($2, role)
            WHERE email = $3
            RETURNING user_id, user_name, email, role, created_at
            `,
            [user_name, role, email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User updated',
            user: result.rows[0]
        });

    } catch (err) {
    console.error(err); // 👈 ДОБАВЬ ЭТО
    res.status(500).json({ message: err.message });
}
});

// DELETE USER
router.delete('/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const result = await pool.query(
            `
            DELETE FROM users
            WHERE email = $1
            RETURNING user_id, user_name, email, role
            `,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User deleted',
            user: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
    }
});

module.exports = router;