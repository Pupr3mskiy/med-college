const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = [];

const registerUser = async (user_name,email,password) =>{
    const hashedPassword = await bcrypt.hash(password,10);

    const user = {
        user_name,
        email,
        password:hashedPassword
    };

    users.push(user);

    return{
        user_name,
        email
    };
};