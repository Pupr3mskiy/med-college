const express = require('express');
const router = express.Router();

// временно массив (потом заменим на PostgreSQL)
const { users } = require('../services/auth.service');

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

    // ответ
    res.json({
        total: result.length,
        page,
        limit,
        data: paginated
    });
});

module.exports = router;