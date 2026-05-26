const pool = require('../database/db');

const attachCurrentUser = async (req, res, next) => {
    try {
        const currentUserEmail = req.token.email;

        const result = await pool.query(
            `SELECT user_id, user_name, email, role FROM users WHERE email = $1`,
            [currentUserEmail]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.currentUser = user;

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = attachCurrentUser;