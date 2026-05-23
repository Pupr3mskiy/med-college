const authService = require('../services/auth.service');

const register = async (req, res) => {

    try {

        const { user_name, email, password } = req.body;

        const user = await authService.registerUser(
            user_name,
            email,
            password
        );

        res.json({
            message: 'User registered',
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const data = await authService.loginUser(
            email,
            password
        );

        res.json({
            message: 'Login success',
            token: data.token,
            user: data.user
        });

    } catch (error) {

        res.status(401).json({
            message: error.message
        });

    }
};

module.exports = {
    register,
    login
};