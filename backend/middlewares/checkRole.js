const checkRole = (role) => {
    return (req, res, next) => {
        try {

            if (req.token.role !== role) {
                return res.status(403).json({
                    message: 'Forbidden'
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };
};

module.exports = checkRole;