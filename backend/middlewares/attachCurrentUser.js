const { users } = require('../services/auth.service');

const attachCurrentUser = (req, res, next) => {
    try {
        const currentUserEmail = req.token.email;

        const user = users.find(u => u.email === currentUserEmail);

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