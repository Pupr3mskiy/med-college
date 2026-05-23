const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Token not found' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, 'SECRET_KEY');

        req.token = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = isAuth;