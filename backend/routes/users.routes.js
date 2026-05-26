const express = require('express');
const router = express.Router();

// временно массив (потом заменим на PostgreSQL)
const { users } = require('../services/auth.service');

// GET USERS
router.get('/', (req, res) => {

    let { page = 1, limit = 10, sort = 'asc', search = '' } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // ПОИСК
    let result = users.filter(user =>
        user.user_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // СОРТИРОВКА
    result.sort((a, b) => {

        if (sort === 'asc') {
            return a.user_name.localeCompare(b.user_name);
        } else {
            return b.user_name.localeCompare(a.user_name);
        }

    });

    // PAGINATION
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginated = result.slice(startIndex, endIndex);

    // ОТВЕТ
    res.json({
        total: result.length,
        page,
        limit,
        data: paginated
    });

});

// UPDATE USER
router.put('/:email', (req, res) => {

    const { email } = req.params;

    const { user_name, role } = req.body;

    const user = users.find(
        u => u.email === email
    );

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    if (user_name) {
        user.user_name = user_name;
    }

    if (role) {
        user.role = role;
    }

    res.json({
        message: 'User updated',
        user
    });

});

// DELETE USER
router.delete('/:email', (req, res) => {

    const { email } = req.params;

    const userIndex = users.findIndex(
        u => u.email === email
    );

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    users.splice(userIndex, 1);

    res.json({
        message: 'User deleted'
    });

});

module.exports = router;