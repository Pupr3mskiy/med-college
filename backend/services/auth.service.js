    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    const users = [];

    const registerUser = async (user_name, email, password) => {

        const hashedPassword = await bcrypt.hash(password, 10);
        
       let role;

        if (email === 'admin@mail.ru') {
            role = 'admin';
        } 
        else {
            role = 'student';
        }

        const user = {
            user_name,
            email,
            password: hashedPassword,
            role
                    };

        users.push(user);

        return {
            user_name,
            email
        };
    };

    const loginUser = async (email, password) => {

        const user = users.find(u => u.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new Error('Wrong password');
        }

        const token = jwt.sign(
            { email: user.email,role: user.role,user_name: user.user_name },
            'SECRET_KEY',
            { expiresIn: '1h' }
        );

        return {
            token,
            user: {
                user_name: user.user_name,
                email: user.email
            }
        };
    };

    module.exports = {
        registerUser,
        loginUser,
        users
    };